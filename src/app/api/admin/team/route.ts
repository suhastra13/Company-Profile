import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const newMember = await prisma.teamMember.create({
      data: {
        name: body.name,
        position: body.position,
        bio: body.bio,
        photo: body.photo,
        socials: body.socials || {}, // JSON Object
        order: parseInt(body.order) || 0,
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambah anggota tim" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }, // Urutkan berdasarkan 'order'
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}