"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import ReturnTopPage from "./return-top-page";
import Loading from "@/app/loading";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import PreviewBlog from "./preview-md";
type FormProps = {
  title: string;
  content: string;
  timelimit: string;
  memorylimit: string;
  input: string;
  output: string;
}
const NewBlogPage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const { user } = useStore();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [timelimit, setTimelimit] = useState("");
  const [memorylimit, setMemorylimit] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const blogInfo = {
    title: title,
    content: content,
    timelimit: timelimit,
    memorylimit: memorylimit,
    input: input,
    output: output,
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      timelimit: "",
      memorylimit: "256",
      input: "",
      output: "",
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data: FormProps) => {
    setLoading(true);
    try {
      if (user?.id) {
        const { error: insertError } = await supabase.from("blogs").insert({
          title: data.title,
          content: data.content,
          user_id: user.id,
          timelimit: data.timelimit,
          memorylimit: data.memorylimit,
          input: data.input,
          output: data.output,
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
  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex flex-col items-center min-h-screen"
      >
        <div className="flex items-center ">
          <div>TITLE:</div>
          <input
            id="title"
            type="text"
            placeholder="タイトル"
            className="border bg-primary rounded-md px-1 w-1/2"
            {...register("title", { required: true })}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="">Problem Content:</div>
        <textarea
          id="content"
          placeholder="本文"
          className="flex-1 w-full border bg-primary rounded py-2 px-1"
          {...register("content", { required: true })}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center">
          <div>Time limit:</div>
          <input
            id="timelimit"
            type="text"
            placeholder="実行時間制限"
            className="border bg-primary rounded-md px-1 w-1/2"
            {...register("timelimit", { required: true })}
            onChange={(e) => setTimelimit(e.target.value)}
          ></input>
        </div>
        <div className="flex items-center">
          <div>Memory limit:</div>
          <input
            id="memorylimit"
            type="text"
            placeholder="メモリ制限"
            className="border bg-primary rounded-md px-1 w-1/2"
            {...register("memorylimit", { required: true })}
            onChange={(e) => setMemorylimit(e.target.value)}
          ></input>
        </div>
        <table>
          <thead>
            <tr>
              <th>入力例</th>
              <th>出力例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <textarea
                  id="input"
                  placeholder="入力例"
                  className="flex-1 w-full border bg-primary rounded py-2 px-1"
                  {...register("input", { required: true })}
                  onChange={(e) => setInput(e.target.value)}
                />
              </td>
              <td>
                <textarea
                  id="output"
                  placeholder="出力例"
                  className="flex-1 w-full border bg-primary rounded py-2 px-1"
                  {...register("output", { required: true })}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {message && <div className="text-red-500 text-sm">{message}</div>}

        <div className="flex ">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="bg-black-gradient text-white font-bold py-2 px-2 rounded-md mr-2"
            >
              投稿
            </button>
          )}
          <ReturnTopPage />
        </div>
      </form>
      <PreviewBlog info={blogInfo} />
    </div>
  );
};

export default NewBlogPage;
