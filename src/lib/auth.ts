import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

// Schema validasi input login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // 1. Label form (Opsional, karena kita akan buat form custom nanti)
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // 2. Logika Authorize (Cek Password)
      authorize: async (credentials) => {
        try {
          // Validasi tipe data input
          const { email, password } = await loginSchema.parseAsync(credentials)

          // Cari user di database
          const user = await prisma.user.findUnique({
            where: { email },
          })

          // Jika user tidak ada
          if (!user) {
            console.log("User not found")
            return null
          }

          // Cek password hash dengan bcrypt
          const passwordsMatch = await bcrypt.compare(password, user.password!)

          if (!passwordsMatch) {
            console.log("Password mismatch")
            return null
          }

          // Jika sukses, kembalikan data user (tanpa password)
          return user
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  // 3. Konfigurasi Halaman (Nanti kita buat custom page)
  pages: {
    signIn: "/login", // Jika belum login, redirect ke sini
  },
  // 4. Callbacks (Mengatur isi Token & Session)
  callbacks: {
    async jwt({ token, user }) {
      // Saat login pertama kali, masukkan role & id ke token
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Masukkan data dari token ke session agar bisa diakses di frontend
      if (session.user && token) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt", // Kita pakai JWT, bukan database session
  },
  secret: process.env.AUTH_SECRET, // Mengambil secret dari .env
})