"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// --- Props Interface ---
interface StatsSectionProps {
  totalProjects: number;
  totalClients: number;
  totalTeam: number;
  yearsExperience: number;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  
  // PERBAIKAN 1: margin diubah jadi "-10px" atau "0px" agar di HP langsung muncul saat discroll sedikit saja
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
    });
  }, [springValue, suffix]);

  // PERBAIKAN 2: Tambahkan 'inline-block' agar gradient text bekerja sempurna di mobile
  return (
    <span 
      ref={ref} 
      className="inline-block text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary min-h-[1.2em]"
    >
        {/* Fallback agar tidak collapse tingginya saat loading */}
        &nbsp;
    </span>
  );
}

export default function StatsSection({ 
  totalProjects, 
  totalClients, 
  totalTeam, 
  yearsExperience 
}: StatsSectionProps) {

  const stats = [
    { 
      id: 1, 
      label: "Proyek Selesai", 
      value: totalProjects || 50, // Fallback angka jika db 0/loading
      suffix: "+", 
      description: "Website & Aplikasi Mobile" 
    },
    { 
      id: 2, 
      label: "Klien Puas", 
      value: totalClients || 30, 
      suffix: "+", 
      description: "UMKM hingga Perusahaan" 
    },
    { 
      id: 3, 
      label: "Tahun Pengalaman", 
      value: yearsExperience || 5, 
      suffix: " Th", 
      description: "Dedikasi di dunia IT" 
    },
    { 
      id: 4, 
      label: "Anggota Tim", 
      value: totalTeam || 12, 
      suffix: "", 
      description: "Expert Developer & Designer" 
    },
  ];

  return (
   <section className="py-20 bg-transparent text-white relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center space-y-2 p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="mb-2 w-full flex justify-center">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-lg font-bold text-white">{stat.label}</h3>
              <p className="text-sm text-neutral-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}