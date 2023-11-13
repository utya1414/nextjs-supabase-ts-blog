"use client";
import ReturnTopPage from "./return-top-page";
import type { BlogListType } from "@/lib/blog.types";
import { format } from "date-fns";
import Loading from "@/app/loading";
import useStore from "@/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import Link from "next/link";

const BlogDetail = (blog: BlogListType) => {
  const date = format(new Date(blog.created_at), "yyyy/MM/dd");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useStore();
  const supabase = createClientComponentClient<Database>();
  const [isMyBlog, setIsMyBlog] = useState(false);

  const DeleteBlog = async () => {
    setLoading(true);
    const { error } = await supabase.from("blogs").delete().eq("id", blog.id);

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const fileName = blog.image_url.split("/").slice(-1)[0];
    await supabase.storage.from("blogs").remove([`${user?.id}/${fileName}`]);

    router.push("/");
    router.refresh();

    setLoading(false);
  };
  const renderButton = () => {
    if (isMyBlog) {
      return (
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Link
                href={`/blog/${blog.id}/edit`}
                className="w-12 bg-sky-500 text-white font-bold text-sm flex text-center items-center py-2 px-2 rounded-md cursor-pointer shadow-md hover:bg-sky-600"
              >
                編集
              </Link>
              <button
                className="w-12 bg-sky-500 text-white font-bold text-sm flex text-center items-center py-2 px-2 rounded-md cursor-pointer shadow-md hover:bg-sky-600"
                onClick={DeleteBlog}
              >
                削除
              </button>
            </>
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    if (user?.id === blog.user_id) {
      setIsMyBlog(true);
    }
  }, [user]);

  return (
    <div>
      <div>{date}</div>
      <div>{blog.title}</div>
      <div>{blog.name}</div>

      <div>{blog.content}</div>
      {renderButton()}
      <ReturnTopPage />
    </div>
  );
};

export default BlogDetail;
