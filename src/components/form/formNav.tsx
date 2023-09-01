import React from "react";
import { FormStages } from "@/types/general";
import { AnimatePresence, motion } from "framer-motion";

type FormNavProps = {
  showNav: boolean;
  currentStage: FormStages;
  changeStage: (arg0: React.MouseEvent<HTMLButtonElement>, arg1: "next" | "back") => void;
};

export const FormNav = ({ showNav, currentStage, changeStage }: FormNavProps) => {
  console.log("child nav: ", showNav);
  return (
    <div className="relative mt-4 h-12 w-full">
      <AnimatePresence>
        {showNav && (
          <motion.div animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
            {currentStage == FormStages.INTRO ? null : (
              <button
                className="absolute bottom-0 left-0 h-full rounded-lg border-[1.5px] border-l-border px-6 text-sm text-l-text-second duration-200 hover:bg-l-foreground dark:border-d-border dark:text-d-text-second hover:dark:bg-d-foreground"
                onClick={(e) => changeStage(e, "back")}
              >
                Back
              </button>
            )}
            {currentStage == FormStages.CONTEXT ? (
              <button
                className="absolute bottom-0 right-0 h-full rounded-lg bg-l-foreground px-6 text-sm text-l-text-main duration-200  hover:bg-l-foreground/60 dark:bg-d-foreground dark:text-d-text-main hover:dark:brightness-125"
                type="submit"
              >
                Submit
              </button>
            ) : (
              <button
                className="absolute bottom-0 right-0 h-full rounded-lg bg-l-foreground px-6 text-sm text-l-text-main duration-200  hover:bg-l-foreground/60 dark:bg-d-foreground dark:text-d-text-main hover:dark:brightness-125"
                onClick={(e) => changeStage(e, "next")}
              >
                Next
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
