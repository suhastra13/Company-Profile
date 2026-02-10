"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Jangan tampilkan di Home
  if (pathname === "/") return null;

  // Pecah URL jadi array. Contoh: "/services/web-dev" -> ["services", "web-dev"]
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-400">
        
        {/* Link Home */}
        <li>
          <Link href="/" className="hover:text-primary transition-colors flex items-center">
            <Home className="w-4 h-4" />
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          // Buat URL untuk segment ini
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          
          // Format text: "web-dev" -> "Web Dev"
          const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          
          // Cek apakah ini halaman terakhir (tidak bisa diklik)
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-600" />
              {isLast ? (
                <span className="text-white font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}