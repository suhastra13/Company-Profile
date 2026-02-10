import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PortfolioDetail from "@/components/pages/portfolio-detail";

// Helper parsing array
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.portfolio.findUnique({ where: { slug } });
  return {
    title: project ? `${project.title} | Portfolio` : "Project Not Found",
    description: project?.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  // 1. Ambil Data Real dari DB
  const rawProject = await prisma.portfolio.findUnique({
    where: { slug },
  });

  if (!rawProject) {
    return notFound();
  }

  // 2. Format Data untuk Component
  const project = {
    ...rawProject,
    // Parsing JSON Array dari Prisma
    images: parseArray(rawProject.gallery), 
    techStack: parseArray(rawProject.techStack),
  };

  // 3. Render Component Tampilan
  return <PortfolioDetail project={project} />;
}