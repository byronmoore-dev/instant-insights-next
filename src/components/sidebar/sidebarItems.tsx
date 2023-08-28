"use client";
import { Database } from "@/types/supabase";
import Link from "next/link";
import { removeView } from "@/app/actions";
import { ViewIcon } from "@/assets/icons";
import { useQueryClient } from "@tanstack/react-query";

type ViewType = Database["public"]["Tables"]["view"]["Row"];

function SidebarList({ data }: { data: ViewType[] }) {
  const queryClient = useQueryClient();

  const remove = async (item: ViewType) => {
    let res = await removeView(item.id);
    if (res?.status === 204) {
      queryClient.invalidateQueries(["all-views"]);
    }
  };

  if (data.length == 0) {
    return (
      <>
        <h6 className="mb-1 text-sm font-semibold text-white/50">Views</h6>
        <div className="relative flex w-full cursor-default items-center overflow-hidden py-3 text-center text-sm text-white/80">
          <p className="relative">You have no views yet. Click the 'New View' button to begin!</p>
        </div>
      </>
    );
  }

  return (
    <>
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
            <span className="absolute right-0 top-0 h-full w-[25%] bg-gradient-to-r from-background/0 to-background duration-200 group-hover:w-[50%] group-hover:to-foreground" />
          </Link>
          <button
            className="text- pointer-events-auto absolute right-1 top-1/2 hidden -translate-y-1/2 rounded border-[1px] border-border bg-foreground px-2 text-white hover:brightness-125 group-hover:flex"
            onClick={() => remove(item)}
          >
            x
          </button>
        </button>
      ))}
    </>
  );
}

export default SidebarList;
