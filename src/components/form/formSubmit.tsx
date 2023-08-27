"use client";
import React, { useState } from "react";
import AnimWrapper from "./animWrapper";

export const dynamic = "force-dynamic";

export default function FormSubmit({ updateForm }: { updateForm: (arg0: any) => void }) {
  return (
    <AnimWrapper>
      <h6 className="w-full text-xl font-bold text-white sm:text-2xl">It is time to submit</h6>
    </AnimWrapper>
  );
}
