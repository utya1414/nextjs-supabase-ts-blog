import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CreateBlogButton from "./components/blog/create-blog-button";
import type { Database } from "@/lib/database.types";
import BlogList from "./components/blog/blog-list";
import { Suspense } from "react";
import Loading from "@/app/loading";

const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      {session ? <CreateBlogButton /> : <div></div>}
      <Suspense fallback={<Loading />}>
      <BlogList />
      </Suspense>
    </>
  );
};

export default Home;
