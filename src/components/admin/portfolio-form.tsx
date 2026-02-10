"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Plus, X, Upload, Trash2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PortfolioFormProps {
  initialData?: any;
}

export default function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // STATE BARU: Untuk menampung input URL manual (Copy-Paste dari Media Library)
  const [urlInput, setUrlInput] = useState(""); 

  // State Utama Form
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    client: initialData?.client || "",
    category: initialData?.category || "Web Development",
    description: initialData?.description || "",
    techStack: initialData?.techStack || [], // Array string
    images: initialData?.images || [],       // Array string (URL)
    isFeatured: initialData?.isFeatured || false,
  });

  const [newTech, setNewTech] = useState("");

  // --- HANDLER INPUT TEXT ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- HANDLER TECH STACK (TAGS) ---
  const addTech = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newTech.trim()) return;
    setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, newTech] }));
    setNewTech("");
  };

  const removeTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_: any, i: number) => i !== index),
    }));
  };

  // --- FITUR BARU: Tambah Gambar via Paste URL ---
  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, urlInput], // Masukkan URL ke list images
    }));
    
    setUrlInput(""); // Reset input
    toast.success("Link gambar berhasil ditambahkan!");
  };

  // --- HANDLER IMAGE UPLOAD (Upload File Baru) ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      // Kita gunakan API Media Library agar file masuk ke library juga
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      
      // Masukkan URL gambar ke state
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, data.url],
      }));
      
      toast.success("Gambar berhasil diupload!");
    } catch (error) {
      toast.error("Gagal mengupload gambar.");
    } finally {
      setIsUploading(false);
      // Reset input file agar bisa upload file yang sama lagi
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  // --- SUBMIT DATA ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Manual
    if (!formData.title || !formData.slug) {
        toast.error("Judul dan Slug wajib diisi!");
        return;
    }

    setIsLoading(true);

    try {
      const url = initialData ? `/api/admin/portfolio/${initialData.id}` : "/api/admin/portfolio";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      toast.success("Portfolio berhasil disimpan!");
      router.push("/admin/portfolio");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* KOLOM KIRI (Form Utama) */}
      <div className="lg:col-span-2 space-y-6 bg-gray-900 border border-white/10 p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Judul Project</label>
            <Input name="title" value={formData.title} onChange={handleChange} required className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Slug (URL)</label>
            <Input 
                name="slug" 
                value={formData.slug} 
                onChange={(e) => {
                    // Otomatis ubah spasi jadi strip & huruf kecil
                    const val = e.target.value.toLowerCase().replace(/\s+/g, '-');
                    setFormData(prev => ({ ...prev, slug: val }));
                }} 
                required 
                className="bg-black/20 border-white/10 text-white" 
            />
            <p className="text-xs text-gray-500">Contoh: web-registrasi-magang (Jangan pakai spasi)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Nama Klien</label>
            <Input name="client" value={formData.client} onChange={handleChange} placeholder="Contoh: PT. Maju Mundur" className="bg-black/20 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Kategori</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="IoT">IoT Solutions</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Deskripsi Project</label>
          <Textarea name="description" value={formData.description} onChange={handleChange} className="bg-black/20 border-white/10 text-white h-32" />
        </div>

        {/* TECH STACK INPUT */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Tech Stack (Enter untuk tambah)</label>
          <div className="flex gap-2">
            <Input 
              value={newTech} 
              onChange={(e) => setNewTech(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && addTech(e)}
              placeholder="React, Laravel, MySQL..." 
              className="bg-black/20 border-white/10 text-white"
            />
            <Button type="button" onClick={() => addTech()} variant="secondary"><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.techStack.map((tech: string, idx: number) => (
              <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-primary/20">
                {tech}
                <button type="button" onClick={() => removeTech(idx)}><X className="w-3 h-3 hover:text-white" /></button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* KOLOM KANAN (Gambar & Status) */}
      <div className="space-y-6">
        {/* Featured Toggle */}
        <div className="bg-gray-900 border border-white/10 p-6 rounded-xl flex items-center justify-between">
          <span className="text-sm text-white font-medium">Featured Project?</span>
          <input 
            type="checkbox" 
            checked={formData.isFeatured} 
            onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
            className="w-5 h-5 accent-primary"
          />
        </div>

        {/* Image Management Area */}
        <div className="bg-gray-900 border border-white/10 p-6 rounded-xl space-y-4">
          <label className="text-sm text-gray-400 font-medium">Project Gallery</label>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 gap-2">
            {formData.images.map((img: string, idx: number) => (
              <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group bg-black/50">
                <Image src={img} alt="Project" fill className="object-cover" />
                <button 
                  type="button" 
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500/80 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* OPSI 1: Paste URL (Fitur Baru untuk Media Library) */}
          <div className="space-y-2 pt-4 border-t border-white/5">
             <label className="text-xs text-gray-500 font-semibold">Opsi A: Paste Link (Dari Media Library)</label>
             <div className="flex gap-2">
                <Input 
                   placeholder="/uploads/nama-file.jpg" 
                   value={urlInput}
                   onChange={(e) => setUrlInput(e.target.value)}
                   className="bg-black/20 border-white/10 text-white text-sm"
                />
                <Button type="button" onClick={handleAddUrl} variant="secondary" size="icon" title="Tambahkan URL">
                   <LinkIcon className="w-4 h-4" />
                </Button>
             </div>
          </div>

          {/* OPSI 2: Upload Langsung */}
          <div className="relative pt-2">
            <label className="text-xs text-gray-500 mb-2 block font-semibold">Opsi B: Upload Baru</label>
            <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <Button type="button" variant="outline" className="w-full border-dashed border-white/20 bg-transparent hover:bg-white/5 text-gray-400" disabled={isUploading}>
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                  {isUploading ? "Uploading..." : "Upload Image"}
                </Button>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={() => router.back()} className="flex-1 text-gray-400">Batal</Button>
          <Button type="submit" disabled={isLoading} className="flex-1 bg-primary text-white hover:bg-primary/90">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Project"}
          </Button>
        </div>
      </div>
    </form>
  );
}