"use client";
import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import DisplayInsights from "../components/displayInsights";
import DisplayForm from "../components/form";
import { FormProps } from "@/types/general";
import { exampleResponse } from "@/lib/promptText";
import useAuthCheck from "@/components/authCheck";

export const dynamic = "force-dynamic";

const getGPTData = async (form: FormProps): Promise<GenerateVizType> => {
  // if (true) return exampleResponse;
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: form.data, summary: form.summary }),
    });

    if (res.ok) {
      const resJson = await res.json(); // Get the JSON data from the response
      console.log("DATA: ", resJson?.data);
      return resJson.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    throw new Error("Error in getGPTData: " + e);
  }
};

export default function MainPageContent() {
  const [stage, setStage] = useState<"input" | "output">("input");
  useAuthCheck();

  const qMutation = useMutation<GenerateVizType>({
    mutationFn: async (form: any) => await getGPTData(form),
    onSuccess: () => {
      setStage("output");
    },
  });

  const { status } = qMutation;

  if (status === "loading") {
    return <p className="relative text-2xl text-white">LOADING!</p>;
  }

  if (stage === "input") {
    return (
      <div className="mx-auto h-screen w-[90%] max-w-7xl overflow-hidden sm:w-[80%]">
        <DisplayForm mutation={qMutation} />;
      </div>
    );
  }

  return (
    <div className="mx-auto w-[90%] max-w-7xl pt-28 sm:w-[80%]">
      <p className="text-white">{stage}</p>
      {stage == "output" && status == "success" ? <DisplayInsights query={qMutation} queryType="mutate" /> : null}
    </div>
  );
}
