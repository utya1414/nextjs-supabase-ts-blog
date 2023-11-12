"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
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
  const supabase = createClientComponentClient<Database>();
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

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setMessage("パスワードでの認証の過程でエラーが発生しました");
        return;
      }

      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center my-5">
          <div className="font-bold text-xl">ログイン</div>
          <input
            type="email"
            className="border rounded-md focus:outline-none my-2 text-lg "
            placeholder="メールアドレス"
            id="email"
            {...register("email", { required: true })}
          ></input>
          <input
            type="password"
            className="border rounded-md focus:outline-none my-2 text-lg"
            placeholder="パスワード"
            id="password"
            {...register("password", { required: true })}
          ></input>
          {message && <div className="text-red-500 text-sm">{message}</div>}
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold my-5 py-2 px-2 border rounded-lg text-white bg-sky-500 shadow-lg hover:bg-sky-600 "
            >
              ログイン
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
