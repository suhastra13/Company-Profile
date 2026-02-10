import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // 1. Cek Auth
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // 2. Ambil file dari Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Convert file ke Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 4. Buat nama file unik (timestamp + nama asli)
    // Ganti spasi dengan underscore agar aman di URL
    const filename = Date.now() + "_" + file.name.replace(/\s/g, "_");
    
    // 5. Tentukan folder tujuan: public/uploads
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Pastikan folder ada, kalau belum buat dulu
    await mkdir(uploadDir, { recursive: true });

    // 6. Simpan file
    await writeFile(path.join(uploadDir, filename), buffer);

    // 7. Kembalikan URL file agar bisa disimpan di DB
    // URL publiknya adalah: /uploads/namafile.jpg
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}