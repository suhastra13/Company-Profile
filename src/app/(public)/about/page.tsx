import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AboutContent from "@/components/pages/about-content"; 

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Pelajari visi, misi, dan tim hebat di balik Wokil Tech.",
};

export default async function AboutPage() {
  // 1. Ambil Company Info (untuk History & About Image)
  const companyInfo = await prisma.companyInfo.findFirst();

  // 2. Ambil Data Tim
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  // 3. Ambil Data Blog Posts
  const latestPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      category: true,
      createdAt: true,
      author: {
        select: { name: true }
      }
    }
  });

  return (
    <AboutContent 
      teamMembers={teamMembers} 
      posts={latestPosts} 
      companyInfo={companyInfo} 
    />
  );
}