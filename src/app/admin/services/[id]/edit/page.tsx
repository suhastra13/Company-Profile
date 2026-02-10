import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/service-form";

// 1. Ubah tipe params menjadi Promise
export default async function EditServicePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 2. Await params sebelum dipakai
  const { id } = await params;

  // 3. Gunakan ID yang sudah di-await
  const service = await prisma.service.findUnique({
    where: { id }, // Sekarang id sudah aman (string)
  });

  if (!service) return notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Layanan</h1>
        <p className="text-gray-400">
          Perbarui informasi layanan: <span className="text-primary">{service.title}</span>
        </p>
      </div>
      
      {/* Panggil Form dengan Data Awal */}
      <ServiceForm initialData={service} />
    </div>
  );
}