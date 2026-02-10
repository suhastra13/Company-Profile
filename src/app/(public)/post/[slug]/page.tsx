import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Tipe Props untuk Halaman Dinamis (Next.js 15)
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. GENERATE METADATA (Untuk SEO Judul Tab Browser)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, excerpt: true }
  });

  if (!post) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: `${post.title} | Blog Wokil Tech`,
    description: post.excerpt || `Baca artikel lengkap tentang ${post.title}`,
  };
}

// 2. HALAMAN UTAMA
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Ambil data postingan dari database
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, image: true }
      }
    }
  });

  // Jika tidak ketemu, lempar ke halaman 404
  if (!post) {
    notFound();
  }

  // Format Tanggal
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-32 pb-20">
      
      {/* Tombol Kembali */}
      <div className="container mx-auto px-4 mb-8">
        <Button asChild variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 -ml-4">
          <Link href="/about">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </Link>
        </Button>
      </div>

      <article className="container mx-auto px-4 max-w-4xl">
        
        {/* HEADER: Kategori, Judul, Meta */}
        <header className="mb-10 text-center space-y-6">
          <Badge className="bg-primary/20 text-primary border-primary/20 px-4 py-1.5 text-sm">
            {post.category}
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author.name || "Admin"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </header>

        {/* COVER IMAGE */}
        {post.coverImage && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            {/* Pakai <img> biasa agar aman dari error optimize */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* CONTENT BODY */}
        <div className="prose prose-invert prose-lg max-w-none">
          {/* whitespace-pre-wrap berguna agar Enter/Paragraf dari Textarea admin terbaca */}
          <div className="whitespace-pre-wrap leading-loose text-gray-300">
            {post.content}
          </div>
        </div>

      </article>

      {/* FOOTER CTA */}
      <div className="container mx-auto px-4 max-w-4xl mt-20 pt-10 border-t border-white/10 text-center">
        <p className="text-gray-400 mb-6">Suka dengan artikel ini? Jangan ragu untuk berdiskusi dengan kami.</p>
        <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white">
          <Link href="/contact">Hubungi Wokil Tech</Link>
        </Button>
      </div>

    </div>
  );
}