import React from "react";
import Judge from "@/app/components/judge/Judge";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { JudgeProps, TestcaseType } from "@/lib/judge.types";

const page = async ({
  params,
  searchParams,
}: {
  params: { blogId: string; result: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const supabase = createServerComponentClient({ cookies })
  const { data: rowdata } = await supabase
      .from('testcases')
      .select('*')
      .eq('blog_id', params.blogId)
      .single()

  if (!rowdata) {
    return (
      <div>
        <p>テストケースが見つかりませんでした。</p>
      </div>
    )
  }
  
  let testcases: TestcaseType[] = []
  for (let i = 0; i < rowdata.input.length; i++) {
    testcases.push({
      id: `${i+1}`,
      input: rowdata.input[i],
      output: rowdata.output[i]
    })
  }
  const parseData: JudgeProps = {
    blogId: params.blogId!,
    code: searchParams.code,
    language: searchParams.language!,
    userid: searchParams.user_id!,
    testcases: testcases,
  };

  return (
    <div>
      <Judge {...parseData} />
    </div>
  );
};

export default page;
