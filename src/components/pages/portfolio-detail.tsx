"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Code, CheckCircle2, Globe, Github } from "lucide-react";
import { motion } from "framer-motion";

// Helper untuk memastikan format data gambar
const getGallery = (images: any) => {
  if (Array.isArray(images) && images.length > 0) return images;
  return ["https://placehold.co/1200x800?text=No+Gallery"]; // Fallback
};

export default function PortfolioDetail({ project }: { project: any }) {
  const gallery = getGallery(project.images);
  const heroImage = gallery[0];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* 1. HERO IMAGE (FULL WIDTH) */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 container mx-auto">
          <Link href="/portfolio" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Portfolio
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-primary text-white mb-4 hover:bg-primary">{project.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl line-clamp-3">{project.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 grid lg:grid-cols-3 gap-12">
        
        {/* 2. MAIN CONTENT (LEFT) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-l-4 border-red-500 pl-4">The Challenge</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {project.challenge || "Tantangan utama dalam proyek ini adalah menciptakan solusi yang efisien, skalabel, dan mudah digunakan oleh pengguna akhir tanpa mengorbankan performa."}
            </p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-l-4 border-yellow-500 pl-4">Our Solution</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {project.solution || "Kami merancang arsitektur sistem modern menggunakan teknologi terbaru, mengoptimalkan antarmuka pengguna, dan memastikan keamanan data terjamin."}
            </p>
          </section>

          {/* Result */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white border-l-4 border-green-500 pl-4">The Result</h2>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 leading-relaxed text-lg flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                {project.result || "Sistem berhasil diimplementasikan dengan peningkatan efisiensi kerja yang signifikan dan kepuasan pengguna yang tinggi."}
              </p>
            </div>
          </section>

          {/* Gallery Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {gallery.map((img: string, idx: number) => (
                 <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group border border-white/10">
                   <div 
                     className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                     style={{ backgroundImage: `url(${img})` }}
                   />
                 </div>
               ))}
            </div>
          </section>

        </div>

        {/* 3. SIDEBAR INFO (RIGHT) */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sticky top-32 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6">Project Info</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium">{project.client || "Confidential"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium">{project.year || new Date(project.createdAt).getFullYear()}</p>
                </div>
              </div>

              <div className="border-t border-white/10 my-6" />

              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(project.techStack || []).map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="bg-white/10 hover:bg-white/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                 {/* Tombol Dummy karena di DB belum ada link, bisa ditambah nanti */}
                 <Button className="w-full bg-primary hover:bg-primary/90 cursor-not-allowed opacity-80">
                    <Globe className="w-4 h-4 mr-2" /> Visit Website
                 </Button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}