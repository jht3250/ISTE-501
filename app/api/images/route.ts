import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join } from "path";

const FOLDERS = ["bat", "kestrel", "other"];
const VALID_EXT = [".jpg", ".jpeg", ".png", ".webp"];

export async function GET() {
  const result: { label: string; path: string }[] = [];

  for (const folder of FOLDERS) {
    const dir = join(process.cwd(), "public", "images", folder);
    try {
      const files = readdirSync(dir)
        .filter(f => VALID_EXT.includes(f.slice(f.lastIndexOf(".")).toLowerCase()))
        .sort();
      for (const file of files) {
        result.push({
          label: `${folder.charAt(0).toUpperCase() + folder.slice(1)} - ${file}`,
          path: `/images/${folder}/${file}`,
        });
      }
    } catch {
      // folder doesn't exist, skip
    }
  }

  return NextResponse.json(result);
}
