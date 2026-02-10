import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// Definisi Tipe Params sebagai Promise (Khusus Next.js 15+)
type Props = {
  params: Promise<{ id: string }>;
};

// =======================================================
// METHOD PUT (Untuk Update/Edit Data)
// =======================================================
export async function PUT(req: NextRequest, { params }: Props) {
  // 1. Cek Login
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // 2. AWAIT PARAMS (PENTING!)
    const { id } = await params;
    
    // 3. Ambil data dari body
    const body = await req.json();

    // 4. Update ke Database
    const updatedService = await prisma.service.update({
      where: { id }, // Gunakan ID yang sudah di-await
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        icon: body.icon,
        content: body.content,
        features: body.features, // Pastikan array fitur tersimpan
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Error Updating Service:", error); // Cek terminal VSCode jika error lagi
    return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
  }
}

// =======================================================
// METHOD DELETE (Untuk Hapus Data)
// =======================================================
export async function DELETE(req: NextRequest, { params }: Props) {
  // 1. Cek Login
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // 2. AWAIT PARAMS
    const { id } = await params;

    // 3. Hapus dari Database
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error Deleting Service:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}