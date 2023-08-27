"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UseMutationResult } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import classNames from "classnames";
import styles from "@/css/scrollbar.module.css";
import { FormProps } from "@/types/general";
import AnimWrapper from "./animWrapper";

export const dynamic = "force-dynamic";

export default function FormSummary({ updateForm }: { updateForm: (arg0: any) => void }) {
  return (
    <AnimWrapper>
      <h6 className="w-full text-xl font-bold text-white sm:text-2xl">the MAGIC VIZ INSIGHT MAKER</h6>

      <div className="relative mb-4 w-full overflow-hidden rounded-2xl bg-neutral-100 py-2 pr-2">
        <textarea
          rows={5}
          required
          name="summary"
          className={classNames(
            styles.container,
            "peer max-h-[200px] w-full resize-none rounded-2xl bg-neutral-100 px-6 pb-4 pt-4 text-sm text-black outline-none sm:text-base"
          )}
          onChange={updateForm}
        ></textarea>
        <label className="pointer-events-none absolute left-6 top-6 w-[90%] bg-neutral-100 text-black duration-200 peer-valid:top-2 peer-valid:pb-1 peer-valid:text-xs peer-focus:top-2 peer-focus:pb-1 peer-focus:text-xs">
          GIMME THAT SUMMARY
        </label>
      </div>
    </AnimWrapper>
  );
}
