"use client";
import React, { useState } from "react";
import classNames from "classnames";
import styles from "@/css/scrollbar.module.css";
import AnimWrapper from "./animWrapper";
import { UploadIcon } from "@/assets/icons";

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
      <h6 className="w-full text-xl font-bold text-white sm:text-2xl">Let's upload your data</h6>
      <div className="relative mb-4 w-full overflow-hidden rounded-2xl bg-neutral-100 py-2 pr-2">
        <textarea
          rows={5}
          required
          name="data"
          className={classNames(
            styles.container,
            "peer max-h-[200px] w-full resize-none rounded-2xl bg-neutral-100 px-6 pb-4 pt-4 text-sm text-black outline-none sm:text-base"
          )}
          onChange={updateForm}
        ></textarea>

        <label className="pointer-events-none absolute left-6 top-6 w-[90%] bg-neutral-100 text-black duration-200 peer-valid:top-2 peer-valid:pb-1 peer-valid:text-xs peer-focus:top-2 peer-focus:pb-1 peer-focus:text-xs">
          PASTE YOUR MF DATA
        </label>
      </div>

      <div className="relative mr-auto h-20 w-28 select-none overflow-hidden rounded-3xl border-8 border-white bg-orange-500">
        <div className="group absolute left-1/2 top-1/2 flex aspect-square h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-neutral-900/10 hover:bg-neutral-900/60">
          <input
            type="file"
            onChange={(e) => uploadFile(e)}
            className="absolute left-0 right-0 h-full w-full cursor-pointer opacity-0 file:hidden file:text-transparent"
          />
          <UploadIcon className="w-8 text-white opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </AnimWrapper>
  );
}
