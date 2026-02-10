"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Loader2,
  CheckCircle2,
  Globe
} from "lucide-react";

// --- VALIDASI FORM ---
const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  phone: z.string().min(10, { message: "Nomor HP minimal 10 digit" }).regex(/^[0-9]+$/, "Hanya boleh angka"),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Pesan terlalu pendek." }),
});

type FormData = z.infer<typeof formSchema>;

// --- TIPE DATA DARI SERVER ---
interface CompanyInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapEmbedUrl: string | null;
  socials: any;
}

export default function ContactContent({ info }: { info: CompanyInfo | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Default values jika database kosong
  const companyEmail = info?.email || "hello@wokiltech.com";
  const companyPhone = info?.phone || "+62 812-3456-7890";
  const companyWa = info?.whatsapp || "6281234567890";
  const companyAddress = info?.address || "Jakarta, Indonesia";
  const companyMap = info?.mapEmbedUrl || "";
  const socials = info?.socials || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mengirim pesan");

      setIsSuccess(true);
      reset();
      toast.success("Pesan berhasil dikirim!");
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-32 pb-20">
      
      {/* HERO SECTION */}
      <section className="container mx-auto px-4 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tim Kami</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Siap mendigitalkan bisnis Anda? Diskusikan ide proyek Anda, atau sekadar bertanya, kami siap membantu 24/7.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- KOLOM KIRI: INFO & MAP --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid gap-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                <div className="p-3 bg-primary/20 rounded-lg text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Email Kami</h3>
                  <p className="text-gray-400 mb-2">Respon cepat dalam 24 jam</p>
                  <a href={`mailto:${companyEmail}`} className="text-white hover:text-primary transition-colors font-medium">
                    {companyEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">WhatsApp / Telepon</h3>
                  <p className="text-gray-400 mb-2">Senin - Jumat (09.00 - 17.00)</p>
                  <a href={`https://wa.me/${companyWa}`} target="_blank" className="text-white hover:text-secondary transition-colors font-medium">
                    {companyPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Kantor Pusat</h3>
                  <p className="text-gray-400 whitespace-pre-line">
                    {companyAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media (Dynamic) */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Ikuti Kami</h3>
              <div className="flex gap-4">
                {socials.instagram && (
                  <Link href={socials.instagram} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all hover:scale-110 border border-white/10">
                    <Instagram className="w-5 h-5" />
                  </Link>
                )}
                {socials.linkedin && (
                  <Link href={socials.linkedin} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110 border border-white/10">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
                {socials.twitter && (
                  <Link href={socials.twitter} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all hover:scale-110 border border-white/10">
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {socials.github && (
                  <Link href={socials.github} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all hover:scale-110 border border-white/10">
                    <Globe className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Google Maps Embed */}
            {companyMap && (
              <div className="rounded-2xl overflow-hidden border border-white/10 h-64 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src={companyMap} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </motion.div>

          {/* --- KOLOM KANAN: FORM (TETAP SAMA) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
             <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-sm relative overflow-hidden">
               
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />

               <h2 className="text-2xl font-bold mb-6 text-white">Kirim Pesan</h2>

               {isSuccess ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-green-500/10 border border-green-500/20 text-green-400 p-8 rounded-xl text-center flex flex-col items-center justify-center h-full min-h-[400px]"
                 >
                   <div className="bg-green-500/20 p-4 rounded-full mb-6">
                     <CheckCircle2 className="w-16 h-16 text-green-500" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2 text-white">Pesan Terkirim!</h3>
                   <p className="text-gray-300 mb-8 max-w-xs mx-auto">
                     Terima kasih telah menghubungi kami. Tim kami akan segera membaca pesan Anda.
                   </p>
                   <Button 
                     onClick={() => setIsSuccess(false)} 
                     variant="outline" 
                     className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                   >
                     Kirim Pesan Lain
                   </Button>
                 </motion.div>
               ) : (
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-400">Nama Lengkap</label>
                       <Input {...register("name")} placeholder="Masukan nama lengkap" className="bg-black/20 border-white/10 text-white focus:border-primary" />
                       {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-400">Email</label>
                       <Input {...register("email")} placeholder="client@example.com" className="bg-black/20 border-white/10 text-white focus:border-primary" />
                       {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                     </div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-400">Nomor WhatsApp</label>
                       <Input {...register("phone")} placeholder="08123456789" type="tel" className="bg-black/20 border-white/10 text-white focus:border-primary" />
                       {errors.phone && <span className="text-red-400 text-xs">{errors.phone.message}</span>}
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-400">Perusahaan (Opsional)</label>
                       <Input {...register("company")} placeholder="PT. Maju Mundur" className="bg-black/20 border-white/10 text-white focus:border-primary" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-400">Pesan / Detail Project</label>
                     <Textarea {...register("message")} placeholder="Ceritakan kebutuhan project Anda..." className="bg-black/20 border-white/10 text-white focus:border-primary min-h-[150px]" />
                     {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
                   </div>
                   <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold h-12">
                     {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengirim...</> : <><Send className="w-4 h-4 mr-2" /> Kirim Pesan Sekarang</>}
                   </Button>
                 </form>
               )}
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}