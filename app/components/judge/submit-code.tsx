"use client";
import Loading from "@/app/loading";
import { BlogListType } from "@/lib/blog.types";
import { useRouter } from "next/navigation";
import React, {
  useState,
  MouseEventHandler,
} from "react";

const Coding = (blog: BlogListType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setLoading(true);
    const data = {
      code: code,
      language: language,
      blog_id: blog.id,
    };
    try {
      sessionStorage.setItem("data", JSON.stringify(data));
      router.push("/blog/result");
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
        <option value="c++" className="text-black">
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
      <textarea
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 w-full bg-gray-gradient border border-gray-200 rounded py-2 px-1"
      />
      {loading ? <Loading /> : <button onClick={onClickHandler}>提出</button>}
    </div>
  );
};

export default Coding;
