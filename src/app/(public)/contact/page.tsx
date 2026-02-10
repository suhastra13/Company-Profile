import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ContactContent from "@/components/pages/contact-content";

export const metadata: Metadata = {
  title: "Hubungi Kami | Wokil Tech",
  description: "Diskusikan ide proyek Anda dengan tim Wokil Tech. Konsultasi gratis untuk pembuatan website dan IoT.",
};

export default async function ContactPage() {
  // 1. Ambil Data Company Info (Singleton)
  const companyInfo = await prisma.companyInfo.findFirst();

  // 2. Tampilkan Komponen Client dengan Data
  return <ContactContent info={companyInfo} />;
}