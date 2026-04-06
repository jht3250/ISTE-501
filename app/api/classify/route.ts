import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { spawnSync } from "child_process";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const deviceSerial = formData.get("serial_number") as string | null;
  const temperature = formData.get("temperature") as string | null;
  const occupancy = formData.get("occupancy") as string | null;

  if (!file || !deviceSerial) {
    return NextResponse.json({ error: "Missing file or serial_number" }, { status: 400 });
  }

  const mlDir = process.env.ML_PATH || join(process.cwd(), 'ml')
  const scriptPath = join(mlDir, 'classify.py')

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Write image to a temp file so Python can read it
  const tmpDir = join(process.cwd(), "tmp");
  await mkdir(tmpDir, { recursive: true });
  const tmpPath = join(tmpDir, `classify-${Date.now()}.jpg`);
  await writeFile(tmpPath, buffer);

  let mlResult: { species: string; confidence: number; all_probs: Record<string, number> };
  try {
    const proc = spawnSync("python", [scriptPath, tmpPath], {
      encoding: "utf-8",
      timeout: 30000,
    });

    if (proc.error) throw proc.error;
    if (proc.status !== 0) throw new Error(proc.stderr || "Python script failed");

    mlResult = JSON.parse(proc.stdout.trim());
    if ("error" in mlResult) throw new Error((mlResult as any).error);
  } catch (err: any) {
    await unlink(tmpPath).catch(() => {});
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  await unlink(tmpPath).catch(() => {});

  // Look up device + box by serial number
  const device = db
    .prepare("SELECT device_id, box_id FROM device WHERE serial_number = ?")
    .get(deviceSerial) as { device_id: number; box_id: number } | undefined;

  if (!device) {
    return NextResponse.json({ error: `Unknown device: ${deviceSerial}` }, { status: 404 });
  }

  // Map species name → species_id (Kestrel=1, Bat=2, Other=3)
  const speciesName =
    mlResult.species.charAt(0).toUpperCase() + mlResult.species.slice(1);
  const speciesRow = db
    .prepare("SELECT species_id FROM species WHERE names = ?")
    .get(speciesName) as { species_id: number } | undefined;
  const speciesId = speciesRow?.species_id ?? 3;

  // Save the image permanently under /public/images/camera/
  const timestamp = Math.floor(Date.now() / 1000);
  const imageFilename = `${deviceSerial}-${timestamp}.jpg`;
  const imageUrl = `/images/camera/${imageFilename}`;
  const imageDir = join(process.cwd(), "public", "images", "camera");
  await mkdir(imageDir, { recursive: true });
  await writeFile(join(imageDir, imageFilename), buffer);

  // Insert event into database
  const result = db
    .prepare(
      `INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature, confidence)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      device.device_id,
      device.box_id,
      speciesId,
      timestamp,
      imageUrl,
      occupancy ? parseInt(occupancy) : 1,
      temperature ? parseFloat(temperature) : null,
      mlResult.confidence
    );

  return NextResponse.json({
    event_id: String(result.lastInsertRowid),
    species: mlResult.species,
    confidence: mlResult.confidence,
    all_probs: mlResult.all_probs,
    image_url: imageUrl,
  });
}
