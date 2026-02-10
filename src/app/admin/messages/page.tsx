"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Search, Trash2, MailOpen, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MessageModal from "@/components/admin/message-modal";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL, UNREAD, READ, REPLIED
  const [search, setSearch] = useState("");
  
  // Modal State
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch Data
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      toast.error("Gagal mengambil pesan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // 2. Handle Status Change
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Optimistic Update (Ubah UI duluan biar cepat)
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));

      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) toast.success(`Status diubah menjadi ${newStatus}`);
      else throw new Error();
    } catch (error) {
      toast.error("Gagal update status");
      fetchMessages(); // Rollback jika gagal
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Biar gak kebuka modalnya saat klik delete
    if (!confirm("Hapus pesan ini permanen?")) return;

    try {
      setMessages(prev => prev.filter(msg => msg.id !== id)); // Optimistic delete
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      toast.success("Pesan dihapus");
    } catch (error) {
      toast.error("Gagal menghapus");
      fetchMessages();
    }
  };

  // 4. Filtering Logic
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filter === "ALL" || msg.status === filter;
    const matchesSearch = 
      msg.name.toLowerCase().includes(search.toLowerCase()) || 
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Inbox Pesan</h1>
        <div className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300">
          Total: <span className="font-bold text-white">{messages.length}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-gray-900 border border-white/10 p-4 rounded-xl">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {["ALL", "UNREAD", "READ", "REPLIED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status 
                  ? "bg-primary text-white" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {status === "ALL" ? "Semua" : status === "UNREAD" ? "Baru" : status}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input 
            placeholder="Cari pengirim atau isi..." 
            className="pl-10 bg-black/20 border-white/10 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-400 w-[200px]">Pengirim</TableHead>
              <TableHead className="text-gray-400">Pesan Singkat</TableHead>
              <TableHead className="text-gray-400 w-[150px]">Status</TableHead>
              <TableHead className="text-gray-400 w-[150px]">Tanggal</TableHead>
              <TableHead className="text-right text-gray-400 w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : filteredMessages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  Tidak ada pesan ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredMessages.map((msg) => (
                <TableRow 
                  key={msg.id} 
                  className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => { setSelectedMessage(msg); setIsModalOpen(true); }}
                >
                  <TableCell>
                    <div className="font-medium text-white">{msg.name}</div>
                    <div className="text-xs text-gray-500">{msg.email}</div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="line-clamp-1 text-sm">{msg.message}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`
                        ${msg.status === 'UNREAD' ? 'border-red-500 text-red-400 bg-red-500/10' : ''}
                        ${msg.status === 'READ' ? 'border-blue-500 text-blue-400 bg-blue-500/10' : ''}
                        ${msg.status === 'REPLIED' ? 'border-green-500 text-green-400 bg-green-500/10' : ''}
                      `}
                    >
                      {msg.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {new Date(msg.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-red-400 hover:bg-red-400/10 hover:text-red-300"
                        onClick={(e) => handleDelete(msg.id, e)}
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
      </div>

      {/* Modal Detail */}
      <MessageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message={selectedMessage}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}