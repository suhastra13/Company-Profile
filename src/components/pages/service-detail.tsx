"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Clock, 
  Settings, 
  Sparkles,
  Zap,
  Search, Laptop, Code2, ShieldCheck, Rocket // Import icon default untuk process
} from "lucide-react";
import * as LucideIcons from "lucide-react"; // Import semua icon untuk dynamic rendering

// 1. Helper: Ubah String Database jadi Icon
const getIcon = (name: string) => {
  // @ts-ignore
  return LucideIcons[name] || LucideIcons.Zap;
};

// 2. Data Default untuk Process (Karena belum ada di DB)
const defaultProcess = [
  { title: "Discovery", desc: "Analisis kebutuhan bisnis & riset kompetitor.", icon: Search },
  { title: "Design", desc: "Pembuatan Wireframe & High-Fidelity UI.", icon: Laptop },
  { title: "Development", desc: "Coding frontend & backend dengan teknologi terbaru.", icon: Code2 },
  { title: "Testing", desc: "Uji performa, keamanan, dan bug fixing.", icon: ShieldCheck },
  { title: "Launch", desc: "Deployment ke server production & serah terima.", icon: Rocket },
];

// 3. Data Default untuk FAQ (Karena belum ada di DB)
const defaultFaqs = [
  { q: "Berapa lama pengerjaannya?", a: "Estimasi waktu tergantung kompleksitas fitur. Mulai dari 2 minggu hingga 3 bulan." },
  { q: "Apakah ada garansi?", a: "Ya, kami memberikan garansi maintenance gratis (bug fixing) selama 3 bulan setelah rilis." },
  { q: "Bagaimana sistem pembayarannya?", a: "Termin pembayaran fleksibel, biasanya DP 50% di awal dan pelunasan 50% setelah serah terima." },
];

export default function ServiceDetail({ service }: { service: any }) {
  // Ambil Icon Utama dari DB
  const MainIcon = getIcon(service.icon);

  // Gunakan content dari DB jika ada, jika tidak pakai description
  const mainDescription = service.content || service.description;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden md:pt-40">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(255, 68, 68, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 68, 68, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Semua Layanan
            </Link>
            
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-white mb-6">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Service Detail</span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                 <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <MainIcon className="w-10 h-10 text-primary" />
                 </div>
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    {service.title}
                 </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold group"
              >
                <Link href={`/contact?service=${service.slug}`} className="flex items-center gap-2">
                  Konsultasi Project Ini
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION & FEATURES */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="text-secondary w-8 h-8" /> 
                Detail Layanan
              </h2>
              {/* Render Content Rich Text (whitespace-pre-wrap agar enter terbaca) */}
              <div className="text-gray-300 text-lg leading-relaxed mb-10 whitespace-pre-wrap">
                {mainDescription}
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-white">Fitur Unggulan:</h3>
              <div className="space-y-4">
                {(service.features as string[])?.map((item: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Card */}
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden group sticky top-24">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 opacity-50" />
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10" />
              
              <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/50 group-hover:scale-110 transition-transform duration-500">
                  <Settings className="w-12 h-12 text-white animate-spin-slow" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Professional Standard</h3>
                <p className="text-gray-400 text-lg">Dikerjakan oleh tim expert Wokil Tech</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE (Menggunakan Data Default) */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-white mb-4">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Workflow</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Bagaimana Kami Bekerja</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {defaultProcess.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative group">
                    <div className="h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-xs font-mono text-primary mb-2">STEP {idx + 1}</div>
                      <h4 className="text-lg font-bold mb-2 text-white">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                    {/* Connector */}
                    {idx < defaultProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (Menggunakan Data Default) */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Sering Ditanyakan</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {defaultFaqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`item-${idx}`} 
                  className="border border-white/10 rounded-2xl px-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <AccordionTrigger className="text-lg text-white hover:text-primary hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed text-base pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Zap className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Siap Memulai Project?</h2>
            <p className="text-gray-300 mb-10 text-lg md:text-xl leading-relaxed">
              Diskusikan kebutuhan spesifik Anda dengan tim kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold group"
              >
                <Link href={`/contact?service=${service.slug}`} className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Hubungi Kami via WhatsApp
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-semibold"
              >
                <Link href="/portfolio">Lihat Hasil Karya</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}