import EditBlog from "@/app/components/blog/blog-edit";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
type PageProps = {
  blogId: string;
};
const PageToEditBlog = async ({
  params,
}: {
  params: PageProps;
}) => {
  const supabase = await createServerComponentClient<Database>({ cookies });

  const { data: blog } = await supabase
    .from("blogs")
    .select()
    .eq("id", params.blogId)
    .single();

  if (!blog) {
    return notFound();
  }
  return (
    <div>
      <EditBlog blog={blog} />
    </div>
  );
};

export default PageToEditBlog;
