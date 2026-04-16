import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, rm } from "fs/promises";
import { join } from "path";
import { spawnSync } from "child_process";
import AdmZip from "adm-zip";
import db from "@/lib/db";

/** Parse a capture_YYYYMMDD_HHMMSS filename and return a Unix timestamp. */
function parseDateFilename(filename: string): number | null {
  const base = filename.replace(/\.[^.]+$/, "");
  const match = base.match(/(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
  if (!match) return null;

  const date = new Date(Date.UTC(
    parseInt(match[1], 10),
    parseInt(match[2], 10) - 1,
    parseInt(match[3], 10),
    parseInt(match[4], 10),
    parseInt(match[5], 10),
    parseInt(match[6], 10),
  ));
  if (isNaN(date.getTime())) return null;
  return Math.floor(date.getTime() / 1000);
}

/** Call ml/classify.py once with all image paths, loading the model only once. */
function classifyImages(imagePaths: string[]): {
  path: string;
  species?: string;
  confidence?: number;
  all_probs?: Record<string, number>;
  error?: string;
}[] {
  if (imagePaths.length === 0) return [];
  const scriptPath = join(process.cwd(), "ml", "classify.py");
  const proc = spawnSync("python", [scriptPath, ...imagePaths], {
    encoding: "utf-8",
    timeout: 120000,
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

  // Collect valid image entries first so we can batch-classify in one Python call
  type PendingEntry = { entryName: string; tmpPath: string; timestamp: number; data: Buffer };
  const pending: PendingEntry[] = [];

  try {
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();

    for (const entry of entries) {
      if (entry.isDirectory) continue;

      const entryName = entry.entryName.split("/").pop() ?? entry.entryName;
      const ext = entryName.split(".").pop()?.toLowerCase() ?? "";

      if (!["png", "jpg", "jpeg", "bmp"].includes(ext)) continue;

      const timestamp = parseDateFilename(entryName);
      if (!timestamp) {
        errors.push(`Skipped "${entryName}": could not parse YYYYMMDD date from filename`);
        continue;
      }

      const tmpImagePath = join(tmpDir, entryName);
      await writeFile(tmpImagePath, entry.getData());
      pending.push({ entryName, tmpPath: tmpImagePath, timestamp, data: entry.getData() });
    }

    if (pending.length > 0) {
      // Single Python invocation — model loads once for all images
      const mlResults = classifyImages(pending.map(p => p.tmpPath));
      const resultByPath = new Map(mlResults.map(r => [r.path, r]));

      for (const { entryName, tmpPath, timestamp, data } of pending) {
        const mlResult = resultByPath.get(tmpPath);
        if (!mlResult || mlResult.error) {
          errors.push(`Failed to classify "${entryName}": ${mlResult?.error ?? "no result"}`);
          continue;
        }

        const speciesName = mlResult.species!.charAt(0).toUpperCase() + mlResult.species!.slice(1);
        const speciesRow = db
          .prepare("SELECT species_id FROM species WHERE names = ?")
          .get(speciesName) as { species_id: number } | undefined;
        const speciesId = speciesRow?.species_id ?? 3;

        const imageFilename = `${deviceSerial}-${timestamp}-${eventsAdded}.jpg`;
        const imageUrl = `/images/camera/${imageFilename}`;
        await writeFile(join(imageDir, imageFilename), data);

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
