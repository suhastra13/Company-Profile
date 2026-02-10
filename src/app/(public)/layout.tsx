import { prisma } from "@/lib/prisma"; // 1. Import Prisma
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; 
import BackToTop from "@/components/ui/back-to-top";

export default async function PublicLayout({ // 2. Tambahkan 'async' di sini
  children,
}: {
  children: React.ReactNode;
}) {
  // 3. Ambil Data Company Info (Singleton) dari Database
  // Data ini berisi: Alamat, No HP, Sosmed, dll yang Anda isi di Admin Settings
  const companyInfo = await prisma.companyInfo.findFirst();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Jika Header Anda juga butuh data (misal No HP), Anda bisa passing props juga: <Header companyInfo={companyInfo} /> */}
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      {/* 4. Kirim Data ke Footer sebagai Props */}
      <Footer companyInfo={companyInfo} />
      
      {/* Catatan: FooterMinimal yang saya berikan sebelumnya sudah punya tombol BackToTop sendiri.
          Jika tombolnya jadi double, silakan hapus komponen <BackToTop /> di bawah ini. */}
      <BackToTop />
    </div>
  );
}