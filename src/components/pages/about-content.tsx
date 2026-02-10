"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, User, ArrowRight, Target, Heart, Zap, Linkedin, Github, Instagram, Globe, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

// --- Props Interfaces ---
interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo: string | null;
  socials: any; 
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  createdAt: Date;
  author: {
    name: string | null;
  };
}

// Tambahkan Interface untuk Company Info
interface CompanyInfo {
  history: string | null;
  aboutImage: string | null;
  // Field lain jika diperlukan
}

export default function AboutContent({ 
  teamMembers, 
  posts,
  companyInfo // Terima props baru
}: { 
  teamMembers: TeamMember[], 
  posts: BlogPost[],
  companyInfo: CompanyInfo | null
}) {

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  // --- LOGIC DATA DINAMIS ---
  // Jika database kosong, pakai data default (fallback)
  const story = companyInfo?.history || "Sejarah perusahaan belum diisi di Admin Panel.";
  const storyImage = companyInfo?.aboutImage || "https://placehold.co/800x600/1a1a1a/FFF?text=Foto+Kantor+Belum+Diisi";
  // --------------------------

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-32 pb-20">
      
      {/* 1. HERO */}
      <section className="container mx-auto px-4 mb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/50 bg-primary/10 px-4 py-1">
            Tentang Kami
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Membangun Masa Depan Lewat <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Kode & Inovasi</span>
          </h1>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
              <Target className="w-10 h-10 text-red-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Visi Kami</h3>
              <p className="text-gray-400 text-sm">Menjadi mitra teknologi nomor satu di Indonesia.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
              <Zap className="w-10 h-10 text-yellow-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Misi Kami</h3>
              <p className="text-gray-400 text-sm">Menyediakan solusi software berkualitas tinggi dan cepat.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors">
              <Heart className="w-10 h-10 text-pink-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Nilai Kami</h3>
              <p className="text-gray-400 text-sm">Integritas, Inovasi, dan Kepuasan Klien adalah prioritas.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. COMPANY STORY (DYNAMIC) */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden group border border-white/10"
          >
            {/* Menggunakan <img> biasa untuk menghindari error optimasi next/image pada URL eksternal yg belum di-whitelist */}
            <img 
              src={storyImage} 
              alt="Our Office" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-60" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Perjalanan Wokil Tech</h2>
            
            {/* Menampilkan text history dengan whitespace-pre-line agar Enter/Paragraf terbaca */}
            <div className="space-y-4 text-gray-400 leading-relaxed text-lg whitespace-pre-line">
              {story}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. MEET THE TEAM */}
      <section className="container mx-auto px-4 mb-24 text-center">
        <h2 className="text-3xl font-bold mb-12">Otak di Balik Layar</h2>
        {teamMembers.length === 0 ? (
          <p className="text-gray-500">Belum ada anggota tim yang ditampilkan.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => {
              const socials = member.socials || {};
              return (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors bg-gray-900">
                    <Image 
                      src={member.photo || `https://ui-avatars.com/api/?name=${member.name}&background=random`} 
                      alt={member.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.position}</p>
                  
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {socials.linkedin && (
                      <Link href={socials.linkedin} target="_blank" className="text-gray-400 hover:text-blue-500"><Linkedin className="w-4 h-4" /></Link>
                    )}
                    {socials.github && (
                      <Link href={socials.github} target="_blank" className="text-gray-400 hover:text-white"><Github className="w-4 h-4" /></Link>
                    )}
                    {socials.instagram && (
                      <Link href={socials.instagram} target="_blank" className="text-gray-400 hover:text-pink-500"><Instagram className="w-4 h-4" /></Link>
                    )}
                    {socials.website && (
                      <Link href={socials.website} target="_blank" className="text-gray-400 hover:text-green-500"><Globe className="w-4 h-4" /></Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. COMPANY BLOG */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <Badge variant="outline" className="mb-2 text-secondary border-secondary/50 bg-secondary/10">Blog & Berita</Badge>
            <h2 className="text-3xl font-bold">Kabar Terbaru</h2>
          </div>
         
        </div>

        {posts.length === 0 ? (
           <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5">
              <p className="text-gray-400">Belum ada artikel yang diterbitkan.</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden hover:border-primary/50 transition-all group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    {post.coverImage ? (
                      <Image 
                        src={post.coverImage} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-700">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 backdrop-blur-md text-white hover:bg-black/70">{post.category}</Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {post.author.name || "Admin"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/post/${post.slug}`}>{post.title}</Link>
                    </h3>
                  </CardHeader>

                  <CardContent className="pb-4 flex-grow">
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt || "Tidak ada ringkasan tersedia."}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-0 border-t border-white/5 mt-auto p-6">
                    <Link href={`/post/${post.slug}`} className="text-sm font-semibold text-primary hover:text-white transition-colors flex items-center gap-2">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 text-center mt-12 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-4">Ingin Menjadi Bagian dari Cerita Kami?</h2>
        <p className="text-gray-400 mb-8">Kami selalu mencari talenta berbakat.</p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-primary text-white hover:bg-red-700">
            <Link href="/contact">Hubungi Kami</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}