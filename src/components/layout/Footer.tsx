"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, ArrowRight, ArrowUp,
  Linkedin, Github, Instagram, Twitter
} from "lucide-react";

// Definisikan Tipe Data Props
interface FooterProps {
  companyInfo?: {
    name: string;
    description: string;
    address: string;
    email: string;
    phone: string;
    socials: any;
  } | null;
}

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function FooterMinimal({ companyInfo }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Default values jika data belum diisi di Admin
  const name = companyInfo?.name || "Wokil Tech";
  const desc = companyInfo?.description || "We build digital solutions that drive growth and innovation.";
  const address = companyInfo?.address || "Jakarta Selatan, Indonesia";
  const email = companyInfo?.email || "hello@wokiltech.com";
  const phone = companyInfo?.phone || "+62 812-3456-7890";
  const socials = companyInfo?.socials || {};

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Logo + Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/images/Wokil_Tech.png"
                  alt="Wokil Tech Logo"
                  fill
                  className="object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <div>
                <div className="text-2xl font-bold">
                   {/* Logic sederhana untuk memisah nama jadi 2 warna */}
                   <span className="text-primary">{name.split(" ")[0]}</span>
                   <span className="text-secondary">{name.split(" ").slice(1).join(" ")}</span>
                </div>
                <div className="text-xs text-gray-400">Technology Solutions</div>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              {desc}
            </p>

            {/* Social Media (Dynamic) */}
            <div className="flex gap-3">
              {socials.linkedin && (
                <SocialButton href={socials.linkedin} icon={Linkedin} color="hover:bg-blue-600" />
              )}
              {socials.github && (
                <SocialButton href={socials.github} icon={Github} color="hover:bg-gray-700" />
              )}
              {socials.instagram && (
                <SocialButton href={socials.instagram} icon={Instagram} color="hover:bg-pink-600" />
              )}
              {socials.twitter && (
                <SocialButton href={socials.twitter} icon={Twitter} color="hover:bg-sky-500" />
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-gray-400 whitespace-pre-line">
                  {address}
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="text-gray-400 hover:text-primary transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href={`tel:${phone}`} className="text-gray-400 hover:text-primary transition-colors">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} <span className="text-primary font-semibold">{name}</span>. 
            All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-colors"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}

// Helper Component untuk Social Button
function SocialButton({ href, icon: Icon, color }: { href: string, icon: any, color: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`w-10 h-10 rounded-lg bg-gray-800 hover:bg-opacity-90 flex items-center justify-center transition-all ${color}`}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}