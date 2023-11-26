import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { BlogListType } from "@/lib/blog.types";
import BlogDetail from "@/app/components/blog/blog-detail";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    blogId: string;
  };
};
const PageToBlogDetail = async ({ params }: PageProps) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: blogData } = await supabase
    .from("blogs")
    .select()
    .eq("id", params.blogId)
    .single();
    
  if (!blogData) {
    return notFound();
  }

  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("id", blogData.user_id)
    .single();
  if (!userData) {
    return notFound();
  }
  const blog: BlogListType = {
    id: blogData.id,
    created_at: blogData.created_at,
    title: blogData.title,
    content: blogData.content,
    timelimit: blogData.timelimit,
    memorylimit: blogData.memorylimit,
    input: blogData.input,
    output: blogData.output,
    user_id: blogData.user_id,
    name: userData.name,
  };
  return <BlogDetail {...blog} />;
};

export default PageToBlogDetail;
