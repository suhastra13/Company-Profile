import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/settings-form";

export default async function SettingsPage() {
  // Ambil data pertama (Singleton)
  const settings = await prisma.companyInfo.findFirst();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Pengaturan Perusahaan</h1>
      <SettingsForm initialData={settings} />
    </div>
  );
}