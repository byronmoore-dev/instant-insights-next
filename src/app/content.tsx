"use client";
import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import DisplayInsights from "../components/display/displayInsights";
import DisplayForm from "../components/form";
import { FormProps } from "@/types/general";
import useAuthCheck from "@/components/authCheck";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const getGPTData = async (form: FormProps): Promise<string> => {
  try {
    const res = await fetch("/api/createInsights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textData: form.textData, summary: form.summary, purpose: form.purpose }),
    });

    if (res.ok) {
      const resJson = await res.json(); // Get the JSON data from the response
      return resJson.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default function MainPageContent() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  useAuthCheck();

  const qMutation = useMutation<string>({
    mutationFn: async (form: any) => await getGPTData(form),
    onSuccess: (viewId: string) => {
      setSubmitted(true);
      queryClient.invalidateQueries(["all-views"]);
      router.push(`/view/${viewId}`);
    },
  });

  const { status } = qMutation;

  if (status === "loading" || submitted) {
    return (
      <div className="mx-auto h-full w-[90%] max-w-7xl sm:w-[80%]">
        <p className="relative text-2xl text-white">LOADING!</p>;
      </div>
    );
  }

  return (
    <div className="mx-auto h-full w-[90%] max-w-7xl sm:w-[80%]">
      <DisplayForm mutation={qMutation} />
    </div>
  );
}
