"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Building, Phone, MapPin, Share2, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SettingsFormProps {
  initialData?: any;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Parsing socials dari JSON
  const socials = initialData?.socials || {};

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    // --- FIELD BARU ---
    history: initialData?.history || "",
    aboutImage: initialData?.aboutImage || "",
    // ------------------
    address: initialData?.address || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    whatsapp: initialData?.whatsapp || "",
    mapEmbedUrl: initialData?.mapEmbedUrl || "",
    instagram: socials.instagram || "",
    linkedin: socials.linkedin || "",
    github: socials.github || "",
    twitter: socials.twitter || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      // --- KIRIM FIELD BARU ---
      history: formData.history,
      aboutImage: formData.aboutImage,
      // ------------------------
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      mapEmbedUrl: formData.mapEmbedUrl,
      socials: {
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
      }
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success("Pengaturan perusahaan disimpan!");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* 1. INFO UMUM */}
      <div className="bg-gray-900 border border-white/10 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Building className="w-5 h-5 text-primary" /> Informasi Umum
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Nama Perusahaan</label>
            <Input name="name" value={formData.name} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Deskripsi Singkat / Tagline</label>
            <Input name="description" value={formData.description} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
        </div>
      </div>

      {/* --- BAGIAN BARU: ABOUT US CONTENT --- */}
      <div className="bg-gray-900 border border-white/10 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Konten Halaman About Us
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> URL Foto Kantor / Tim
            </label>
            <Input 
              name="aboutImage" 
              value={formData.aboutImage} 
              onChange={handleChange} 
              placeholder="Contoh: /uploads/kantor-kami.jpg (Upload dulu di Media Library & Copy Link)"
              className="bg-black/20 border-white/10 text-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Sejarah / Cerita Perjalanan Perusahaan</label>
            <Textarea 
              name="history" 
              value={formData.history} 
              onChange={handleChange} 
              placeholder="Ceritakan sejarah berdirinya perusahaan Anda di sini..."
              className="bg-black/20 border-white/10 text-white min-h-[150px]" 
            />
          </div>
        </div>
      </div>
      {/* ------------------------------------- */}

      {/* 2. KONTAK & ALAMAT */}
      <div className="bg-gray-900 border border-white/10 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" /> Kontak & Lokasi
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email Resmi</label>
            <Input name="email" value={formData.email} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">No. Telepon</label>
            <Input name="phone" value={formData.phone} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">No. WhatsApp</label>
            <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Alamat Lengkap</label>
          <Textarea name="address" value={formData.address} onChange={handleChange} className="bg-black/20 border-white/10 text-white h-24" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Link Google Maps Embed (src URL only)</label>
          <Input 
            name="mapEmbedUrl" 
            placeholder="http://googleusercontent.com/maps.google.com/..." 
            value={formData.mapEmbedUrl} 
            onChange={handleChange} 
            className="bg-black/20 border-white/10 text-white" 
          />
        </div>
      </div>

      {/* 3. SOCIAL MEDIA */}
      <div className="bg-gray-900 border border-white/10 p-6 rounded-xl space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Share2 className="w-5 h-5 text-primary" /> Social Media Links
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Instagram URL</label>
            <Input name="instagram" value={formData.instagram} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">LinkedIn URL</label>
            <Input name="linkedin" value={formData.linkedin} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">GitHub URL</label>
            <Input name="github" value={formData.github} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Twitter / X URL</label>
            <Input name="twitter" value={formData.twitter} onChange={handleChange} className="bg-black/20 border-white/10 text-white" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 min-w-[150px]">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Simpan Perubahan
        </Button>
      </div>

    </form>
  );
}