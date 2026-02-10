"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Linkedin, Github, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/team");
      const json = await res.json();
      setMembers(json);
    } catch (err) {
      toast.error("Gagal mengambil data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus anggota tim ini?")) return;
    try {
      await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      toast.success("Berhasil dihapus");
      fetchData();
    } catch (err) {
      toast.error("Gagal menghapus");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Team Management</h1>
        <Link href="/admin/team/create">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> Tambah Anggota
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-gray-900 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
              
              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-2xl font-bold text-gray-500">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.position}</p>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">{member.bio || "Tidak ada bio."}</p>

              {/* Social Icons (Parsing JSON) */}
              <div className="flex gap-2 mb-6">
                {member.socials?.linkedin && <Linkedin className="w-4 h-4 text-blue-500" />}
                {member.socials?.github && <Github className="w-4 h-4 text-gray-400" />}
                {member.socials?.instagram && <Instagram className="w-4 h-4 text-pink-500" />}
                {member.socials?.website && <Globe className="w-4 h-4 text-green-500" />}
                {(!member.socials || Object.keys(member.socials).length === 0) && <span className="text-xs text-gray-600">No Socials</span>}
              </div>

              {/* Actions */}
              <div className="flex gap-2 w-full mt-auto pt-4 border-t border-white/5">
                <Link href={`/admin/team/${member.id}/edit`} className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full text-blue-400 hover:bg-blue-400/10"><Pencil className="w-4 h-4 mr-2" /> Edit</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)} className="flex-1 text-red-400 hover:bg-red-400/10"><Trash2 className="w-4 h-4 mr-2" /> Hapus</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}