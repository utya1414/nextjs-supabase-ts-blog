import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import BlogItem from "./blog-item";

const BlogList = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: blogsData } = await supabase
    .from("blogs")
    .select()
    .order("created_at", { ascending: false });

  if (!blogsData) {
    return <div>ブログをアップロードしてください</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {await Promise.all(
          blogsData.map(async (blogData) => {
            const { data: userData } = await supabase
              .from("users")
              .select()
              .eq("id", blogData.user_id)
              .single();

            const blog = {
              id: blogData.id,
              created_at: blogData.created_at,
              title: blogData.title,
              content: blogData.content,
              user_id: blogData.user_id,
              image_url: blogData.image_url,
              name: userData?.name,
            };

            return <BlogItem key={blog.id} {...blog} />;
          })
        )}
      </div>
    </>
  );
};

export default BlogList;
