"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      // Panggil API
      const res = await fetch("/api/admin/portfolio"); // Gunakan API Admin agar konsisten
      const json = await res.json();
      
      // LOG DATA DI SINI UNTUK CEK
      console.log("Data dari API:", json); 
      
      setData(json);
    } catch (err) {
      toast.error("Gagal mengambil data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... (handleDelete tetap sama) ...
  const handleDelete = async (id: string) => {
    if (!confirm("Hapus portfolio ini selamanya?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Berhasil dihapus");
        fetchData();
      } else throw new Error();
    } catch (err) {
      toast.error("Gagal menghapus");
    }
  };

  const filteredData = data.filter((item) => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ... Header & Search tetap sama ... */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Portfolio Gallery</h1>
        <Link href="/admin/portfolio/create">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> Project Baru
          </Button>
        </Link>
      </div>

      <div className="bg-gray-900 border border-white/10 p-4 rounded-xl flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input 
          placeholder="Cari project..." 
          className="bg-transparent border-none text-white focus:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => {
            // --- LOGIKA PINTAR UNTUK GAMBAR ---
            // Cek 'images', kalau kosong cek 'gallery'
            // Pastikan formatnya array string
            let imageSrc = "/placeholder.png"; // Default image
            
            const rawImages = item.images || item.gallery; 
            
            if (Array.isArray(rawImages) && rawImages.length > 0) {
              imageSrc = rawImages[0];
            } else if (typeof rawImages === 'string') {
               // Jaga-jaga kalau kesimpan sebagai string JSON
               try {
                 const parsed = JSON.parse(rawImages);
                 if (parsed.length > 0) imageSrc = parsed[0];
               } catch (e) {
                 imageSrc = rawImages; // Siapa tau string URL biasa
               }
            }

            // Cek featured (bisa 'isFeatured' atau 'featured')
            const isFeatured = item.isFeatured || item.featured;

            return (
              <div key={item.id} className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-colors">
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full bg-gray-800">
                  {imageSrc !== "/placeholder.png" ? (
                    <Image 
                       src={imageSrc} 
                       alt={item.title} 
                       fill 
                       className="object-cover" 
                       onError={(e) => {
                         // Fallback kalau gambar gagal loading (broken link)
                         e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
                       }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 bg-gray-800">
                      No Image
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                      <Star className="w-3 h-3 fill-black" /> Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white font-bold truncate">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {/* Handle Tech Stack yang mungkin string JSON */}
                    {(() => {
                      let stack = item.techStack;
                      if (typeof stack === 'string') {
                        try { stack = JSON.parse(stack); } catch(e) { stack = []; }
                      }
                      if (!Array.isArray(stack)) stack = [];
                      
                      return (
                        <>
                          {stack.slice(0, 3).map((t: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-[10px] bg-white/10 text-gray-300">{t}</Badge>
                          ))}
                          {stack.length > 3 && <span className="text-xs text-gray-500">+{stack.length - 3}</span>}
                        </>
                      )
                    })()}
                  </div>

                  <div className="pt-2 flex justify-end gap-2 border-t border-white/5">
                    <Link href={`/admin/portfolio/${item.id}/edit`}>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-400/10"><Pencil className="w-4 h-4" /></Button>
                    </Link>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)} className="h-8 w-8 p-0 text-red-400 hover:bg-red-400/10"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}