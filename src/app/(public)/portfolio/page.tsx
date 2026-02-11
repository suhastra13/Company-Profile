import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioList from "@/components/pages/portfolio-list";

export const metadata: Metadata = {
  title: "Portfolio Kami",
  description: "Hasil karya dan studi kasus dari project yang telah kami kerjakan.",
};

// Helper: Ubah data JSON/String dari Prisma jadi Array String
// (Helper ini sudah bagus, tidak perlu diubah)
function parseArray(data: any): string[] {
  if (Array.isArray(data)) return data as string[];
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed as string[];
    } catch (e) {
      return [];
    }
  }
  return [];
}

export default async function PortfolioPage() {
  // 1. Ambil data dari Database
  // Pastikan Prisma sudah digenerate ulang agar tipe datanya terbaca
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Format Data (Mapping)
  const formattedPortfolios = portfolios.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    
    // PERBAIKAN: Gunakan || undefined agar jika null tidak dianggap error
    client: p.client || undefined, 
    
    // PERBAIKAN PENTING: Tambahkan || "" 
    // Ini memaksa tipe data jadi String Murni (bukan String | Null)
    // agar sesuai dengan 'PortfolioItem' di component list.
    description: p.description || "", 
    
    // Parsing JSON Array
    // Pastikan field di database namanya 'gallery', tapi di component butuhnya 'images'
    images: parseArray(p.gallery), 
    techStack: parseArray(p.techStack),
  }));

  // 3. Tampilkan Komponen Client
  return <PortfolioList portfolios={formattedPortfolios} />;
}