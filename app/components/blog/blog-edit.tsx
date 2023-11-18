"use client";
import { BlogListType } from "@/lib/blog.types";
import Loading from "@/app/loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useStore from "@/store/index";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { Database } from "@/lib/database.types";
import ReturnTopPage from "./return-top-page";
import PreviewBlog from "./preview-md";

type BlogType = Database["public"]["Tables"]["blogs"]["Row"];

type PageProps = {
  blog: BlogType;
};
const EditBlog = ({ blog }: PageProps) => {
  const { user } = useStore();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File>(null!);
  const [isMyBlog, setIsMyBlog] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.id !== blog.user_id) {
      router.push(`/blog/${blog.id}`);
    } else {
      setTitle(blog.title);
      setContent(blog.content);
      setIsMyBlog(true);
    }
  }, []);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files?.length === 0) {
        return;
      }
      setImage(files[0]);
    },
    []
  );

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        let image_url = blog.image_url;

        if (image) {
          const { data: storageData, error: storageError } =
            await supabase.storage
              .from("blogs")
              .upload(`${user.id}/${uuidv4()}`, image);
          if (storageError) {
            setMessage("エラーが発生しました" + storageError);
            setLoading(false);
            return;
          }
          const fileName = image_url.split("/").slice(-1)[0];
          await supabase.storage
            .from("blogs")
            .remove([`${user?.id}/${fileName}`]);

          const { data: urlData } = await supabase.storage
            .from("blogs")
            .getPublicUrl(storageData.path);
          image_url = urlData.publicUrl;
        }
        const { error: UpdateError } = await supabase
          .from("blogs")
          .update({
            title,
            content,
            image_url,
          })
          .eq("id", blog.id);

        if (UpdateError) {
          setMessage("エラーが発生しました" + UpdateError.message);
          return;
        }
        router.push(`/blog/${blog.id}`);
        router.refresh();
      }
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const renderBlog = () => {
    if (isMyBlog) {
      return (
        <div className="flex">
          <form
            onSubmit={onSubmit}
            className="flex flex-col w-1/2 min-h-screen items-center"
          >
            <input
              id="title"
              type="text"
              placeholder="タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-gradient w-full border border-gray-300 rounded-md py-2 px-1"
            ></input>
            <input
              id="image"
              type="file"
              className="w-full border border-gray-200 rounded-md file:border-none file:hover:bg-gray-300 file:cursor-pointer"
              onChange={onUploadImage}
            ></input>
            <textarea
              id="content"
              placeholder="本文"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 w-full bg-gray-gradient border border-gray-200 rounded py-2 px-1"
            />
            {message && <div className="text-red-500 text-sm">{message}</div>}

            <div className="flex ">
              {loading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="bg-black-gradient text-white font-bold py-2 px-2 rounded-md hover:bg-sky-600 mr-2"
                >
                  編集
                </button>
              )}
              <ReturnTopPage />
            </div>
          </form>
          <PreviewBlog title={title} info={content} />
        </div>
      );
    }
  };
  return <>{renderBlog()}</>;
};

export default EditBlog;
