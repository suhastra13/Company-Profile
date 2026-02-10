import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TeamForm from "@/components/admin/team-form";

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });

  if (!member) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Edit Anggota Tim</h1>
      <TeamForm initialData={member} />
    </div>
  );
}