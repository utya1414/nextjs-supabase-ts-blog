import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CreateBlogButton from "./components/blog/create-blog-button";
import type { Database } from "@/lib/database.types";

const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      {session ? <div>ログイン済み</div> : <div>未ログイン</div>}
      {session ? <CreateBlogButton /> : <div></div>}
    </>
  );
};

export default Home;
