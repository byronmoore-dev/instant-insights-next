"use client";
import React, { useState } from "react";
import classNames from "classnames";
import styles from "@/css/scrollbar.module.css";
import AnimWrapper from "./animWrapper";
import { UploadIcon } from "@/assets/icons";
import { FormSubheading, FormText, FormTitle } from "./formType";

export const dynamic = "force-dynamic";

export default function FormData({ updateForm }: { updateForm: (arg0: any) => void }) {
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const buffer = await new Promise<Buffer>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const buffer = Buffer.from(arrayBuffer);
          resolve(buffer);
        };
        reader.readAsArrayBuffer(file);
      });
      console.log("FILE: ", buffer);

      // Do something with the buffer
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AnimWrapper>
      <FormTitle>Let's upload your data</FormTitle>
      <FormText>
        Begin by providing the data you'd like to analyze and visualize. Whether you have a ready-to-go file or wish to manually input text, we've got
        you covered.
      </FormText>
      <FormSubheading>File Upload</FormSubheading>
      <FormText>Drag and drop your file here or click to browse. We support CSV, Excel, Text, and JSON formats.</FormText>
      <div className="relative mb-16 h-24 w-full select-none overflow-hidden rounded-xl border-[1.5px] border-border bg-foreground">
        <div className="group absolute left-1/2 top-1/2 flex aspect-square h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-neutral-900/10 hover:bg-neutral-900/60">
          <input
            type="file"
            onChange={(e) => uploadFile(e)}
            className="absolute left-0 right-0 h-full w-full cursor-pointer opacity-0 file:hidden file:text-transparent"
          />
          <UploadIcon className="w-6 text-white opacity-0 group-hover:opacity-100" />
        </div>
      </div>

      <FormSubheading>Manual Input</FormSubheading>
      <FormText>
        If you don't have a file ready, you can also paste your data directly into the textbox below. Ensure your data is well-structured for accurate
        results.
      </FormText>
      <FormText>Hint: For CSV data, ensure values are comma-separated. For JSON, ensure you have valid syntax.</FormText>
      <div className="relative mb-4 mt-4 w-full overflow-hidden rounded-2xl border-[1.5px] border-border bg-foreground py-2 pr-2">
        <textarea
          rows={5}
          required
          name="data"
          className={classNames(
            styles.container,
            "peer max-h-[200px] w-full resize-none rounded-2xl border-[1.5px] border-border bg-foreground px-6 pb-4 pt-4 text-sm text-black outline-none sm:text-base"
          )}
          onChange={updateForm}
        ></textarea>

        <label className="pointer-events-none absolute left-6 top-6 w-[90%] text-white/80 duration-200 peer-valid:top-2 peer-valid:pb-1 peer-valid:text-xs peer-focus:top-2 peer-focus:pb-1 peer-focus:text-xs">
          Paste in your data...
        </label>
      </div>
    </AnimWrapper>
  );
}
