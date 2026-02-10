import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/post-form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return notFound();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Edit Artikel</h1>
      <PostForm initialData={post} />
    </div>
  );
}