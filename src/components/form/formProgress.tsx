"use client";

import React, { useState } from "react";
import { FormStages } from "@/types/general";
import Image from "next/image";

export default function FormProgress({ stage }: { stage: FormStages }) {
  const steps = Object.values(FormStages);
  const currentIndex = steps.indexOf(stage);

  return (
    <div className="relative mb-10 h-auto w-full">
      <div className="relative h-48 w-full overflow-hidden rounded-md">
        <Image
          src={"https://zuzana-eco-blog.s3.us-east-2.amazonaws.com/hero.jpg"}
          alt="lfg"
          priority
          fill
          className="min-w-48 h-full w-full rounded-2xl object-cover brightness-[25%]"
          style={{ objectFit: "cover" }}
        />
      </div>
      <aside className="absolute top-0 mb-4 mt-3 flex w-full gap-3 px-3">
        {steps.map((item: string, index: number) => {
          return (
            <div key={item} className={`h-[6px] w-full rounded duration-300 ${currentIndex >= index ? "bg-neutral-400" : "bg-neutral-400/30"}`} />
          );
        })}
      </aside>
    </div>
  );
}
