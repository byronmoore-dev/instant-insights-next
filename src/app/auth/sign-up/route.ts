import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirmPassword"));
  const supabase = createRouteHandlerClient({ cookies });

  if (password !== confirmPassword) {
    return NextResponse.redirect(`${requestUrl.origin}/signup?error=Passwords do not match.`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  const data = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.error) {
    return NextResponse.redirect(`${requestUrl.origin}/signup?error=${data.error?.message}`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/signup?error=Could not authenticate user`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  return NextResponse.redirect(requestUrl.origin, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
