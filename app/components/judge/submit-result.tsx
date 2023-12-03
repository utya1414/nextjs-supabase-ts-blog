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
  return (
    <div>
      SubmitResult
      <Judge />
    </div>
  );
};

export default SubmitResult;
