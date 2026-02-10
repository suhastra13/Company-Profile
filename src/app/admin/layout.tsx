"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar"; 
import AdminHeader from "@/components/admin/header";   

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Container utama (Flex Row)
    <div className="min-h-screen bg-gray-900 flex text-white font-sans">
      
      {/* 1. Sidebar (Kolom Kiri) */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 2. Wrapper Konten (Kolom Kanan) */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-900">
          {children} {/* <--- PASTIKAN HANYA ADA SATU DI SINI */}
        </main>

      </div>

      {/* JANGAN ADA {children} LAGI DI SINI */}
    </div>
  );
}