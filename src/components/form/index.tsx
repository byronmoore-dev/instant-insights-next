"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProps, FormStages } from "@/types/form";
import FormData from "./formData";
import FormIntro from "./formIntro";
import FormProgress from "./formProgress";
import { FormNav } from "./formNav";
import FormContext from "./formContext";
import { useRouter } from "next/navigation";

let initialForm = {
  textData: "",
  fileData: null,
  summary: "",
  purpose: "",
};

const FORM_ROUTES = {
  [FormStages.INTRO]: FormIntro,
  [FormStages.DATA]: FormData,
  [FormStages.CONTEXT]: FormContext,
};

const submitInsightForm = async (form: FormProps): Promise<string> => {
  const response = await fetch("/api/createInsights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.data;
};

const FormRouter = ({ route, form, updateForm }: { route: FormStages; form: FormProps; updateForm: (arg0: any) => void }) => {
  switch (route) {
    case FormStages.INTRO:
      return <FormIntro />;
    case FormStages.DATA:
      return <FormData updateForm={updateForm} form={form} />;
    case FormStages.CONTEXT:
      return <FormContext updateForm={updateForm} form={form} />;
    default:
      return <p>form router error kek</p>;
  }
};

export default function CreateInsightsForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // State
  const [form, setForm] = useState<FormProps>(initialForm);
  const [currentStage, setCurrentStage] = useState<FormStages>(FormStages.INTRO);
  const [showNav, setShowNav] = useState<boolean>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { mutateAsync, error, status } = useMutation<string, Error, FormProps>({
    mutationFn: submitInsightForm,
    onSuccess: (viewId: string) => {
      setSubmitted(true);
      queryClient.invalidateQueries(["all-views"]);
      router.push(`/view/${viewId}`);
    },
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(form);
  };

  const changeStage = async (e: React.MouseEvent<HTMLButtonElement>, direction: "next" | "back") => {
    e.preventDefault();
    const stages = Object.values(FormStages);
    const stageIndex = stages.indexOf(currentStage);
    setShowNav(false);

    setTimeout(() => {
      if (direction === "next" && stageIndex < stages.length - 1) {
        setCurrentStage(stages[stageIndex + 1]);
      } else if (direction === "back" && stageIndex > 0) {
        setCurrentStage(stages[stageIndex - 1]);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShowNav(true);
    }, 300);
  };

  const FormComponent = FORM_ROUTES[currentStage] || (() => <p>form router error kek</p>);

  if (status === "loading" || submitted) {
    return (
      <div className="mx-auto h-full w-[90%] max-w-7xl sm:w-[80%]">
        <p className="relative text-2xl text-white">LOADING!</p>
      </div>
    );
  }

  return (
    <div className="mx-auto h-full w-[90%] max-w-7xl sm:w-[80%]">
      <section className="flex h-full flex-col pt-6">
        {/* Form Progress Nav */}
        <FormProgress stage={currentStage} />

        {/* Form Error */}
        {error ? <p className="bg-red-500 text-white">{error.toString()}</p> : null}

        {/* Form Root */}
        <form onSubmit={handleSubmitForm} className="relative mx-auto flex h-auto w-full max-w-2xl flex-col items-end pb-20">
          <FormComponent updateForm={handleFormChange} form={form} />
          <FormNav showNav={showNav == undefined ? true : showNav} currentStage={currentStage} changeStage={changeStage} />
        </form>
      </section>
    </div>
  );
}
