import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { EmailTemplate } from "@/components/email/email-template";

// Inisialisasi Resend dengan API Key dari .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    // 1. Simpan ke Database menggunakan model ContactMessage
    const newContact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        company,
        message,
        // Status default UNREAD akan terisi otomatis sesuai schema
      },
    });

    // 2. Kirim Email Notifikasi ke Admin
    try {
      // Merender komponen React menjadi HTML string agar bisa dikirim oleh Resend
      const emailHtml = await render(
        EmailTemplate({ 
          name, 
          email, 
          phone, 
          company, 
          message 
        })
      );

      const { data, error } = await resend.emails.send({
        from: 'Wokil Tech <onboarding@resend.dev>', // Tetap gunakan ini jika domain belum verified
        to: [process.env.ADMIN_EMAIL as string], // Email tujuan dari .env
        subject: `Lead Baru: ${name} - ${company || 'Personal'}`,
        html: emailHtml,
        text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}` // Fallback teks biasa
      });

      if (error) {
        console.error("Resend Error:", error);
      }
    } catch (emailError) {
      // Log error jika pengiriman email gagal, namun tetap beri respon sukses ke user
      // karena data sudah berhasil masuk ke Database
      console.error("Gagal merender atau mengirim email:", emailError);
    }

    // Mengembalikan respon sukses 201 ke frontend
    return NextResponse.json(newContact, { status: 201 });

  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem saat mengirim pesan" },
      { status: 500 }
    );
  }
}