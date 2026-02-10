import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

// GET: Ambil daftar file
export async function GET() {
  try {
    const files = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// POST: Upload File
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diupload" }, { status: 400 });
    }

    // 1. Generate Nama File Unik (biar gak bentrok)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Bersihkan nama file dari spasi dan karakter aneh
    const cleanName = file.name.replace(/\s+/g, '-').toLowerCase();
    const uniqueName = `${Date.now()}-${cleanName}`;
    
    // 2. Tentukan Lokasi Simpan (public/uploads)
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, uniqueName);

    // 3. Simpan File ke Harddisk
    await writeFile(filePath, buffer);

    // 4. Simpan Info ke Database
    const newMedia = await prisma.media.create({
      data: {
        filename: uniqueName,
        url: `/uploads/${uniqueName}`, // URL yang bisa diakses public
        type: file.type,
        size: file.size,
      },
    });

    return NextResponse.json(newMedia, { status: 201 });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Gagal upload file" }, { status: 500 });
  }
}