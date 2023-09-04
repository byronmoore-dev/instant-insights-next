"use server";

import { notFound, redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getView } from "@/app/actions";
import ViewDisplay from "./display";

// export const runtime = "edge";
// export const preferredRegion = "home";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

const getUser = async (): Promise<any> => {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const user = getUser();

  if (!user) {
    redirect(`/sign-in?next=/chat/${params.id}`);
  }

  const chat = await getView(params.id);

  if (!chat) {
    return <p>loading ????? idk</p>;
  }

  return (
    <div className="mx-auto w-[90%] max-w-7xl pt-28 sm:w-[80%]">
      <ViewDisplay id={params.id} />
    </div>
  );
}
