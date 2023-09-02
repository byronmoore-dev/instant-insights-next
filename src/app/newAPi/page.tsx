"use client";
import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import { FormProps } from "@/types/general";
import { dataPrompt, exampleResponse, summaryPrompt } from "@/lib/promptText";
import useAuthCheck from "@/components/authCheck";

export const dynamic = "force-dynamic";

const getGPTData = async (form: FormProps): Promise<GenerateVizType> => {
  // if (true) return exampleResponse;
  try {
    const res = await fetch("/api/getInsights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textData: form.textData, summary: form.summary, purpose: form.purpose }),
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
    throw e;
  }
};

export default function MainPageContent() {
  const [stage, setStage] = useState<"input" | "output">("input");
  useAuthCheck();
  const testData = { textData: dataPrompt, summary: summaryPrompt, purpose: "i want insights around the timeline" };

  const qMutation = useMutation<GenerateVizType>({
    mutationFn: async () => await getGPTData(testData),
    onSuccess: (res: any) => {
      setStage("output");
      console.log("RES: ", res);
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button className="rounded bg-white p-4 text-black" onClick={() => qMutation.mutate()}>
        click me
      </button>
    </div>
  );
}
