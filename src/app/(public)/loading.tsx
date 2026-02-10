import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Logo Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
          </div>
        </div>
        
        <p className="text-white font-medium animate-pulse">Memuat Wokil Tech...</p>
      </div>
    </div>
  );
}