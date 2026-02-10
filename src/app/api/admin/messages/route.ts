import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }, // Pesan terbaru di atas
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil pesan" }, { status: 500 });
  }
}