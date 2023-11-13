import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Signup from "@/app/components/auth/signup";
import { redirect } from "next/navigation";

import type { Database } from "@/lib/database.types";

const SignUp = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/");
  }

  return <Signup />;
};

export default SignUp;
