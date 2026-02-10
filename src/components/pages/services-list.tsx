"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, ArrowRight, Code2, Layers, Zap, Sparkles, BookOpen } from "lucide-react";
import * as LucideIcons from "lucide-react"; 
import { motion } from "framer-motion";

const getIcon = (name: string) => {
  // @ts-ignore
  return LucideIcons[name] || LucideIcons.Globe;
};

const getGradients = (index: number) => {
  const gradients = [
    "from-red-500 to-orange-600",
    "from-blue-500 to-cyan-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-green-600",
  ];
  return gradients[index % gradients.length];
};

// Data Dummy Tech Stack
const defaultTechStack = ["Next.js", "Laravel", "React", "Tailwind"];

export default function ServicesList({ services }: { services: any[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      
      {/* HERO SECTION */}
      <section className="relative py-32 overflow-hidden pt-32 md:pt-40">
         <div className="absolute inset-0">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
           <div className="absolute inset-0 opacity-20" style={{
             backgroundImage: `linear-gradient(rgba(255, 68, 68, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 68, 68, 0.05) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} />
         </div>
         
         <div className="container relative z-10 px-4 mx-auto">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-white mb-8">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span>Layanan Kami</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                  Solusi Teknologi{" "}
                  <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                    Terlengkap
                  </span>
                </h1>
                
                <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                  Kami menawarkan berbagai layanan pengembangan perangkat lunak dan perangkat keras 
                  yang disesuaikan dengan kebutuhan spesifik bisnis Anda.
                </p>
              </motion.div>
            </div>
         </div>
      </section>

      {/* SERVICES LIST */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-6xl mx-auto space-y-12">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            const colorGradient = getGradients(index);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 shadow-2xl">
                    <div className="grid lg:grid-cols-5">
                      
                      {/* LEFT SIDE */}
                      <div className="lg:col-span-2 p-8 lg:p-10 relative overflow-hidden flex flex-col">
                        <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-10`} />
                        
                        <div className="relative z-10 h-full flex flex-col">
                          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${colorGradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-12 h-12 text-white" />
                          </div>
                          
                          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{service.title}</h3>
                          
                          <p className="text-gray-300 text-base leading-relaxed mb-8 line-clamp-4">
                            {service.description}
                          </p>

                          {/* DUA TOMBOL UTAMA */}
                          <div className="mt-auto flex flex-col gap-3">
                            
                            {/* 1. Tombol Detail (SUDAH DIAKTIFKAN KEMBALI) */}
                            <Button 
                              asChild 
                              variant="outline"
                              size="lg" 
                              className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent group/detail"
                            >
                              <Link href={`/services/${service.slug}`} className="flex items-center justify-center gap-2">
                                <BookOpen className="w-4 h-4" /> Pelajari Selengkapnya
                              </Link>
                            </Button>

                            {/* 2. Tombol Kontak */}
                            <Button 
                              asChild 
                              size="lg" 
                              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold group/btn"
                            >
                              <Link href={`/contact?service=${service.slug}`} className="flex items-center justify-center gap-2">
                                Pesan Layanan
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </Button>

                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="lg:col-span-3 p-8 lg:p-10 bg-black/20 border-t lg:border-t-0 lg:border-l border-white/10">
                        
                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                          {(service.features as string[])?.map((feature: string, idx: number) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                            >
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-sm font-medium leading-relaxed">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-8">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Code2 className="w-4 h-4" /> Teknologi yang Digunakan
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {defaultTechStack.map((tech) => (
                              <Badge 
                                key={tech} 
                                className="bg-white/10 text-gray-300 hover:bg-white/20 border border-white/5 px-3 py-1 font-medium"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Accordion */}
                        <Accordion type="single" collapsible className="w-full border-t border-white/10 pt-6">
                          <AccordionItem value="item-1" className="border-0">
                            <AccordionTrigger className="text-gray-300 hover:text-primary hover:no-underline py-3">
                              <span className="flex items-center gap-2 text-base font-semibold">
                                <Layers className="w-5 h-5" /> Detail Proses & Pengerjaan
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400 leading-relaxed pt-4 pb-0">
                              {service.content || "Kami menggunakan pendekatan modern untuk memastikan hasil terbaik. Kode yang kami tulis bersih, modular, dan mudah dikembangkan di masa depan."}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-4 py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Punya Kebutuhan Khusus?</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
              Kami juga melayani custom development sesuai permintaan spesifik perusahaan Anda. 
              Konsultasikan ide Anda sekarang.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Hubungi Tim Ahli Kami
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}