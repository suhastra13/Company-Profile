import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin");
  const isOnAdminAPI = req.nextUrl.pathname.startsWith("/api/admin");

  // Jika belum login tapi mau masuk area Admin
  if ((isOnAdminPanel || isOnAdminAPI) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

// Tentukan rute mana saja yang dijaga satpam
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};