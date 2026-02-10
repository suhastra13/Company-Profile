import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ServicesList from "@/components/pages/services-list"; // Import komponen baru tadi

export const metadata: Metadata = {
  title: "Layanan Kami",
  description: "Solusi digital lengkap untuk kebutuhan bisnis Anda.",
};

export default async function ServicesPage() {
  // 1. Ambil data REAL dari Database
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "asc" }, // Urutkan biar rapi
  });

  // 2. Tampilkan Komponen Visual dengan data dari DB
  return <ServicesList services={services} />;
}