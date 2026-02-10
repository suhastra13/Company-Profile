"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { 
  Upload, Trash2, Copy, FileText, Image as ImageIcon, 
  Loader2, Filter, Download 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Helper: Format Ukuran File
const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function MediaPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState("ALL"); // ALL, IMAGE, DOC
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch Data
  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      toast.error("Gagal memuat media");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  // 2. Upload Handler
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();
      
      toast.success("File berhasil diupload!");
      fetchFiles(); // Refresh list
    } catch (err) {
      toast.error("Gagal upload file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 3. Delete Handler
  const handleDelete = async (id: string) => {
    if (!confirm("Hapus file ini permanen?")) return;
    try {
      await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      toast.success("File dihapus");
      setFiles(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      toast.error("Gagal menghapus");
    }
  };

  // 4. Copy URL Handler
  const handleCopy = (url: string) => {
    // Tambahkan domain penuh jika perlu, tapi path relative biasanya cukup
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("URL disalin ke clipboard!");
  };

  // 5. Filter Logic
  const filteredFiles = files.filter(f => {
    if (filter === "ALL") return true;
    if (filter === "IMAGE") return f.type.startsWith("image/");
    if (filter === "DOC") return !f.type.startsWith("image/");
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-gray-400 text-sm">Kelola gambar dan dokumen website.</p>
        </div>
        
        {/* Upload Button Trigger */}
        <div className="relative">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleUpload} 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            disabled={isUploading}
          />
          <Button className="bg-primary hover:bg-primary/90">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
            {isUploading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>

      {/* Upload Area (Visual Only - Drag & Drop Simulation) */}
      <div 
        className="border-2 border-dashed border-white/20 bg-white/5 rounded-xl p-8 text-center hover:bg-white/10 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-gray-300 font-medium">Klik untuk upload atau drag & drop file ke sini</p>
        <p className="text-gray-500 text-sm mt-1">Mendukung JPG, PNG, PDF, DOCX (Max 5MB)</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["ALL", "IMAGE", "DOC"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === t 
                ? "bg-white text-black" 
                : "bg-gray-900 border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {t === "ALL" ? "Semua File" : t === "IMAGE" ? "Gambar" : "Dokumen"}
          </button>
        ))}
      </div>

      {/* Grid View */}
      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-gray-900 rounded-xl border border-white/10">
          Belum ada file yang diupload.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const isImage = file.type.startsWith("image/");
            
            return (
              <div key={file.id} className="group relative bg-gray-900 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all">
                
                {/* Thumbnail */}
                <div className="aspect-square relative bg-gray-800 flex items-center justify-center overflow-hidden">
                  {isImage ? (
                    <Image src={file.url} alt={file.filename} fill className="object-cover" />
                  ) : (
                    <FileText className="w-12 h-12 text-gray-500" />
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" onClick={() => handleCopy(file.url)} title="Copy URL">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(file.id)} title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* File Info */}
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate" title={file.filename}>
                    {file.filename}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{formatBytes(file.size)}</span>
                    <Badge variant="outline" className="text-[10px] h-5 border-white/10 text-gray-400">
                      {isImage ? 'IMG' : 'DOC'}
                    </Badge>
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