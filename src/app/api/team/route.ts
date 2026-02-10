import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching team" }, { status: 500 });
  }
}