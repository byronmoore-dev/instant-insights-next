"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import { Database } from "@/types/supabase";
import { AddIcon, DashboardIcon, SidebarIcon } from "@/assets/icons";
import AuthDisplay from "./authDisplay";
import useLocalStorage from "@/lib/useLocalStorage";
import SidebarList from "./sidebarItems";
import { getAllViews } from "@/app/actions";

type ViewType = Database["public"]["Tables"]["view"]["Row"];

function Sidebar() {
  const [open, setOpen] = useLocalStorage<boolean>("sidebarOpen", false);

  const { data, error, isLoading } = useQuery<ViewType[]>({
    queryKey: ["all-views"],
    queryFn: () => getAllViews(),
  });

  if (isLoading) return null;
  if (!data) return null;
  if (error) return null;

  return (
    <>
      {open ? null : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0, delay: 0 } }}
          exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
          className="fixed left-6 top-6 rounded-md border-[1px] border-border bg-foreground px-4 py-4 text-white duration-200 hover:brightness-[110%]"
          onClick={() => setOpen(true)}
        >
          <SidebarIcon />
        </motion.button>
      )}

      {/* Relative layer */}
      <AnimatePresence>
        {open ? <motion.div initial={{ width: 0 }} animate={{ width: 350 }} exit={{ width: 0 }} className="h-20 w-[350px] overflow-hidden " /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 290 }}
            exit={{ width: 0 }}
            className="fixed h-screen overflow-hidden border-[1px] border-border bg-background"
          >
            <section className="flex h-full w-[calc(350px-64px)] flex-col overflow-x-hidden p-7">
              {/* Upper Actions */}
              <div className="mb-20 flex flex-row">
                <Link
                  href={`/`}
                  className="flex w-full flex-row items-center rounded border-[1px] border-border pl-3 text-base font-medium text-white duration-200 hover:bg-foreground"
                >
                  <AddIcon className="mr-2" /> New View
                </Link>
                <button
                  className="ml-2 flex h-full items-center rounded border-[1px] border-border px-4 py-4 duration-200 hover:bg-foreground"
                  onClick={() => setOpen(false)}
                >
                  <SidebarIcon />
                </button>
              </div>

              {/* Dashboard */}
              <Link
                href={`/`}
                className="group relative flex w-full items-center overflow-hidden rounded-md px-2 py-3 text-white duration-75 hover:bg-foreground"
              >
                <DashboardIcon className="mr-2" />
                Dashboard
              </Link>

              <div className="mb-6 mt-4 h-[1px] w-full rounded bg-border" />

              {/* Views */}
              <SidebarList data={data} />
              <div className="mb-2 mt-auto h-[1px] w-full rounded bg-border" />

              {/* Auth */}
              <AuthDisplay />
            </section>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
