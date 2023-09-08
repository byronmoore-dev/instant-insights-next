"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import { Database } from "@/types/supabase";
import { AddIcon, DashboardIcon, SidebarIcon } from "@/lib/assets/icons";
import AuthDisplay from "./authDisplay";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import SidebarList from "./sidebarItems";
import { getAllViews } from "@/app/actions";
import ThemeSwitch from "../themeSwitch";
import { usePathname } from "next/navigation";

type ViewType = Database["public"]["Tables"]["view"]["Row"];
const excludedPaths = ["/login", "/signup", "/reset", "/dashboard", "/profile"];

function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useLocalStorage<boolean>("sidebarOpen", true);

  const { data, error, isLoading } = useQuery<ViewType[]>({
    queryKey: ["all-views"],
    queryFn: () => getAllViews(),
    refetchOnWindowFocus: false,
    enabled: !excludedPaths.some((excludedPath) => path.includes(excludedPath)),
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
          className="border-border bg-foreground fixed left-6 top-6 z-20 rounded-md border-[1px] bg-l-background px-4 py-4 duration-200 hover:bg-l-foreground dark:bg-d-background hover:dark:bg-d-foreground"
          onClick={() => setOpen(true)}
        >
          <SidebarIcon className="stroke-l-text-main dark:stroke-d-text-main" />
        </motion.button>
      )}

      <motion.div animate={{ minWidth: open ? 290 : 0 }}>
        {/* Relative layer */}
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ width: 0, minWidth: 0 }}
              animate={{ width: 290, minWidth: 290 }}
              exit={{ width: 0, minWidth: 0 }}
              className={`h-20 w-[290px] overflow-hidden ${open ? "min-w-[290px]" : ""}`}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 290, transition: { duration: 0.2 } }}
            exit={{ width: 0 }}
            className="fixed z-30 h-screen overflow-hidden border-[1px] border-l-border bg-l-background dark:border-d-border dark:bg-d-background"
          >
            <section className="flex h-full w-[calc(350px-64px)] flex-col overflow-x-hidden p-6">
              {/* Upper Actions */}
              <div className="mb-16 flex flex-row">
                <Link
                  href={`/`}
                  className=" flex w-full flex-row items-center rounded border-[1px] border-l-border pl-3 text-base font-medium text-l-text-main duration-200 hover:bg-l-foreground dark:border-d-border dark:text-d-text-main hover:dark:bg-d-foreground"
                >
                  <AddIcon className="mr-2 fill-l-text-main dark:fill-d-text-main" /> New View
                </Link>
                <button
                  className="ml-2 flex h-full items-center rounded border-[1px] border-l-border px-4 py-4 duration-200 hover:bg-l-foreground dark:border-d-border  hover:dark:bg-d-foreground"
                  onClick={() => setOpen(false)}
                >
                  <SidebarIcon className="stroke-l-text-main dark:stroke-d-text-main" />
                </button>
              </div>

              {/* Dashboard */}
              {/* 
              <Link
                href={`/`}
                className="hover:bg-foreground text-l-main dark:text-d-main group relative flex w-full items-center overflow-hidden rounded-md px-2 py-3 duration-75"
              >
                <DashboardIcon className="mr-2 stroke-l-text-main dark:stroke-d-text-main" />
                Dashboard
              </Link>
              <div className="mb-6 mt-4 h-[1px] w-full rounded bg-l-border dark:bg-d-border" />
              */}

              {/* Views */}
              <SidebarList data={data} />
              <div className="bg-border mb-2 mt-auto h-[1px] w-full rounded" />

              {/* Auth */}
              <div className="mb-2">
                <ThemeSwitch />
              </div>
              <AuthDisplay />
            </section>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
