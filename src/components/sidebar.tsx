"use client";
import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import Link from "next/link";
import { removeView } from "@/app/actions";
import { useState } from "react";
import { AddIcon, DashboardIcon, SidebarIcon, ViewIcon } from "@/assets/icons";
import { motion, AnimatePresence } from "framer-motion";
import AuthDisplay from "./authDisplay";

type ViewType = Database["public"]["Tables"]["view"]["Row"];

const getAllViews = async () => {
  try {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("No valid user logged in");

    let res = await supabase.from("view").select("*").eq("user_id", user.id);
    return res?.data || [];
  } catch (e) {
    throw e;
  }
};

function Sidebar() {
  const [open, setOpen] = useState<boolean>(false);
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
          animate={{ opacity: 1, transition: { duration: 0, delay: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
          className="absolute left-6 top-6 rounded-md border-[1px] border-border bg-foreground px-4 py-4 text-white duration-200 hover:brightness-[110%]"
          onClick={() => setOpen(true)}
        >
          <SidebarIcon />
        </motion.button>
      )}
      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 350 }}
            exit={{ width: 0 }}
            className="h-screen overflow-hidden border-[1px] border-border bg-background"
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
              <h6 className="mb-1 text-sm font-semibold text-white/50">Views</h6>
              {data.map((item: ViewType) => (
                <button
                  key={item.id}
                  className="group relative flex w-full cursor-pointer items-center overflow-hidden rounded-md duration-75 hover:bg-foreground"
                >
                  <Link
                    href={`/view/${item.id}`}
                    className="group relative flex w-full items-center overflow-hidden whitespace-nowrap px-2 py-3 text-sm text-white"
                  >
                    <ViewIcon className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <p className="relative ml-5">{item?.title}</p>
                    <span className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-r from-background/0 to-background group-hover:to-foreground" />
                  </Link>
                  <button
                    className="text- pointer-events-auto absolute right-1 top-1/2 hidden -translate-y-1/2 rounded border-[1px] border-border bg-foreground px-2 text-white hover:brightness-125 group-hover:flex"
                    onClick={() => removeView(item.id)}
                  >
                    x
                  </button>
                </button>
              ))}
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
