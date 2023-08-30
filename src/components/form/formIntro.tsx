"use client";
import React from "react";
import AnimWrapper from "./animWrapper";
import { FormSpan, FormText, FormTitle } from "./formType";

export const dynamic = "force-dynamic";

export default function FormIntro() {
  return (
    <AnimWrapper>
      <FormTitle>Let's get started</FormTitle>

      <FormText>
        Welcome to our state-of-the-art data analytics and visualization tool! Here's a brief overview of the steps you'll take to transform your raw
        data into compelling insights:
      </FormText>

      <FormText>
        <FormSpan>Data Upload: </FormSpan>Begin by selecting and uploading your dataset. We support multiple file formats for your convenience.
      </FormText>

      <FormText>
        <FormSpan>Describe Your Data: </FormSpan>
        Give your dataset a unique name and provide some context. This helps in understanding its significance and origin.
      </FormText>

      <FormText>
        <FormSpan>Analysis Details: </FormSpan>
        Share with us the specifics of your intended analysis. Whether you're looking for trends or comparisons, we've got you covered.
      </FormText>
    </AnimWrapper>
  );
}
