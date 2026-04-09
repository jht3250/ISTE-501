import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, extname } from "path";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = (formData.get("name") as string | null)?.trim();
  const lat = parseFloat(formData.get("lat") as string) || 0;
  const lng = parseFloat(formData.get("lng") as string) || 0;
  const imageFile = formData.get("image") as File | null;

  if (!name) {
    return NextResponse.json({ error: "Box name is required" }, { status: 400 });
  }

  // Check for duplicate name
  const existing = db
    .prepare("SELECT box_id FROM bird_box WHERE name = ?")
    .get(name);
  if (existing) {
    return NextResponse.json({ error: `A box named "${name}" already exists` }, { status: 409 });
  }

  // Save image if provided
  let imageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    const ext = extname(imageFile.name) || ".jpg";
    const filename = name.replace(/[^a-zA-Z0-9]/g, "") + ext;
    const publicDir = join(process.cwd(), "public");
    await mkdir(publicDir, { recursive: true });
    const bytes = await imageFile.arrayBuffer();
    await writeFile(join(publicDir, filename), Buffer.from(bytes));
    imageUrl = `/${filename}`;
  }

  const now = Math.floor(Date.now() / 1000);

  // Insert bird_box
  const boxResult = db
    .prepare(
      `INSERT INTO bird_box (name, location_lat, location_lng, status, status_updated_at, installed_at, image_url)
       VALUES (?, ?, ?, 'active', ?, ?, ?)`
    )
    .run(name, lat, lng, now, now, imageUrl);

  const boxId = boxResult.lastInsertRowid;

  // Auto-generate a device serial and insert it
  const serial = `DEV-${String(boxId).padStart(3, "0")}`;
  db.prepare(
    `INSERT INTO device (box_id, serial_number, power_type, last_seen_at, maintenance_status)
     VALUES (?, ?, 'solar', ?, 'ok')`
  ).run(boxId, serial, now);

  return NextResponse.json({ success: true, box_id: Number(boxId), serial_number: serial, image_url: imageUrl });
}
