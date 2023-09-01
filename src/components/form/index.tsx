"use client";

import React, { useEffect, useMemo, useState } from "react";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import { FormProps, FormStages } from "@/types/general";
import FormData from "./formData";
import FormIntro from "./formIntro";
import FormSubmit from "./formSubmit";
import FormProgress from "./formProgress";
import { FormNav } from "./formNav";
import FormContext from "./formContext";

export const dynamic = "force-dynamic";

let initialForm = {
  textData: "",
  fileData: null,
  summary: "",
  purpose: "",
};

const FormRouter = ({ route, updateForm }: { route: FormStages; updateForm: (arg0: any) => void }) => {
  switch (route) {
    case FormStages.INTRO:
      return <FormIntro />;
    case FormStages.DATA:
      return <FormData updateForm={updateForm} />;
    case FormStages.CONTEXT:
      return <FormContext updateForm={updateForm} />;
    default:
      return <p>uh oh oopsies</p>;
  }
};

export default function DisplayForm({ mutation }: { mutation: any }) {
  // OOF TS Shit
  const typedQuery: UseMutationResult<GenerateVizType> = mutation;
  const { data, mutateAsync, error } = typedQuery;

  const queryClient = useQueryClient();

  // State
  const [form, setForm] = useState<FormProps>(initialForm);
  const [currentStage, setCurrentStage] = useState<FormStages>(FormStages.INTRO);
  const [showNav, setShowNav] = useState<boolean>();

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let res = await mutateAsync(form);
      queryClient.invalidateQueries(["all-views"]);

      console.log("res: ", res);
    } catch (e) {
      console.error(e);
    }
  };

  const changeStage = async (e: React.MouseEvent<HTMLButtonElement>, direction: "next" | "back") => {
    e.preventDefault();

    // Hide the FormNav
    setShowNav(false);

    setTimeout(() => {
      const stageIndex = Object.values(FormStages).indexOf(currentStage);

      if (direction === "next" && stageIndex < Object.values(FormStages).length - 1) {
        setCurrentStage(Object.values(FormStages)[stageIndex + 1]);
      } else if (direction === "back" && stageIndex > 0) {
        setCurrentStage(Object.values(FormStages)[stageIndex - 1]);
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setShowNav(true);
    }, 300); // You can adjust the delay as needed
  };

  return (
    <section className="flex h-full flex-col pt-6">
      {/* Form Progress Nav */}
      <FormProgress stage={currentStage} />
      {error ? <p className="bg-red-500 text-white">{error.toString()}</p> : null}

      {/* Form Root */}
      <form onSubmit={handleSubmit} className="relative mx-auto flex h-auto w-full max-w-2xl flex-col items-end pb-20">
        <FormRouter route={currentStage} updateForm={handleFormChange} />
        <FormNav showNav={showNav == undefined ? true : showNav} currentStage={currentStage} changeStage={changeStage} />
      </form>
    </section>
  );
}
