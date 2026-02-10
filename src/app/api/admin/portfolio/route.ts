import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const newPortfolio = await prisma.portfolio.create({
      data: {
        title: body.title,
        slug: body.slug,
        client: body.client,
        category: body.category,
        description: body.description,
        techStack: body.techStack || [], 
        
        // --- PENYESUAIAN SCHEMA ---
        // Form mengirim 'images', Database minta 'gallery'
        gallery: body.images || [], 
        // Form mengirim 'isFeatured', Database minta 'featured'
        featured: body.isFeatured || false,
        
        // Field opsional lain (bisa dikosongkan dulu)
        thumbnail: body.images?.[0] || null, // Ambil gambar pertama jadi thumbnail
        challenge: "",
        solution: "",
        result: "",
        year: new Date().getFullYear().toString(),
      },
    });

    return NextResponse.json(newPortfolio, { status: 201 });
  } catch (error) {
    console.error("Error Create Portfolio:", error);
    return NextResponse.json({ error: "Gagal membuat portfolio" }, { status: 500 });
  }
}

// Tambahan: GET untuk List Portfolio
export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Mapping balik agar Frontend (yang pakai 'images') tetap jalan
    const formattedPortfolios = portfolios.map(p => ({
      ...p,
      images: p.gallery,      // Ubah gallery jadi images buat frontend
      isFeatured: p.featured  // Ubah featured jadi isFeatured buat frontend
    }));

    return NextResponse.json(formattedPortfolios);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}