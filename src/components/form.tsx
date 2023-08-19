"use client";
import React from "react";
import { useState } from "react";
import classNames from "classnames";
import styles from "../css/scrollbar.module.css";
import { motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery, useMutation } from "@tanstack/react-query";
import PieChartComponent from "./pieChart";
import { GenerateVizType } from "@/types/fx";
import SpiderChartComponent from "./spiderChart";
import { exampleResponse } from "@/lib/promptText";

export const dynamic = "force-dynamic";

type FormProps = {
  data: string;
  summary: string;
};

let initialForm = {
  data: "",
  summary: "",
};

const getAllViews = async () => {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No valid user logged in");
  await supabase.from("view").select("*").eq("user_id", user.id);
};

const getGPTData = async (form: FormProps): Promise<GenerateVizType | undefined> => {
  //if (true) return exampleResponse;
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
    return undefined;
  }
};

export default function GPTForm() {
  const [form, setForm] = useState<FormProps>(initialForm);
  const [stage, setStage] = useState<"input" | "output">("input");

  const { mutate, data, isLoading, status } = useMutation<GenerateVizType | undefined>({
    mutationFn: async () => await getGPTData(form),
    onSuccess: (result) => {
      console.log(result);
      setStage("output");
    },
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div id="contact-form" className="mx-auto w-[90%] sm:w-3/4 pt-28">
      <h1 className="text-white text-4xl">STAGE: {stage}</h1>
      {isLoading && <p className="text-white text-2xl">LOADING!</p>}
      {stage == "input" ? (
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mx-auto z-10 flex w-full max-w-2xl flex-col items-end rounded-3xl border-[1.5px] border-beige-100 bg-gray-900 p-6 drop-shadow-3xl sm:p-12 sm:pb-10 "
        >
          <h6 className="w-full text-xl font-bold text-white sm:text-2xl">the MAGIC VIZ INSIGHT MAKER</h6>
          {/* 
          <div className="flex w-full flex-col gap-4 sm:flex-row"> 
            <div className="relative w-full sm:mb-4">
              <input
                required
                name="title"
                type="title"
                className="peer w-full rounded-2xl bg-neutral-100 px-6 pb-4 pt-6 text-sm text-black focus:border-transparent sm:text-base"
                onChange={handleFormChange}
              />
              <label className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-black duration-200 peer-valid:top-4 peer-valid:text-xs peer-focus:top-4 peer-focus:text-xs">
                Title
              </label>
            </div>
            <div className="relative mb-4 w-full">
              <input
                required
                name="type"
                type="type"
                className="peer w-full rounded-2xl bg-neutral-100 px-6 pb-4 pt-6 text-sm text-black focus:border-transparent sm:text-base"
                onChange={handleFormChange}
              />
              <label className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-black duration-200 peer-valid:top-4 peer-valid:text-xs peer-focus:top-4 peer-focus:text-xs">
                Type
              </label>
            </div>
          </div>
          */}
          <div className="relative mb-4 w-full overflow-hidden rounded-2xl bg-neutral-100 py-2 pr-2">
            <textarea
              rows={5}
              required
              name="data"
              className={classNames(
                styles.container,
                "peer max-h-[200px] w-full resize-none rounded-2xl bg-neutral-100 px-6 pb-4 pt-4 text-sm text-black outline-none sm:text-base"
              )}
              onChange={handleFormChange}
            ></textarea>
            <label className="pointer-events-none absolute top-6 left-6 w-[90%] bg-neutral-100 text-black duration-200 peer-valid:top-2 peer-valid:pb-1 peer-valid:text-xs peer-focus:top-2 peer-focus:pb-1 peer-focus:text-xs">
              PASTE YOUR MF DATA
            </label>
          </div>
          <div className="relative mb-4 w-full overflow-hidden rounded-2xl bg-neutral-100 py-2 pr-2">
            <textarea
              rows={5}
              required
              name="summary"
              className={classNames(
                styles.container,
                "peer max-h-[200px] w-full resize-none rounded-2xl bg-neutral-100 px-6 pb-4 pt-4 text-sm text-black outline-none sm:text-base"
              )}
              onChange={handleFormChange}
            ></textarea>
            <label className="pointer-events-none absolute top-6 left-6 w-[90%] bg-neutral-100 text-black duration-200 peer-valid:top-2 peer-valid:pb-1 peer-valid:text-xs peer-focus:top-2 peer-focus:pb-1 peer-focus:text-xs">
              GIMME THAT SUMMARY
            </label>
          </div>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.2, type: "spring", stiffness: 240, damping: 10 }}
            viewport={{ once: true }}
            type="submit"
            className="ml-full' mr-0 w-auto rounded-2xl bg-teal-500 px-8 py-3 text-sm font-medium  text-white sm:text-base"
          >
            MAKE SOME NOISE
          </motion.button>
        </motion.form>
      ) : null}
      {stage == "output" && status == "success" ? (
        <>
          <h6 className="w-full text-xl font-bold text-white sm:text-2xl">Output</h6>

          <h6 className="w-full text-xl font-bold text-white sm:text-2xl">{data?.title}</h6>
          {data?.insights.map((item: string, index: number) => (
            <h6 key={index} className="w-full text-xl font-bold text-white sm:text-2xl">
              {item}
            </h6>
          ))}
          <div className="flex w-full h-72 bg-gray-800">
            {data ? <PieChartComponent data={data.viz1.data} /> : null}
            {data ? <SpiderChartComponent data={data.viz2.data} /> : null}
          </div>
          <button className="bg-green-800 px-8 py-2 text-white" onClick={() => setStage("input")}>
            Back to input
          </button>
        </>
      ) : null}
    </div>
  );
}
