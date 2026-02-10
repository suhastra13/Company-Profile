"use client";

import Link from "next/link";
import Images from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(255, 68, 68, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 68, 68, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* CONTENT */}
      <div className="container relative z-10 px-4 py-40">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-white mb-8"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Transformasi Digital Dimulai di Sini</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Bangun Masa Depan Digital{" "}
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              bersama Wokil Tech
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
          >
            Kami membantu bisnis Anda berkembang dengan solusi Website, Aplikasi Mobile, 
            dan AI yang inovatif, aman, dan terukur.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              asChild 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold px-8 shadow-2xl shadow-primary/30 transition-all hover:scale-105"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Konsultasi Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-semibold px-8 transition-all hover:scale-105"
            >
              <Link href="/portfolio">
                Lihat Portfolio
              </Link>
            </Button>
          </motion.div>

          {/* Stats or Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Code2, label: "30+ Projects", value: "Completed" },
              { icon: Zap, label: "20+ Clients", value: "Happy" },
              { icon: Sparkles, label: "3+ Years", value: "Experience" },
              { icon: ArrowRight, label: "99%", value: "Success Rate" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6 text-primary mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.value}</div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}