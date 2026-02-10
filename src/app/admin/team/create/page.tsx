import TeamForm from "@/components/admin/team-form";

export default function CreateTeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Tambah Anggota Tim</h1>
      <TeamForm />
    </div>
  );
}