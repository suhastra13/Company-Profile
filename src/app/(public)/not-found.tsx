import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 text-center">
      <div className="space-y-6">
        
        {/* Icon Besar */}
        <div className="relative w-32 h-32 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10">
          <FileQuestion className="w-16 h-16 text-gray-500" />
          <div className="absolute top-0 right-0 w-8 h-8 bg-primary rounded-full animate-ping" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Maaf, halaman yang Anda cari mungkin sudah dihapus, dipindahkan, atau memang tidak pernah ada.
          </p>
        </div>

        <Button asChild size="lg" className="bg-primary hover:bg-red-700 text-white">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" /> Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}