import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category"); // Ambil parameter ?category=Web

  try {
    // Jika ada kategori, filter. Jika tidak, ambil semua.
    const whereClause = category && category !== "All" ? { category } : {};

    const data = await prisma.portfolio.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching portfolio" }, { status: 500 });
  }
}