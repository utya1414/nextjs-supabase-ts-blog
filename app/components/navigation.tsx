"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import type { Session } from "@supabase/auth-helpers-nextjs";
import useStore from "@/store";
import type { UserType } from "@/store";

const Navigation = ({
  session,
  user,
}: {
  session: Session | null;
  user: UserType | null;
}) => {
  const { setUser } = useStore();
  useEffect(() => {
    setUser({
      id: session ? session.user.id : "",
      email: session ? session.user.email! : "",
      name: session && user ? user.name : "",
    });
  }, [session, setUser, user]);
  return (
    <header className="w-full flex justify-between items-center py-5">
      <Link
        href="/"
        className="mx-5 font-bold font-poppins text-5xl cursor-pointer text-gradient "
      >
        Jitumu
      </Link>
      <div className="font-bold text-md">
        {session ? (
          <Link href="/profile/introduce" className="cursor-pointer mx-5">
            ログイン中
          </Link>
        ) : (
          <div className="flex items-center space-x-5 ">
            <Link href="/auth/login" className="cursor-pointer">
              ログイン
            </Link>
            <Link href="/auth/signup" className="cursor-pointer">
              サインアップ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
