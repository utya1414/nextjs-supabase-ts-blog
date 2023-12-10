"use client";
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

type InfoProps = {
  title: string;
  content: string;
  timelimit: string;
  memorylimit: string;
  input: string;
  output: string;
}
const EditBlog = ({ blog }: PageProps) => {
  const { user } = useStore();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [timelimit, setTimelimit] = useState("");
  const [memorylimit, setMemorylimit] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isMyBlog, setIsMyBlog] = useState(false);
  const [message, setMessage] = useState("");
  const blogInfo = {
    title: title,
    content: content,
    timelimit: timelimit,
    memorylimit: memorylimit,
    input: input,
    output: output,
  }
  useEffect(() => {
    if (user?.id !== blog.user_id) {
      router.push(`/blog/${blog.id}`);
    } else {
      setTitle(blog.title);
      setContent(blog.content);
      setTimelimit(blog.timelimit!);
      setMemorylimit(blog.memorylimit!);
      setInput(blog.input!);
      setOutput(blog.output!);
      setIsMyBlog(true);
    }
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        const { error: UpdateError } = await supabase
          .from("blogs")
          .update({
            title,
            content,
            timelimit,
            memorylimit,
            input,
            output,
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
            <textarea
              id="content"
              placeholder="本文"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 w-full bg-gray-gradient border border-gray-200 rounded py-2 px-1"
            />
            <div className="flex items-center">
              <div>Time limit:</div>
              <input
                id="timelimit"
                type="text"
                placeholder="実行時間制限"
                value={timelimit}
                className="border bg-primary rounded-md px-1 w-1/2"
                onChange={(e) => setTimelimit(e.target.value)}
              ></input>
            </div>
            <div className="flex items-center">
              <div>Memory limit:</div>
              <input
                id="memorylimit"
                type="text"
                placeholder="メモリ制限"
                value={memorylimit}
                className="border bg-primary rounded-md px-1 w-1/2"
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
                      value={input}
                      className="flex-1 w-full border bg-primary rounded py-2 px-1"
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      id="output"
                      placeholder="出力例"
                      value={output}
                      className="flex-1 w-full border bg-primary rounded py-2 px-1"
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
                  className="bg-black-gradient text-white font-bold py-2 px-2 rounded-md hover:bg-sky-600 mr-2"
                >
                  編集
                </button>
              )}
              <ReturnTopPage />
            </div>
          </form>
          <PreviewBlog info={blogInfo} />
        </div>
      );
    }
  };
  return <>{renderBlog()}</>;
};

export default EditBlog;
