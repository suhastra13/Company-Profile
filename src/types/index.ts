// src/types/index.ts

// Definisi Service (Layanan)
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string; // Nama icon dari Lucide React
  features: string[]; // Array of strings (JSON di database nanti)
}

// Definisi Portfolio (Project)
export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  category: "Web Dev" | "Mobile Apps" | "IoT" | "AI";
  image: string;
  client: string;
  description: string;
  techStack: string[];
  year: string;
}

// Definisi Team Member
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

// Definisi Testimonial
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}