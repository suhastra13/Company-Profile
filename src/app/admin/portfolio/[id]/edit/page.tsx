import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PortfolioForm from "@/components/admin/portfolio-form";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const rawPortfolio = await prisma.portfolio.findUnique({ where: { id } });

  if (!rawPortfolio) return notFound();

  // Mapping data DB ke format Form
  const portfolioForForm = {
    ...rawPortfolio,
    images: rawPortfolio.gallery,     // DB: gallery -> Form: images
    isFeatured: rawPortfolio.featured // DB: featured -> Form: isFeatured
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Edit Project</h1>
      {/* Kirim data yang sudah dimapping */}
      <PortfolioForm initialData={portfolioForForm} />
    </div>
  );
}