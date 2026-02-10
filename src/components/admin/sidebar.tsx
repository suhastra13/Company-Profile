"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Globe, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
    Newspaper,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils"; // Pastikan Anda punya utility ini (atau hapus cn dan pakai string biasa)

const menuItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Services", href: "/admin/services", icon: Globe },
  { title: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { title: "Blog / News", href: "/admin/posts", icon: Newspaper }, // Opsional jika mau ada blog
  { title: "Team", href: "/admin/team", icon: Users },
  { title: "Testimonials", href: "/admin/testimonials", icon: Star },
  { title: "Messages", href: "/admin/messages", icon: MessageSquare },
  { title: "Library", href: "/admin/media", icon: Newspaper },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay Gelap untuk Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-gray-950 border-r border-white/10 transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Wokil Admin
          </span>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // Tutup sidebar saat klik (mobile)
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all mt-8"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </nav>
      </aside>
    </>
  );
}