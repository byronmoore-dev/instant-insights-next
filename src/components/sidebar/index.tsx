"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AddIcon, SidebarIcon } from "@/lib/assets/icons";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import SidebarList from "./sidebarItems";
import AccountManagement from "./accountManagement";
import { usePathname } from "next/navigation";
const excludedPaths = ["/login", "/signup", "/reset", "/dashboard", "/profile"];

function Sidebar() {
  const [open, setOpen] = useLocalStorage<boolean>("sidebarOpen", true);
  const path = usePathname();

  if (excludedPaths.some((excludedPath) => path.includes(excludedPath))) return null;

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
            <section className="flex h-full w-[calc(350px-64px)] flex-col overflow-x-hidden">
              {/* Upper Actions */}
              <div className="mb-8 flex flex-row p-6">
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

              {/* Views */}
              <SidebarList />

              {/* Account Management */}
              <AccountManagement />
            </section>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
