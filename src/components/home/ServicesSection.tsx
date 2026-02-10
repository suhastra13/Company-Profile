"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Bangun website responsif, cepat, dan SEO-friendly menggunakan teknologi modern (Next.js / Laravel).",
    icon: Globe,
    features: ["Next.js & React", "Laravel & PHP", "SEO Optimized"],
    color: "from-red-500 to-orange-500",
    link: "/services/web-development"
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "Aplikasi Android & iOS native atau hybrid yang user-friendly dan performa tinggi.",
    icon: Smartphone,
    features: ["React Native", "Flutter", "Native Development"],
    color: "from-blue-500 to-cyan-500",
    link: "/services/mobile-apps"
  },
  {
    id: 3,
    title: "IoT Solutions",
    description: "Sistem Internet of Things cerdas untuk automasi industri, smart home, dan monitoring real-time.",
    icon: Cpu,
    features: ["Smart Automation", "Real-time Monitor", "Cloud Integration"],
    color: "from-purple-500 to-pink-500",
    link: "/services/iot-solutions"
  }
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-transparent">
      
      {/* Background Effect - Opsional: Bisa dihapus jika ingin polos menyatu dengan Hero, 
          tapi dibiarkan juga bagus asalkan warnanya sama */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(255, 68, 68, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 68, 68, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-white mb-4">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Layanan Kami</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Solusi Teknologi untuk
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Bisnis Modern
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Kami menyediakan layanan pengembangan teknologi end-to-end yang disesuaikan dengan kebutuhan bisnis Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button 
            asChild 
            size="lg"
            className="group bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold px-8 shadow-2xl shadow-primary/30 transition-all hover:scale-105"
          >
            <Link href="/services" className="flex items-center gap-2">
              Lihat Semua Layanan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={service.link}>
        <motion.div
          whileHover={{ y: -8 }}
          className="group relative h-full"
        >
          {/* UBAH: Card style disesuaikan agar menyatu dengan dark mode */}
          <div className="relative h-full p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/50 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

            <div className="relative mb-6">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="relative">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-primary font-semibold group/link">
                <span className="group-hover/link:underline">Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}