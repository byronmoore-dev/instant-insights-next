"use client";
import React from "react";
import classNames from "classnames";
import styles from "@/css/scrollbar.module.css";
import AnimWrapper from "./animWrapper";
import { FormText, FormTitle } from "./formType";

export default function FormSummary({ updateForm }: { updateForm: (arg0: any) => void }) {
  return (
    <AnimWrapper>
      <FormTitle>Let's upload your data</FormTitle>
      <FormText>
        Begin by providing the data you'd like to analyze and visualize. Whether you have a ready-to-go file or wish to manually input text, we've got
        you covered.
      </FormText>
      <div className="relative mb-4 w-full overflow-hidden rounded-2xl border-[1.5px] border-border bg-foreground py-2 pr-2">
        <textarea
          rows={5}
          required
          name="summary"
          className={classNames(
            styles.container,
            "peer max-h-[200px] w-full resize-none rounded-2xl border-[1.5px] border-border bg-foreground px-6 pb-4 pt-4 text-sm text-black outline-none sm:text-base"
          )}
          onChange={updateForm}
        ></textarea>

        <label className="pointer-events-none absolute left-6 top-6 w-[90%] text-white/80 duration-200 peer-valid:top-2 peer-valid:pb-1 peer-valid:text-xs peer-focus:top-2 peer-focus:pb-1 peer-focus:text-xs">
          Describe your data...
        </label>
      </div>
    </AnimWrapper>
  );
}
