"use server";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navigation from "../navigation";

import type { Database } from "@/lib/database.types";

const LoginObserver = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let user = null;
  let profile = null;
  
  if (session) {
    const { data: currentUser } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();
    user = currentUser;
  }
  
  return <Navigation session={session} user={user}/>;
};

export default LoginObserver;
