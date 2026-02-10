"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Pastikan Anda punya komponen Table (shadcn) atau pakai div biasa

// Tipe data Service
interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 1. Fetch Data dari API
  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services"); // API Public yang sudah kita buat
      const data = await res.json();
      setServices(data);
    } catch (error) {
      toast.error("Gagal mengambil data services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 2. Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;

    try {
      toast.loading("Menghapus...");
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.dismiss();
        toast.success("Service berhasil dihapus");
        fetchServices(); // Refresh data
      } else {
        throw new Error("Gagal menghapus");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Terjadi kesalahan saat menghapus");
    }
  };

  // 3. Filter Search
  const filteredServices = services.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Services Management</h1>
        <Link href="/admin/services/create">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> Tambah Service
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-900 border border-white/10 p-4 rounded-xl flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input 
          placeholder="Cari layanan..." 
          className="bg-transparent border-none text-white focus:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-400">Title</TableHead>
                <TableHead className="text-gray-400">Slug</TableHead>
                <TableHead className="text-gray-400">Created At</TableHead>
                <TableHead className="text-right text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    Tidak ada data ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service.id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-white">{service.title}</TableCell>
                    <TableCell className="text-gray-400">{service.slug}</TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(service.createdAt).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/services/${service.id}/edit`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}