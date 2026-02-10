import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/pages/service-detail"; // Import komponen baru tadi

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Generate Metadata SEO Otomatis
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  return {
    title: service ? `${service.title} | Wokil Tech` : "Layanan Tidak Ditemukan",
    description: service?.description,
  };
}

// 2. Main Page Logic
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  // Ambil Data dari DB
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  // Jika slug ngawur, tampilkan 404
  if (!service) {
    return notFound();
  }

  // Tampilkan UI Client dengan Data Asli
  return <ServiceDetail service={service} />;
}