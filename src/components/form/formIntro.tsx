"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UseMutationResult } from "@tanstack/react-query";
import { GenerateVizType } from "@/types/fx";
import classNames from "classnames";
import styles from "@/css/scrollbar.module.css";
import { FormProps } from "@/types/general";
import AnimWrapper from "./animWrapper";

export const dynamic = "force-dynamic";

export default function FormIntro({ updateForm }: { updateForm: (arg0: any) => void }) {
  return (
    <AnimWrapper>
      <h6 className="w-full text-xl font-bold text-white sm:text-2xl">Intro</h6>
      <p className="text-white/80">Here is a bunch of copy text that is useless but temp</p>
    </AnimWrapper>
  );
}
