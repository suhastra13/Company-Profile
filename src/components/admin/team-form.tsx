"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Upload, Github, Linkedin, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TeamFormProps {
  initialData?: any;
}

export default function TeamForm({ initialData }: TeamFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Parsing data socials dari DB (karena bentuknya JSON)
  const initialSocials = initialData?.socials || {};

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    position: initialData?.position || "",
    bio: initialData?.bio || "",
    photo: initialData?.photo || "",
    order: initialData?.order || 0,
    // Social Links dipisah biar gampang ngeditnya
    linkedin: initialSocials.linkedin || "",
    github: initialSocials.github || "",
    instagram: initialSocials.instagram || "",
    website: initialSocials.website || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload Foto Profil
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: uploadData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFormData(prev => ({ ...prev, photo: data.url }));
      toast.success("Foto berhasil diupload");
    } catch (error) {
      toast.error("Gagal upload foto");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Gabungkan input sosial media jadi satu object JSON
    const payload = {
      name: formData.name,
      position: formData.position,
      bio: formData.bio,
      photo: formData.photo,
      order: formData.order,
      socials: {
        linkedin: formData.linkedin,
        github: formData.github,
        instagram: formData.instagram,
        website: formData.website,
      }
    };

    try {
      const url = initialData ? `/api/admin/team/${initialData.id}` : "/api/admin/team";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success("Data tim berhasil disimpan!");
      router.push("/admin/team");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* KIRI: Informasi Dasar */}
      <div className="space-y-6 bg-gray-900 border border-white/10 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Informasi Profil</h3>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Nama Lengkap</label>
          <Input name="name" value={formData.name} onChange={handleChange} required className="bg-black/20 border-white/10 text-white" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <label className="text-sm text-gray-400">Posisi / Jabatan</label>
            <Input name="position" value={formData.position} onChange={handleChange} required placeholder="CTO, Designer..." className="bg-black/20 border-white/10 text-white" />
            </div>
            <div className="space-y-2">
            <label className="text-sm text-gray-400">Urutan Tampil</label>
            <Input type="number" name="order" value={formData.order} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
            </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Bio Singkat</label>
          <Textarea name="bio" value={formData.bio} onChange={handleChange} className="bg-black/20 border-white/10 text-white h-24" />
        </div>

        {/* Upload Foto */}
        <div className="space-y-2">
            <label className="text-sm text-gray-400">Foto Profil</label>
            <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-800 border border-white/10">
                    {formData.photo ? (
                        <Image src={formData.photo} alt="Avatar" fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-500">No Photo</div>
                    )}
                </div>
                <div className="relative">
                    <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={isUploading} />
                    <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        Ganti Foto
                    </Button>
                </div>
            </div>
        </div>
      </div>

      {/* KANAN: Social Media Links */}
      <div className="space-y-6 bg-gray-900 border border-white/10 p-6 rounded-xl h-fit">
        <h3 className="text-lg font-semibold text-white mb-4">Social Media (Opsional)</h3>
        
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-500" />
                <Input name="linkedin" placeholder="Link LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
            </div>
            <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-gray-200" />
                <Input name="github" placeholder="Link GitHub Profile" value={formData.github} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
            </div>
            <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-500" />
                <Input name="instagram" placeholder="Link Instagram Profile" value={formData.instagram} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
            </div>
            <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-500" />
                <Input name="website" placeholder="Link Website / Portfolio" value={formData.website} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
            </div>
        </div>

        <div className="pt-4 flex gap-3">
            <Button type="button" variant="ghost" onClick={() => router.back()} className="flex-1 text-gray-400">Batal</Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-primary text-white hover:bg-primary/90">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Data"}
            </Button>
        </div>
      </div>
    </form>
  );
}