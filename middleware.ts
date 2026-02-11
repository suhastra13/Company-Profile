import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Pastikan path ini benar (bisa "@/auth" atau "./auth")

export default auth((req) => {
  // Cek status login
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnLogin = req.nextUrl.pathname.startsWith("/auth/login"); // Ganti sesuai url login Anda

  // 1. Jika user mau ke Admin TAPI belum login -> Tendang ke Login
  if (isOnAdmin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // 2. Jika user SUDAH login TAPI mau ke halaman Login -> Arahkan ke Admin (biar gak login 2x)
  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

// Tentukan rute mana yang dijaga
export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};