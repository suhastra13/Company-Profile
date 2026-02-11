import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { render } from "@react-email/render"; // Pastikan import ini benar
import { EmailTemplate } from "@/components/email/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    // 1. Simpan ke Database
    const newContact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        company,
        message,
      },
    });

    // 2. Kirim Email Notifikasi
    try {
      // --- PERBAIKAN: Gunakan Syntax JSX (<EmailTemplate />) ---
      // Ini hanya bisa jalan jika file bernama route.tsx
      const emailHtml = await render(
        <EmailTemplate 
          name={name}
          email={email}
          phone={phone}
          company={company}
          message={message}
        />
      );

      const { data, error } = await resend.emails.send({
        from: 'Wokil Tech <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL as string],
        subject: `Lead Baru: ${name} - ${company || 'Personal'}`,
        html: emailHtml,
        text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`
      });

      if (error) {
        console.error("Resend Error:", error);
      }
    } catch (emailError) {
      console.error("Gagal merender email:", emailError);
    }

    return NextResponse.json(newContact, { status: 201 });

  } catch (error) {
    console.error("API Contact Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem saat mengirim pesan" },
      { status: 500 }
    );
  }
}