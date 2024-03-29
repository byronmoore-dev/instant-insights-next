"use client";

import React from "react";
import AnimWrapper from "./animWrapper";
import { FormSubheading, FormText, FormTitle, TextArea } from "./formType";
import { FormProps } from "@/types/form";

export default function FormContext({ updateForm, form }: { updateForm: (arg0: any) => void; form: FormProps }) {
  return (
    <AnimWrapper>
      <FormTitle>Let's contextualize your data</FormTitle>
      <FormText>
        Provide insights about your dataset and share your analytical objectives. By understanding the story behind your data and your goals, we can
        deliver better results.
      </FormText>

      <div className="mb-4 h-[1px] w-full" />
      <FormSubheading>Tell Us About Your Data</FormSubheading>
      <FormText>Offer a brief overview of your dataset. This might include its origin, significance, or any peculiarities that stand out.</FormText>
      <TextArea updateForm={updateForm} value={form.summary} id="summary" label="What's unique or notable about this data?" />
      <div className="mb-8 h-[1px] w-full" />
      <FormSubheading>What Insights Are You Seeking?</FormSubheading>
      <FormText>
        Describe what you hope to uncover or understand from this dataset. This will guide the analytical process and ensure the visualizations align
        with your goals.
      </FormText>
      <TextArea updateForm={updateForm} value={form.purpose} id="purpose" label="What patterns or insights are you aiming to find?" />
    </AnimWrapper>
  );
}
