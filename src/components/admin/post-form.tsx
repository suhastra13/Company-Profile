"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Save, Image as ImageIcon, Link as LinkIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PostFormProps {
  initialData?: any;
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Technology",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
    published: initialData?.published || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload Image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: uploadData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFormData(prev => ({ ...prev, coverImage: data.url }));
      toast.success("Cover image diupload!");
    } catch (error) {
      toast.error("Gagal upload gambar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
        toast.error("Judul dan Slug wajib diisi");
        return;
    }
    setIsLoading(true);

    try {
      const url = initialData ? `/api/admin/posts/${initialData.id}` : "/api/admin/posts";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      toast.success("Postingan berhasil disimpan!");
      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* KOLOM KIRI: KONTEN */}
      <div className="lg:col-span-2 space-y-6 bg-gray-900 border border-white/10 p-6 rounded-xl">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Judul Artikel</label>
          <Input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            className="bg-black/20 border-white/10 text-white text-lg font-semibold" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Slug (URL)</label>
          <Input 
            name="slug" 
            value={formData.slug} 
            onChange={(e) => {
                const val = e.target.value.toLowerCase().replace(/\s+/g, '-');
                setFormData(prev => ({ ...prev, slug: val }));
            }}
            required 
            className="bg-black/20 border-white/10 text-white" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Kutipan Singkat (Excerpt)</label>
          <Textarea 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            className="bg-black/20 border-white/10 text-white h-24" 
            placeholder="Ringkasan singkat untuk ditampilkan di kartu blog..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Konten Lengkap</label>
          {/* Nanti bisa diganti Rich Text Editor, sekarang Textarea dulu */}
          <Textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            className="bg-black/20 border-white/10 text-white min-h-[400px] font-mono text-sm leading-relaxed" 
            placeholder="Tulis konten artikel di sini..."
          />
          <p className="text-xs text-gray-500">Tips: Anda bisa menggunakan format HTML sederhana.</p>
        </div>
      </div>

      {/* KOLOM KANAN: SETTINGS & IMAGE */}
      <div className="space-y-6">
        
        {/* Publish Status */}
        <div className="bg-gray-900 border border-white/10 p-6 rounded-xl flex items-center justify-between">
          <span className="text-sm text-white font-medium">Publish Sekarang?</span>
          <input 
            type="checkbox" 
            checked={formData.published} 
            onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            className="w-5 h-5 accent-primary"
          />
        </div>

        {/* Category */}
        <div className="bg-gray-900 border border-white/10 p-6 rounded-xl space-y-4">
          <label className="text-sm text-gray-400">Kategori</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
          >
            <option value="Company News">Company News</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Culture">Culture</option>
            <option value="Tips & Trick">Tips & Trick</option>
          </select>
        </div>

        {/* Cover Image */}
        <div className="bg-gray-900 border border-white/10 p-6 rounded-xl space-y-4">
          <label className="text-sm text-gray-400">Cover Image</label>
          
          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/50">
            {formData.coverImage ? (
  // Gunakan img biasa agar langsung membaca file tanpa optimasi Next.js yang kadang delay
  <img 
    src={formData.coverImage} 
    alt="Cover" 
    className="w-full h-full object-cover" 
  />
) : (
              <div className="flex items-center justify-center h-full text-gray-600">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
          </div>

          {/* Input URL Manual */}
          <div className="flex gap-2">
            <Input 
               placeholder="/uploads/..." 
               value={urlInput}
               onChange={(e) => setUrlInput(e.target.value)}
               className="bg-black/20 border-white/10 text-white text-xs h-8"
            />
            <Button type="button" onClick={() => {setFormData(prev => ({...prev, coverImage: urlInput})); setUrlInput("")}} variant="secondary" size="sm" className="h-8">
               <LinkIcon className="w-3 h-3" />
            </Button>
          </div>

          {/* Upload Button */}
          <div className="relative">
             <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={isUploading} />
             <Button type="button" variant="outline" className="w-full border-dashed border-white/20 bg-transparent text-gray-400" disabled={isUploading}>
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                Upload Gambar
             </Button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={() => router.back()} className="flex-1 text-gray-400">Batal</Button>
          <Button type="submit" disabled={isLoading} className="flex-1 bg-primary text-white hover:bg-primary/90">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Post"}
          </Button>
        </div>

      </div>
    </form>
  );
}