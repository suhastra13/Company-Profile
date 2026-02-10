import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    
    // Simpan ke database
    const newService = await prisma.service.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        icon: body.icon,
        content: body.content,
        features: body.features, // Pastikan dikirim sebagai Array
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat service" }, { status: 500 });
  }
}