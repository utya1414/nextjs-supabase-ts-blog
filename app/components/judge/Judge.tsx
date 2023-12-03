import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState, useEffect } from "react";
import useStore from "@/store";
import { de } from "date-fns/locale";
import { set } from "date-fns";
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
type SubmitDataProps = {
  blog_id: string;
  user_id: string;
  code: string;
  language: string;
};
type TestResultType = {
  id: string;
  result: string;
  time: string;
  memory: string;
  status: string;
};
const Judge = () => {
  const supabase = createClientComponentClient();
  const { user } = useStore();
  const [submitData, setSubmitData] = useState<SubmitDataProps>();
  const [loading, setLoading] = useState(false);
  const [testcases, setTestcases] = useState<string[]>();
  const [blogInfo, setBlogInfo] = useState(null);
  const detailResult: TestResultType[] = [];
  const detailList: DetailProps[] = [];
  const [allTestResult, setAllTestResult] = useState<string>("");
  useEffect(() => {
    const submitInfo = sessionStorage.getItem("submitInfo");
    const submitInfoJson = JSON.parse(submitInfo!);
    setSubmitData(submitInfoJson);
    console.log("submitInfoJson");
    console.log(submitInfoJson);
    getTestCase(submitInfoJson.blog_id);
    getBlogInfo(submitInfoJson.blog_id);
    testResult();
  }, []);

  const getTestCase = async (blog_id: string) => {
    const { data, error } = await supabase
      .from("testcases")
      .select("*")
      .eq("blog_id", blog_id)
      .single();

    if (error) {
      console.log("error" + error);
      return;
    }
    setTestcases(data.testcase);
  };

  const getBlogInfo = async (blog_id: string) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", blog_id)
      .single();

    if (error) {
      console.log("error" + error);
      return;
    }
    setBlogInfo(data);
  };

  const testcaseJudger = (testcase: string) => {
    try {
      const paizaData = {
        source_code: submitData!.code,
        language: submitData!.language,
        input: testcase,
        longpoll: true,
        longpoll_timeout: "10",
        api_key: "guest",
      };
      console.log("paizaData");
      console.log(paizaData);
      setSubmissions(paizaData);
    } catch (error) {
      console.log("error:" + error);
    }
  };

  const processGetDetail = (id: string) => {
    const detailData = getDetails(id);
    console.log("detailData");
    console.log(detailData);
    return detailData;
  };

  const insertSubmissions = async () => {
    const { data, error } = await supabase
      .from("submissions")
      .select()
      .eq("code", submitData!.code)
      .single();
    if (data) {
      console.log("すでに登録されています");
      return;
    }
    const { error: insertError } = await supabase.from("submissions").insert({
      user_id: user!.id,
      blogs_id: submitData!.blog_id,
      code: submitData!.code,
      result: allTestResult,
    });

    if (insertError) {
      console.log("エラーが発生しました" + insertError.message);
      return;
    }
    console.log("insert success");
  };

  const setSubmissions = async (paizaData: CreateProps) => {
    await postData(paizaData)
      .then((data) => {
        console.log("data");
        console.log(data);
        return processGetDetail(data.id);
      })
      .then((detail) => {
        detailList.push(detail);
      });
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
    console.log("postres");
    console.log(res);
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
    const resJson = await res.json();
    return resJson;
  };

  const testResult = () => {
    testcases?.map(async (testcase, index) => {
      testcaseJudger(testcase);
    });
    detailList.map((detail) => {
      detailResult.push({
        id: detail.id,
        result: detail.result,
        time: detail.time,
        memory: detail.memory,
        status: detail.status,
      });

      let flag = true;
      if (flag && detail.result == "failure") {
        setAllTestResult("failure");
      }
      if (detail.result == "timeout") {
        flag = false;
        setAllTestResult("timeout");
      }
    });
    if (allTestResult == "") {
      setAllTestResult("success");
    }
    console.log("detailResult")
    console.log(detailResult)
    insertSubmissions();
  };
  return (
    <div>
      {detailResult.map((detail) => {
        return (
          <div key={detail.id}>
            <div>result:{detail.result}</div>
            <div>time:{detail.time}</div>
            <div>memory:{detail.memory}</div>
            <div>status:{detail.status}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Judge;
