"use client";
import React, { use, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useStore from "@/store";
import { set } from "date-fns";

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
const SubmitResult = () => {
  const supabase = createClientComponentClient();
  const { user } = useStore();
  const [detail, setDetail] = useState<DetailProps>();
  const [error, setError] = useState("");
  useEffect(() => {
    const dataJson = sessionStorage.getItem("data");
    const data = JSON.parse(dataJson!);
    if (!data) {
      setError("データがありません");
      return;
    }
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
          };
          console.log(user?.id);
          console.log(data.blog_id);
          console.log(data.code)
          console.log(detail.result)
          insertSubmissions();
        });
    };
    setSubmissions();
  }, []);

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
      SubmitResult
      {error}
    </div>
  );
};

export default SubmitResult;
