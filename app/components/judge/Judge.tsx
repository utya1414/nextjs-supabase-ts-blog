'use client'
import React, { useEffect, useState } from 'react'
import { JudgeProps, TestcaseType } from '@/lib/judge.types'

const Judge = ({blogId, code, language, userid, testcases} : JudgeProps) => {
  const [detailDataList, setDetailDataList] = useState<any[]>([]);
  const [result, setResult] = useState<any[]>([]);
  const successNum = result.filter((result) => result).length;
  if (successNum === testcases.length) {
  }
  useEffect(() => {
    renderResult();
  }, []);
  const renderResult = () => {
    testcases.map(async (testcase) => {
      await getDetailData(code, language, testcase).then((detailData) => {
        console.log("detailData");
        console.log(detailData);
        const testResult = testcaseJudger(detailData, testcase);
        setDetailDataList((detailDataList) => [...detailDataList, detailData]);
        setResult((result) => [...result, testResult]);
      });
    });
  };

  return (
    <div>
      {result.map((result, index) => {
        if (!result) {
          return (
          <div key={index}>
            <div>結果:{result ? "正解" : "不正解"}</div>
            <div>入力:{detailDataList[index].input}</div>
            <div>出力:{detailDataList[index].stdout}</div>
            <div>エラー:{detailDataList[index].stderr}</div>
          </div>
          )
        }
        return (
          <div key={index}>
            <div>結果:{result ? "正解" : "不正解"}</div>
          </div>
        );
      })}
      <div className="bg-green-200">{successNum}/{result.length}</div>
    </div>
  );
}

const testcaseJudger = (detailData: any, testcase: TestcaseType) => {
  const result = detailData.stdout === testcase.output + "\n" ? true : false;
  return result;
};
const getDetailData = async (
  code: any,
  language: any,
  testcase: TestcaseType
) => {
  let detailData: any;
  try {
    const paizaData = {
      source_code: code,
      language: language,
      input: testcase.input,
      longpoll: true,
      longpoll_timeout: "10",
      api_key: "guest",
    };
    await postData(paizaData)
      .then((data) => {
        return processGetDetail(data.id);
      })
      .then((resDetailData) => {
        detailData = resDetailData;
      });
  } catch (error) {
    console.log("error:" + error);
  }
  return detailData;
};

const processGetDetail = (id: string) => {
  const detailData = getDetails(id);
  return detailData;
};

const postData = async (paizaData: any) => {
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

const getDetails = async (sessionId: string) => {
  const url = `http://api.paiza.io/runners/get_details?api_key=guest&id=${sessionId}`;
  const res = await fetch(url);
  const resJson = await res.json();
  return resJson;
};

export default Judge