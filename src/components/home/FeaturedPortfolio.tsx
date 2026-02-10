"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ExternalLink, ImageIcon } from "lucide-react";

// --- Props Interface ---
interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string | null;
  description: string;
  technologies: string | null;
}

export default function FeaturedPortfolio({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20 bg-transparent text-white">
      <div className="container mx-auto px-4">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-primary text-primary bg-primary/10">Portfolio</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Karya Terbaru Kami
            </h2>
            <p className="text-lg text-gray-400">
              Lihat bagaimana kami membantu bisnis berkembang melalui solusi teknologi yang tepat guna.
            </p>
          </div>
          
          <Button asChild variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-white group bg-transparent">
            <Link href="/portfolio">
              Lihat Semua Karya <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* GRID PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
             <div className="col-span-full text-center py-10 text-gray-500 border border-dashed border-white/10 rounded-xl">
                Belum ada portfolio unggulan untuk ditampilkan.
             </div>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="group overflow-hidden border border-white/10 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-white/5 backdrop-blur-sm text-white flex flex-col h-full">
                
                <div className="relative h-60 w-full overflow-hidden bg-gray-900">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-700">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button asChild variant="secondary" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-black hover:bg-gray-200">
                      <Link href={`/portfolio/${project.slug}`}>
                        Lihat Detail <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <div className="text-sm font-medium text-primary mb-2">{project.category}</div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {project.description}
                  </p>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-2 pt-4 mt-auto border-t border-white/5 p-6">
                  {project.technologies?.split(',').map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/10 text-gray-300 hover:bg-white/20">
                      {tech.trim()}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button asChild variant="outline" className="w-full border-primary text-primary bg-transparent">
            <Link href="/portfolio">
              Lihat Semua Karya
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}