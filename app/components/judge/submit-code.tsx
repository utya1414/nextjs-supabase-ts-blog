"use client";
import Loading from "@/app/loading";
import { BlogListType } from "@/lib/blog.types";
import useStore from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  const supabase = createClientComponentClient();
  const { user } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [detail, setDetail] = useState<DetailProps>();
  const [language, setLanguage] = useState("");
  const [error, setError] = useState("");
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setLoading(true);
    const data = {
      code: code,
      language: language,
      blog_id: blog.id,
    };
    try {
      console.log("data");
      console.log(data);
      const paizaData = {
        source_code: data.code,
        language: data.language,
        input: "hello world",
        longpoll: true,
        longpoll_timeout: "2",
        api_key: "guest",
      };
      const setSubmissions = async () => {
        await postData(paizaData)
          .then((data) => {
            const processGetDetail = () => {
              const detailData = getDetails(data.id);
              console.log("detailData");
              console.log(detailData);
              return detailData;
            };
            return processGetDetail();
          })
          .then((detail) => {
            const insertSubmissions = async () => {
              const { error: insertError } = await supabase
                .from("submissions")
                .insert({
                  user_id: user?.id,
                  blogs_id: data.blog_id,
                  code: data.code,
                  result: detail.result,
                });

              if (insertError) {
                setError("エラーが発生しました" + insertError.message);
                return;
              }
              console.log("insert success");
              setDetail(detail);
            };
            insertSubmissions();
            sessionStorage.setItem(
              "submitInfo",
              JSON.stringify({
                user_id: user?.id,
                blogs_id: data.blog_id,
                code: data.code,
                detail: detail,
              })
            );
          });
      };
      setSubmissions();
      router.push("/blog/result");
      router.refresh();
    } catch (error) {
      console.log("error:" + error);
    }
    setLoading(false);
  };

  const postData = async (paizaData: CreateProps) => {
    const url = "http://api.paiza.io/runners/create";
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(paizaData),
    });
    return res.json();
  };

  const getStatus = async (sessionId: string) => {
    const url = `http://api.paiza.io/runners/get_status?api_key=guest&id=${sessionId}`;
    const res = await fetch(url);
    return res.json();
  };
  const getDetails = async (sessionId: string) => {
    const url = `http://api.paiza.io/runners/get_details?api_key=guest&id=${sessionId}`;
    const res = await fetch(url);
    return res.json();
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
