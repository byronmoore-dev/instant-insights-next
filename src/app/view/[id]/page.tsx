"use server";

import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ViewDisplay from "@/components/display";
import { User } from "@supabase/supabase-js";

// export const runtime = "edge";
// export const preferredRegion = "home";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

const getUser = async (): Promise<User | null> => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export default async function ViewPage({ params }: ChatPageProps) {
  const user = getUser();

  if (!user) {
    redirect(`/sign-in`);
  }

  return (
    <div className="mx-auto w-[90%] max-w-7xl pt-28 sm:w-[80%]">
      <ViewDisplay viewID={params.id} />
    </div>
  );
}
