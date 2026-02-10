import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

// UPDATE (PUT)
export async function PUT(req: NextRequest, { params }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        client: body.client,
        category: body.category,
        description: body.description,
        techStack: body.techStack,
        
        // --- PENYESUAIAN SCHEMA ---
        gallery: body.images,       // Map images -> gallery
        featured: body.isFeatured,  // Map isFeatured -> featured
        thumbnail: body.images?.[0] || null, // Update thumbnail otomatis
      },
    });

    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    console.error("Error Update Portfolio:", error);
    return NextResponse.json({ error: "Gagal update portfolio" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.portfolio.delete({ where: { id } });
    return NextResponse.json({ message: "Portfolio deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal delete portfolio" }, { status: 500 });
  }
}