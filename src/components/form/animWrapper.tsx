"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
export const dynamic = "force-dynamic";

export default function AnimWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0, duration: 0.4 }} className="w-full">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
