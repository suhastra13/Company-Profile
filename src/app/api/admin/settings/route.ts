import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Ambil data
export async function GET() {
  try {
    const settings = await prisma.companyInfo.findFirst();
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// POST: Simpan atau Update
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const existing = await prisma.companyInfo.findFirst();

    let result;
    if (existing) {
      // UPDATE
      result = await prisma.companyInfo.update({
        where: { id: existing.id },
        data: {
          name: body.name,
          description: body.description,
          // --- BARU: Tambahkan field ini agar tersimpan ---
          history: body.history,
          aboutImage: body.aboutImage,
          // -----------------------------------------------
          address: body.address,
          email: body.email,
          phone: body.phone,
          whatsapp: body.whatsapp,
          mapEmbedUrl: body.mapEmbedUrl,
          socials: body.socials,
        },
      });
    } else {
      // CREATE BARU
      result = await prisma.companyInfo.create({
        data: {
          name: body.name,
          description: body.description,
          // --- BARU ---
          history: body.history,
          aboutImage: body.aboutImage,
          // ------------
          address: body.address,
          email: body.email,
          phone: body.phone,
          whatsapp: body.whatsapp,
          mapEmbedUrl: body.mapEmbedUrl,
          socials: body.socials,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Settings Error:", error);
    return NextResponse.json({ error: "Gagal menyimpan pengaturan" }, { status: 500 });
  }
}