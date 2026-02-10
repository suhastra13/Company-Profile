import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioList from "@/components/pages/portfolio-list";

export const metadata: Metadata = {
  title: "Portfolio Kami",
  description: "Hasil karya dan studi kasus dari project yang telah kami kerjakan.",
};

// Helper: Ubah data JSON/String dari Prisma jadi Array String
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
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Format Data (Mapping)
  // Kita ubah 'gallery' jadi 'images' biar seragam dengan frontend
  const formattedPortfolios = portfolios.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    client: p.client || undefined,
    // Parsing JSON Array
    images: parseArray(p.gallery), 
    techStack: parseArray(p.techStack),
  }));

  // 3. Tampilkan Komponen Client
  return <PortfolioList portfolios={formattedPortfolios} />;
}