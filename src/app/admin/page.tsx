import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Briefcase, 
  Globe, 
  MessageSquare, 
  Plus, 
  ArrowRight,
  Users
} from "lucide-react";

export default async function AdminDashboard() {
  // 1. Cek Auth (Proteksi Ganda)
  const session = await auth();
  if (!session) redirect("/login");

  // 2. Ambil Data Real dari Database (Parallel Fetching biar cepat)
  const [
    servicesCount, 
    portfolioCount, 
    messagesCount,
    recentMessages
  ] = await Promise.all([
    prisma.service.count(),
    prisma.portfolio.count(),
    prisma.contactMessage.count({ where: { status: 'UNREAD' } }), // Hitung pesan belum dibaca
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, message: true, createdAt: true }
    })
  ]);

  return (
    <div className="space-y-8">
      {/* 5.3.5 - Welcome Message */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">
            Halo, <span className="text-primary font-semibold">{session.user?.name || "Admin"}</span>! Berikut ringkasan website Anda.
          </p>
        </div>
        
        {/* 5.3.4 - Quick Actions */}
        <div className="flex gap-3">
          <Link 
            href="/admin/portfolio/create" 
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Portfolio
          </Link>
          <Link 
            href="/admin/messages" 
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> Cek Pesan
          </Link>
        </div>
      </div>

      {/* 5.3.2 - Stats Cards (Real Data) */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: Services */}
        <Card className="bg-gray-900 border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Layanan</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servicesCount}</div>
            <p className="text-xs text-gray-500 mt-1">Layanan aktif ditampilkan</p>
          </CardContent>
        </Card>

        {/* Card 2: Portfolio */}
        <Card className="bg-gray-900 border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Proyek</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioCount}</div>
            <p className="text-xs text-gray-500 mt-1">Portfolio di database</p>
          </CardContent>
        </Card>

        {/* Card 3: Messages */}
        <Card className="bg-gray-900 border-white/10 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pesan Baru</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesCount}</div>
            <p className="text-xs text-gray-500 mt-1">Pesan belum dibaca</p>
          </CardContent>
        </Card>
      </div>

      {/* 5.3.3 - Recent Messages List */}
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Pesan Terbaru</h3>
          <Link href="/admin/messages" className="text-sm text-primary hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {recentMessages.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada pesan masuk.</p>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {msg.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-white truncate">{msg.name}</h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mb-1">{msg.email}</p>
                  <p className="text-sm text-gray-300 line-clamp-2">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}