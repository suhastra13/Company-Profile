"use client";

import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 bg-gray-950/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      
      {/* Kiri: Toggle Sidebar (Mobile Only) */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white" 
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <h2 className="text-white font-semibold hidden md:block">Dashboard Overview</h2>
      </div>

      {/* Kanan: User Profile */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Bell className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">Super Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
            {/* Ganti src dengan session.user.image nanti */}
            <Image 
              src="https://ui-avatars.com/api/?name=Admin+Wokil&background=0D8ABC&color=fff" 
              alt="Admin" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}