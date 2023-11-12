"use client";
import React from "react";
import { createCilentComponentClient } from "@/supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import Loading from "@/app/loading";

import type { Database } from "@/lib/database.types";
type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは８文字以上で入力してください" }),
});

// ログインページ
const Login = () => {
  const supabase = createCilentComponentClient<Database>({ cookies });
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {};

  return <div>ログイン</div>;
};

export default Login;
