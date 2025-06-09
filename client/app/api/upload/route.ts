import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { mkdir } from "fs/promises";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file: File | null = formData.get("video") as unknown as File;

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "No video file provided" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);

  const videoUrl = `/uploads/${filename}`;
  return NextResponse.json({ success: true, url: videoUrl });
};
