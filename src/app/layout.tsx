import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; // <--- 1. Import Toaster

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// METADATA TETAP DI SINI (Agar SEO bagus)
export const metadata: Metadata = {
  title: {
    default: "Wokil Tech - Software House & IoT Solutions",
    template: "%s | Wokil Tech"
  },
  description: "Jasa pembuatan Website, Aplikasi Android/iOS, dan IoT System profesional.",
  keywords: ["Software House", "Web Developer", "IoT Indonesia", "Laravel", "Next.js"],

  // --- TAMBAHAN BARU: LOGO DI TAB BROWSER ---
  icons: {
    icon: "/images/Wokil_Tech.png",     // Icon standar
    shortcut: "/images/Wokil_Tech.png", // Icon shortcut
    apple: "/images/Wokil_Tech.png",    // Icon untuk iPhone/iPad home screen
  },
  // ------------------------------------------
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Hapus class flex/bg di sini, pindahkan ke layout public nanti */}
      <body className={`${inter.variable} antialiased`}>
        
        {children}
        
        {/* 2. Tambahkan komponen ini agar notifikasi muncul */}
        <Toaster position="top-right" richColors />
        
      </body>
    </html>
  );
}