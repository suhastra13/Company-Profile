import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: NextRequest, { params }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;

    // 1. Cari data di DB dulu untuk dapat nama filenya
    const fileRecord = await prisma.media.findUnique({ where: { id } });
    
    if (!fileRecord) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 404 });
    }

    // 2. Hapus File Fisik di Folder public/uploads
    // Kita gunakan try-catch khusus di sini, agar jika file fisik sudah hilang (manual delete), 
    // data di DB tetap bisa dihapus.
    try {
      const filePath = path.join(process.cwd(), "public", fileRecord.url);
      await unlink(filePath);
    } catch (err) {
      console.log("File fisik tidak ditemukan, lanjut hapus DB...");
    }

    // 3. Hapus Record di Database
    await prisma.media.delete({ where: { id } });

    return NextResponse.json({ message: "File berhasil dihapus" });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Gagal menghapus file" }, { status: 500 });
  }
}