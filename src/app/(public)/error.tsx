"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke layanan pelaporan (opsional)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-lg">
        <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Terjadi Kesalahan Sistem</h2>
          <p className="text-gray-400">
            Jangan panik. Tim teknis kami sudah diberitahu. Silakan coba muat ulang halaman.
          </p>
          <p className="text-xs text-gray-600 mt-4 font-mono bg-black/30 p-2 rounded">
            Error: {error.message}
          </p>
        </div>

        <Button onClick={() => reset()} variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <RefreshCcw className="w-4 h-4 mr-2" /> Coba Lagi
        </Button>
      </div>
    </div>
  );
}