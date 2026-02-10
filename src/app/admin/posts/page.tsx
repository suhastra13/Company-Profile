"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const json = await res.json();
      setPosts(json);
    } catch (err) { toast.error("Gagal load data"); } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus artikel ini?")) return;
    try {
      await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      toast.success("Artikel dihapus");
      fetchData();
    } catch (err) { toast.error("Gagal hapus"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        <Link href="/admin/posts/create">
          <Button className="bg-primary hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" /> Tulis Artikel</Button>
        </Link>
      </div>

      {isLoading ? <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /> : (
        <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 uppercase text-xs text-gray-200">
              <tr>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                  <td className="px-6 py-4"><Badge variant="outline">{post.category}</Badge></td>
                  <td className="px-6 py-4">
                    {post.published ? 
                      <span className="flex items-center text-green-400"><Eye className="w-3 h-3 mr-1" /> Published</span> : 
                      <span className="flex items-center text-yellow-400"><EyeOff className="w-3 h-3 mr-1" /> Draft</span>
                    }
                  </td>
                  <td className="px-6 py-4">{post.author?.name || "Admin"}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Link href={`/admin/posts/${post.id}/edit`}><Button size="sm" variant="ghost"><Pencil className="w-4 h-4" /></Button></Link>
                    <Button size="sm" variant="ghost" className="text-red-400" onClick={() => handleDelete(post.id)}><Trash2 className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}