import ServiceForm from "@/components/admin/service-form";

export default function CreateServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Tambah Layanan Baru</h1>
        <p className="text-gray-400">Buat layanan baru untuk ditampilkan di website.</p>
      </div>
      
      {/* Panggil Form Reusable */}
      <ServiceForm />
    </div>
  );
}