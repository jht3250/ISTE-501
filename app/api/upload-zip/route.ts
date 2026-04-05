import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, mkdir, rm } from "fs/promises";
import { join } from "path";
import { spawnSync } from "child_process";
import AdmZip from "adm-zip";
import db from "@/lib/db";

/** Parse a YYYYMMDD filename and return a Unix timestamp (midnight UTC). */
function parseDateFilename(filename: string): number | null {
  const base = filename.replace(/\.[^.]+$/, ""); // strip extension
  const match = base.match(/(\d{8})/);
  if (!match) return null;

  const s = match[1];
  const year = parseInt(s.slice(0, 4), 10);
  const month = parseInt(s.slice(4, 6), 10) - 1; // 0-based
  const day = parseInt(s.slice(6, 8), 10);

  const date = new Date(Date.UTC(year, month, day));
  if (isNaN(date.getTime())) return null;

  return Math.floor(date.getTime() / 1000);
}

/** Call ml/classify.py and return the ML result. */
function classifyImage(imagePath: string): {
  species: string;
  confidence: number;
  all_probs: Record<string, number>;
} {
  const scriptPath = join(process.cwd(), "ml", "classify.py");
  const proc = spawnSync("python", [scriptPath, imagePath], {
    encoding: "utf-8",
    timeout: 30000,
  });

  if (proc.error) throw new Error(proc.error.message);
  if (proc.status !== 0) throw new Error(proc.stderr || "Classification failed");

  const result = JSON.parse(proc.stdout.trim());
  if ("error" in result) throw new Error(result.error);
  return result;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const deviceSerial = formData.get("serial_number") as string | null;

  if (!file || !deviceSerial) {
    return NextResponse.json(
      { error: "Missing file or serial_number" },
      { status: 400 }
    );
  }

  // Resolve device from serial number
  const device = db
    .prepare("SELECT device_id, box_id FROM device WHERE serial_number = ?")
    .get(deviceSerial) as { device_id: number; box_id: number } | undefined;

  if (!device) {
    return NextResponse.json(
      { error: `Unknown device: ${deviceSerial}` },
      { status: 404 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const tmpDir = join(process.cwd(), "tmp", `zip-${Date.now()}`);
  await mkdir(tmpDir, { recursive: true });

  const imageDir = join(process.cwd(), "public", "images", "camera");
  await mkdir(imageDir, { recursive: true });

  const insertEvent = db.prepare(
    `INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature, confidence)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  let eventsAdded = 0;
  const errors: string[] = [];

  try {
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    for (const entry of entries) {
      if (entry.isDirectory) continue;

      // Use only the last path segment as the filename
      const entryName = entry.entryName.split("/").pop() ?? entry.entryName;
      const ext = entryName.split(".").pop()?.toLowerCase() ?? "";

      // Only process image files
      if (!["png", "jpg", "jpeg", "bmp"].includes(ext)) continue;

      const timestamp = parseDateFilename(entryName);
      if (!timestamp) {
        errors.push(`Skipped "${entryName}": could not parse YYYYMMDD date from filename`);
        continue;
      }

      // Write image to tmp so Python can read it
      const tmpImagePath = join(tmpDir, entryName);
      await writeFile(tmpImagePath, entry.getData());

      try {
        const mlResult = classifyImage(tmpImagePath);

        // Determine species_id (default to "Other" = 3 when unknown)
        const speciesName =
          mlResult.species.charAt(0).toUpperCase() + mlResult.species.slice(1);
        const speciesRow = db
          .prepare("SELECT species_id FROM species WHERE names = ?")
          .get(speciesName) as { species_id: number } | undefined;
        const speciesId = speciesRow?.species_id ?? 3;

        // Persist image under /public/images/camera/
        const imageFilename = `${deviceSerial}-${timestamp}-${eventsAdded}.jpg`;
        const imageUrl = `/images/camera/${imageFilename}`;
        await writeFile(join(imageDir, imageFilename), entry.getData());

        // Insert event using the date parsed from the filename
        insertEvent.run(
          device.device_id,
          device.box_id,
          speciesId,
          timestamp,
          imageUrl,
          1,
          null,
          mlResult.confidence
        );
        eventsAdded++;
      } catch (err: any) {
        errors.push(`Failed to process "${entryName}": ${err.message}`);
      } finally {
        await unlink(tmpImagePath).catch(() => {});
      }
    }
  } catch (err: any) {
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
    return NextResponse.json(
      { error: `Failed to read ZIP: ${err.message}` },
      { status: 500 }
    );
  }

  await rm(tmpDir, { recursive: true, force: true }).catch(() => {});

  return NextResponse.json({ success: true, eventsAdded, errors });
}
