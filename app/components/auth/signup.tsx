"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "@/app/loading";
import { useState } from "react";

import type { Database } from "@/lib/database.types";
type Schema = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" }),
});
const Signup = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    setLoading(true);
    try {
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (errorSignup) {
        setMessage("エラーが発生しました" + errorSignup);
        return;
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({
          name: data.name,
        })
        .eq("email", data.email);
      if (updateError) {
        setMessage("エラーが発生しました" + updateError);
        return;
      }

      reset();
      setSendMessage("確認メールを送信しました");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center my-5">
          <div className="font-bold text-xl">サインアップ</div>
          <input
            type="text"
            className="rounded-md bg-gray-gradient my-2 py-1 px-2 text-lg"
            placeholder="名前"
            id="name"
            {...register("name", { required: true })}
          ></input>
          <input
            type="email"
            className="rounded-md bg-gray-gradient my-2 py-1 px-2 text-lg "
            placeholder="メールアドレス"
            id="email"
            {...register("email", { required: true })}
          ></input>
          <input
            type="password"
            className="rounded-md bg-gray-gradient my-2 py-1 px-2 text-lg"
            placeholder="パスワード"
            id="password"
            {...register("password", { required: true })}
          ></input>
          {message && <div className="text-red-500 text-sm">{message}</div>}
          {sendMessage && (
            <div className="text-gradient text-sm">{sendMessage}</div>
          )}
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold my-5 py-2 px-2 rounded-lg text-white bg-black-gradient"
            >
              確認メール送信
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default Signup;
