import PortfolioForm from "@/components/admin/portfolio-form";

export default function CreatePortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Tambah Project Baru</h1>
      <PortfolioForm />
    </div>
  );
}