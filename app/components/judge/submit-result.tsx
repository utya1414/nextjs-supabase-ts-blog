"use client";
import React, { use, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useStore from "@/store";
import { set } from "date-fns";
import Judge from "./Judge";

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
  const [user_id, setUser_id] = useState("");
  const [blog_id, setBlog_id] = useState("");

  const [detail, setDetail] = useState<DetailProps>();
  const [error, setError] = useState("");

  const [testcases, setTestcases] = useState<string[]>([]);
  const getTestcases = async () => {
    // const { data, error } = await supabase
    //   .from("testcases")
    //   .select("*")
    //   .eq("blog_id", blog_id)
    //   .single();
    // if (error) {
    //   setError(error.message);
    //   return;
    // }
    const data = {
      testcase: ["1 1 2", "2 2 4", "3 3 6"],
    }
    setTestcases(data.testcase);
  };

  useEffect(() => {
    const submitInfo = sessionStorage.getItem("submitInfo");
    const submitInfoJson = JSON.parse(submitInfo!);
    setDetail(submitInfoJson.detail);
    setUser_id(submitInfoJson.user_id);
    setBlog_id(submitInfoJson.blog_id);
    console.log(submitInfoJson);
    getTestcases();
  }, []);

  return (
    <div>
      {testcases.map((testcase: string, i=0) => {
          return <Judge key={i++} testcase={testcase} />
      })}
      SubmitResult
      {user_id}
      {blog_id}
      {detail?.language}
      {detail?.status}
      {detail?.time}
      {detail?.result}
      {error}
    </div>
  );
};

export default SubmitResult;
