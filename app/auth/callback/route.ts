import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function GET(reqest: NextRequest) {
  const requestUrl = new URL(reqest.url);
  const code = requestUrl.searchParams.get("code");
  if (code) {
    const supabase = createRouteHandlerClient<Database>({
      cookies,
    });

    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(requestUrl.origin);
};

