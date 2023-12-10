"use client";
import Loading from "@/app/loading";
import { BlogListType } from "@/lib/blog.types";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import React, { useState, MouseEventHandler } from "react";
type ResultProps = {
  id: string;
  status: string;
  error: string;
};
type CreateProps = {
  source_code: string;
  language: string;
  input: string;
  longpoll: boolean;
  longpoll_timeout: string;
  api_key: string;
};
type DetailProps = {
  id: string;
  language: string;
  status: string;
  build_stdout: string;
  build_stderr: string;
  build_exit_code: string;
  build_time: string;
  build_memory: string;
  build_result: string;
  stdout: string;
  stderr: string;
  exit_code: string;
  time: string;
  memory: string;
  result: string;
};

const Coding = (blog: BlogListType) => {
  const { user } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("c");

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setLoading(true);
    try {
      router.push(`/blog/${blog.id}/result?language=` + language+"&code="+code + "&user_id=" + user?.id);
      router.refresh();
    } catch (error) {
      console.log("error:" + error);
    }
    setLoading(false);
  };

  return (
    <div>
      <select
        id="language"
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-black-gradient block appearance-none font-poppins px-2"
      >
        <option value="c" className="text-black">
          c
        </option>
        <option value="cpp" className="text-black">
          c++
        </option>
        <option value="java" className="text-black">
          Java
        </option>
        <option value="python3" className="text-black">
          Python3
        </option>
        <option value="javascript" className="text-black">
          JavaScript
        </option>
      </select>
      <div>
      <textarea
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 w-full bg-gray-gradient border border-gray-200 rounded py-2 px-1"
      />
      </div>
      {loading ? <Loading /> : <button onClick={onClickHandler}>提出</button>}
    </div>
  );
};

export default Coding;
