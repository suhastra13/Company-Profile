// src/lib/data.ts
import { Service, Portfolio, TeamMember, Testimonial } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    title: "Web Development",
    slug: "web-development",
    description: "Website responsif dan performa tinggi dengan teknologi modern (Next.js/Laravel).",
    icon: "Globe",
    features: ["Company Profile", "E-Commerce", "Web App", "SEO Friendly"],
  },
  {
    id: "2",
    title: "Mobile Apps",
    slug: "mobile-apps",
    description: "Aplikasi Android & iOS native atau hybrid yang user-friendly.",
    icon: "Smartphone",
    features: ["Flutter / React Native", "UI/UX Design", "Play Store & App Store", "Maintenance"],
  },
  {
    id: "3",
    title: "IoT Solutions",
    slug: "iot-solutions",
    description: "Sistem Internet of Things untuk automasi industri dan smart home.",
    icon: "Cpu",
    features: ["Smart Home", "Monitoring System", "Microcontrollers", "Dashboard Realtime"],
  },
];

export const portfolios: Portfolio[] = [
  {
    id: "1",
    title: "Sistem Monitoring Hidroponik",
    slug: "smart-hydroponic",
    category: "IoT",
    image: "/images/portfolio-iot.jpg", // Nanti kita siapin gambarnya
    client: "Tani Maju Jaya",
    description: "Sistem monitoring kadar pH dan nutrisi air otomatis berbasis IoT.",
    techStack: ["ESP32", "Laravel", "MQTT", "React"],
    year: "2025",
  },
  {
    id: "2",
    title: "E-Commerce Fashion",
    slug: "fashion-store",
    category: "Web Dev",
    image: "/images/portfolio-web.jpg",
    client: "Batik Modern",
    description: "Toko online lengkap dengan payment gateway dan manajemen stok.",
    techStack: ["Next.js", "Prisma", "Midtrans"],
    year: "2024",
  },
];

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Developer Wokil",
    position: "Lead Engineer",
    bio: "Fullstack developer spesialis Laravel & Next.js.",
    image: "/images/team-1.jpg",
    social: { linkedin: "#", github: "#" },
  },
];