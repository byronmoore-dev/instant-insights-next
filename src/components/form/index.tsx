"use client";

import React, { useState } from "react";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import { FormProps, FormStages } from "@/types/general";
import FormData from "./formData";
import FormIntro from "./formIntro";
import FormSummary from "./formSummary";
import FormSubmit from "./formSubmit";
import FormProgress from "./formProgress";
import { AnimatePresence, motion } from "framer-motion";

export const dynamic = "force-dynamic";

let initialForm = {
  data: "",
  summary: "",
};

const FormRouter = ({ route, updateForm }: { route: FormStages; updateForm: (arg0: any) => void }) => {
  switch (route) {
    case FormStages.INTRO:
      return <FormIntro />;
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
  const { data, mutateAsync, error } = typedQuery;

  const queryClient = useQueryClient();

  // State
  const [form, setForm] = useState<FormProps>(initialForm);
  const [currentStage, setCurrentStage] = useState<FormStages>(FormStages.INTRO);
  const [showNav, setShowNav] = useState(true);

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("SUBMIT: ", form);
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

    // Show the FormNav
    setShowNav(true);
  };

  const FormNav = () => {
    return (
      <AnimatePresence>
        {showNav && (
          <motion.div
            className="relative mt-6 h-10 w-full"
            animate={{ opacity: 1 }} // Use the controls here
            transition={{ duration: 0.2, delay: 0.4 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            {currentStage == FormStages.INTRO ? null : (
              <button
                className="absolute bottom-0 left-0 rounded border-[1.5px] border-border px-4 py-2 text-white"
                onClick={(e) => changeStage(e, "back")}
              >
                Back
              </button>
            )}
            {currentStage == FormStages.SUBMIT ? (
              <button className="absolute bottom-0 right-0 rounded bg-white px-4 py-2 text-black" type="submit">
                Submit
              </button>
            ) : (
              <button className="absolute bottom-0 right-0 rounded bg-white px-4 py-2 text-black" onClick={(e) => changeStage(e, "next")}>
                Next
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <section className="flex h-full flex-col pt-6">
      {/* Form Progress Nav */}
      <FormProgress stage={currentStage} />
      {error ? <p className="bg-red-500 text-white">{error.toString()}</p> : null}
      {/* Form Root */}
      <form onSubmit={handleSubmit} className="relative mx-auto flex h-auto w-full max-w-2xl flex-col items-end pb-12">
        <FormRouter route={currentStage} updateForm={handleFormChange} />
        <FormNav />
      </form>
    </section>
  );
}
