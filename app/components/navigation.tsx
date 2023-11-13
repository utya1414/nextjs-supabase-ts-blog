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
    <header className="shadow-lg shadow-gray-100">
      <div className=" flex justify-between items-center py-5 container mx-auto">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          My Blog
        </Link>
        <div className="font-bold text-md">
          {session ? (
            <div className="cursor-pointer">
              <Link href="/">ログイン中</Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login" className="cursor-pointer">
                ログイン
              </Link>
              <Link href="/auth/signup" className="cursor-pointer">
                サインアップ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
