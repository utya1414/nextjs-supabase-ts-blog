"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useState } from "react";
import ReturnTopPage from "./return-top-page";
import Loading from "@/app/loading";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import PreviewBlog from "./preview-md";

type Schema = z.infer<typeof schema>;
const schema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  content: z.string().min(1, { message: "本文を入力してください" }),
});

const NewBlogPage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const [image, setImage] = useState<File>(null!);
  const { user } = useStore();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(schema),
  });

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files?.length === 0) {
      return;
    }
    setImage(files[0]);
  }, []);

  const onSubmit : SubmitHandler<Schema> = async (data: Schema) => {
    setLoading(true);
    try {
      if (user?.id) {
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("blogs")
            .upload(`${user.id}/${uuidv4()}`, image);

        if (storageError) {
          setMessage("エラーが発生しました" + storageError);
          return;
        }
        const { data: urlData } = await supabase.storage
          .from("blogs")
          .getPublicUrl(storageData.path);

        const { error: insertError } = await supabase.from("blogs").insert({
          title: data.title,
          content: data.content,
          image_url: urlData.publicUrl,
          user_id: user.id,
        });

        if (insertError) {
          setMessage("エラーが発生しました" + insertError);
          return;
        }

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }
  return (
    <div className="flex">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-h-screen items-center"
    >
      <input
        id="title"
        type="text"
        placeholder="タイトル"
        className="border border-gray-300 rounded-md w-4/5 my-2 py-2 px-1"
        {...register("title", { required: true })}
        onChange={onTitleChange}
      ></input>
      <input
        id="image"
        type="file"
        className="my-1 border border-gray-200 rounded-md file:border-none file:hover:bg-gray-300 file:cursor-pointer"
        onChange={onUploadImage}
      ></input>
      <textarea
        id="content"
        placeholder="本文"
        className="flex-1 w-4/5 border border-gray-200 rounded py-2 px-1 my-2"
        {...register("content", { required: true })}
        onChange={onContentChange}
      />
      {message && <div className="text-red-500 text-sm">{message}</div>}

      <div className="flex ">
        {loading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className="bg-sky-500 text-white font-bold py-2 px-2 rounded-md hover:bg-sky-600 mr-2"
          >
            投稿
          </button>
        )}
        <ReturnTopPage />
      </div>
    </form>
    <PreviewBlog title={title} info={content} />
    </div>
  );
};

export default NewBlogPage;
