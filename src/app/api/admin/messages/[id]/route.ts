import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

// UPDATE STATUS (Mark as Read/Replied)
export async function PUT(req: NextRequest, { params }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json(); // { status: "READ" }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}

// DELETE MESSAGE
export async function DELETE(req: NextRequest, { params }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ message: "Pesan dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus pesan" }, { status: 500 });
  }
}