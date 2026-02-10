"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // npx shadcn@latest add textarea

interface ServiceFormProps {
  initialData?: any; // Jika ada data, berarti mode EDIT
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State Form
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    icon: initialData?.icon || "Globe", // Default icon
    content: initialData?.content || "",
    features: initialData?.features || [], // Array of strings
  });

  const [newFeature, setNewFeature] = useState("");

  // Handle Input Biasa
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Features (Array)
  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature],
    }));
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Handle Submit (Create / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = initialData 
        ? `/api/admin/services/${initialData.id}`  // URL Edit
        : "/api/admin/services";                   // URL Create

      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      toast.success(initialData ? "Service diperbarui!" : "Service berhasil dibuat!");
      router.push("/admin/services");
      router.refresh();
      
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-gray-900 border border-white/10 p-6 rounded-xl">
      
      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Judul Layanan</label>
          <Input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Contoh: Web Development"
            required 
            className="bg-black/20 border-white/10 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Slug (URL)</label>
          <Input 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange} 
            placeholder="web-development"
            required 
            className="bg-black/20 border-white/10 text-white"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Deskripsi Singkat</label>
        <Textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Penjelasan singkat untuk card di halaman depan..."
          className="bg-black/20 border-white/10 text-white h-24"
          required
        />
      </div>

      {/* Icon */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Nama Icon (Lucide React)</label>
        <Input 
          name="icon" 
          value={formData.icon} 
          onChange={handleChange} 
          placeholder="Globe, Smartphone, Cpu..."
          className="bg-black/20 border-white/10 text-white"
        />
        <p className="text-xs text-gray-500">Gunakan nama icon dari Lucide React.</p>
      </div>

      {/* Features Input Array */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Fitur Layanan</label>
        <div className="flex gap-2">
          <Input 
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Tambah fitur (misal: Responsive Design)"
            className="bg-black/20 border-white/10 text-white"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} variant="secondary">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* List Features */}
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features.map((feature: string, idx: number) => (
            <div key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-primary/20">
              {feature}
              <button type="button" onClick={() => removeFeature(idx)} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
          Batal
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 min-w-[120px]">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Data"}
        </Button>
      </div>
    </form>
  );
}