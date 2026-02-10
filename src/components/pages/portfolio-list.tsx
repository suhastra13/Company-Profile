"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List as ListIcon, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Tipe Data sesuai Database
interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  images: string[];    // Array URL gambar
  techStack: string[];
  client?: string;
  year?: string;
}

export default function PortfolioList({ portfolios }: { portfolios: PortfolioItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 1. Ambil Kategori Unik dari Data Real
  const categories = ["All", ...Array.from(new Set(portfolios.map((p) => p.category)))];

  // 2. Logic Filter & Search
  const filteredProjects = portfolios.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-32 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="container mx-auto px-4 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/50 bg-primary/10">
            <Sparkles className="w-3 h-3 mr-2" /> Our Masterpiece
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hasil Karya & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Inovasi Kami</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Jelajahi berbagai proyek yang telah kami kerjakan, mulai dari Website Korporat hingga Sistem IoT Cerdas.
          </p>
        </motion.div>
      </section>

      {/* 2. CONTROLS (SEARCH & FILTER) */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              placeholder="Cari project..." 
              className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-black/20 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS GRID / LIST */}
      <section className="container mx-auto px-4">
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                    <div className={`h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}>
                      
                      {/* Image Thumbnail */}
                      <div className={`relative overflow-hidden bg-gray-800 ${viewMode === 'list' ? 'w-full md:w-2/5 h-64 md:h-auto' : 'w-full h-64'}`}>
                        <Image
                          src={project.images[0] || "https://placehold.co/600x400?text=No+Image"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="flex items-center gap-2 text-white font-semibold border border-white px-4 py-2 rounded-full backdrop-blur-sm">
                            Lihat Detail <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-6 flex flex-col ${viewMode === 'list' ? 'w-full md:w-3/5 justify-center' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-primary text-sm font-semibold tracking-wider uppercase">{project.category}</span>
                            <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-primary transition-colors line-clamp-2">{project.title}</h3>
                          </div>
                          {project.year && (
                             <span className="text-gray-500 text-sm font-mono border border-white/10 px-2 py-1 rounded bg-black/20">{project.year}</span>
                          )}
                        </div>
                        
                        <p className="text-gray-400 mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="mt-auto flex flex-wrap gap-2">
                          {project.techStack.slice(0, 4).map((t, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-white/10 text-gray-300 hover:bg-white/20">
                              {t}
                            </Badge>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="text-xs text-gray-500 py-1 px-2">+{project.techStack.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">Project tidak ditemukan.</p>
                <Button variant="link" onClick={() => {setSearchQuery(""); setActiveCategory("All")}} className="text-primary">
                  Reset Filter
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

    </div>
  );
}