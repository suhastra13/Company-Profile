import { prisma } from "@/lib/prisma";

// Import Komponen Home
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio";

export default async function Home() {
  // 1. DATA STATISTIK
  const totalProjects = await prisma.portfolio.count();
  const totalTeam = await prisma.teamMember.count();
  const uniqueClients = await prisma.portfolio.findMany({
    select: { client: true },
    distinct: ['client'] 
  });
  const totalClients = uniqueClients.length;
  
  const startYear = 2020; 
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - startYear;

  // 2. DATA PORTFOLIO (FIXED)
  const rawPortfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
    take: 3, 
    select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        thumbnail: true, // GUNAKAN NAMA YANG BENAR (thumbnail)
        description: true,
        techStack: true  // GUNAKAN NAMA YANG BENAR (techStack)
    }
  });

  // 3. TRANSFORMATION (Mapping data DB ke format Component)
  // Komponen butuh 'image' & 'technologies', sedangkan DB punya 'thumbnail' & 'techStack'
  const featuredPortfolios = rawPortfolios.map((p) => {
    // Cek apakah techStack adalah array, lalu gabungkan jadi string koma
    const techArray = Array.isArray(p.techStack) ? p.techStack : [];
    const techString = (techArray as string[]).join(", ");

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      image: p.thumbnail, // Mapping: thumbnail -> image
      description: p.description,
      technologies: techString // Mapping: techStack JSON -> technologies string
    };
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <HeroSection />
      
      <ServicesSection />
      
      <StatsSection 
        totalProjects={totalProjects}
        totalClients={totalClients}
        totalTeam={totalTeam}
        yearsExperience={yearsExperience}
      />
      
      {/* Sekarang data yang dikirim sudah sesuai format */}
      <FeaturedPortfolio projects={featuredPortfolios} />
      
    </main>
  );
}