"use client";
import React from "react";
import AnimWrapper from "./animWrapper";
import { FormSpan, FormSubheading, FormText, FormTitle } from "./formType";

export const dynamic = "force-dynamic";

export default function FormIntro() {
  return (
    <AnimWrapper>
      <FormTitle>Let's get started</FormTitle>
      <FormText>
        Welcome to our state-of-the-art data analytics and visualization tool! Here's a brief overview of the steps you'll take to transform your raw
        data into compelling insights:
      </FormText>

      <FormSubheading>Data Upload</FormSubheading>
      <FormText>Begin by selecting and uploading your dataset. We support multiple file formats for your convenience.</FormText>

      <FormSubheading>Describe Your Data</FormSubheading>
      <FormText>Explain what the data is and why your interested in it. This helps in understanding its significance and origin.</FormText>
    </AnimWrapper>
  );
}
