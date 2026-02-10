import PostForm from "@/components/admin/post-form";

export default function CreatePostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Buat Artikel Baru</h1>
      <PostForm />
    </div>
  );
}