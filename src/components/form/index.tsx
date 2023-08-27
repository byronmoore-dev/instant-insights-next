"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UseMutationResult } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import { FormProps } from "@/types/general";
import FormData from "./formData";
import FormIntro from "./formIntro";
import FormSummary from "./formSummary";
import FormSubmit from "./formSubmit";

export const dynamic = "force-dynamic";

enum FormStages {
  INTRO = "intro",
  DATA = "data",
  SUMMARY = "summary",
  SUBMIT = "submit",
}

let initialForm = {
  data: "",
  summary: "",
};

const FormRouter = ({ route, updateForm }: { route: FormStages; updateForm: (arg0: any) => void }) => {
  switch (route) {
    case FormStages.INTRO:
      return <FormIntro updateForm={updateForm} />;
    case FormStages.DATA:
      return <FormData updateForm={updateForm} />;
    case FormStages.SUMMARY:
      return <FormSummary updateForm={updateForm} />;
    case FormStages.SUBMIT:
      return <FormSubmit updateForm={updateForm} />;
    default:
      return <p>uh oh oopsies</p>;
  }
};

export default function DisplayForm({ mutation }: { mutation: any }) {
  // OOF TS Shit
  const typedQuery: UseMutationResult<GenerateVizType> = mutation;
  const { data, mutate } = typedQuery;

  // State
  const [form, setForm] = useState<FormProps>(initialForm);
  const [currentStages, setCurrentStages] = useState<FormStages>(FormStages.INTRO);

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("SUBMIT: ", form);
    mutate(form);
  };

  const changeStage = (e: React.MouseEvent<HTMLButtonElement>, direction: "next" | "back") => {
    e.preventDefault();
    const stageIndex = Object.values(FormStages).indexOf(currentStages);

    if (direction === "next" && stageIndex < Object.values(FormStages).length - 1) {
      setCurrentStages(Object.values(FormStages)[stageIndex + 1]);
    } else if (direction === "back" && stageIndex > 0) {
      setCurrentStages(Object.values(FormStages)[stageIndex - 1]);
    }
  };

  return (
    <section className="flex h-full flex-col pt-6">
      {/* Form Progress Nav */}
      <div className="relative mb-6 h-48 w-full rounded-md bg-black/20">
        <aside className="absolute top-4 flex w-full gap-3 px-4">
          <div className="h-2 w-full rounded bg-purple-700" />
          <div className="h-2 w-full rounded bg-purple-700" />
          <div className="h-2 w-full rounded bg-purple-700" />
          <div className="h-2 w-full rounded bg-purple-700" />
          <div className="h-2 w-full rounded bg-purple-700" />
        </aside>
        <div className="relative mb-12 w-full bg-red-300">
          {currentStages == FormStages.INTRO ? null : (
            <button className="absolute bottom-0 left-0 rounded bg-white px-4 py-2 text-black" onClick={(e) => changeStage(e, "back")}>
              Back
            </button>
          )}
          {currentStages == FormStages.SUBMIT ? (
            <button className="absolute bottom-0 right-0 rounded bg-white px-4 py-2 text-black" onClick={() => handleSubmit()}>
              Submit
            </button>
          ) : (
            <button className="absolute bottom-0 right-0 rounded bg-white px-4 py-2 text-black" onClick={(e) => changeStage(e, "next")}>
              Next
            </button>
          )}
        </div>
      </div>

      {/* Form Root */}
      <form onSubmit={handleSubmit} className="mx-auto flex h-full w-full max-w-2xl flex-col items-end justify-between">
        <FormRouter route={currentStages} updateForm={handleFormChange} />
      </form>
    </section>
  );
}
