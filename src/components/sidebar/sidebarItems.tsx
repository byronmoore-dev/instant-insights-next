"use client";
import { Database } from "@/types/supabase";
import Link from "next/link";
import { removeView } from "@/app/actions";
import { EditIcon, TrashIcon, ViewIcon } from "@/assets/icons";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";

type ViewType = Database["public"]["Tables"]["view"]["Row"];

interface ListItemProps {
  item: ViewType;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const queryClient = useQueryClient();

  const remove = async (item: ViewType) => {
    let res = await removeView(item.id);
    if (res?.status === 204) {
      queryClient.invalidateQueries(["all-views"]);
    }
  };

  return (
    <button
      key={item.id}
      className="group relative flex w-full cursor-pointer items-center overflow-hidden rounded-md duration-75 hover:bg-l-foreground hover:dark:bg-d-foreground"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/view/${item.id}`} className="group relative flex w-full items-center overflow-hidden whitespace-nowrap px-2 py-3 text-sm">
        <ViewIcon className="absolute left-2 top-1/2 -translate-y-1/2 stroke-l-text-main dark:stroke-d-text-main" />
        <p className="relative ml-5  text-l-text-main dark:text-d-text-main">{item?.title}</p>
        <span className="absolute right-0 top-0 h-full w-[60%] bg-gradient-to-r from-l-background/0 to-l-background duration-200 group-hover:w-[50%] group-hover:to-l-foreground dark:from-d-background/0 dark:to-d-background group-hover:dark:to-d-foreground" />
      </Link>
      {isVisible && (
        <motion.div
          className="absolute right-1 top-1/2 flex -translate-y-1/2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ staggerChildren: 0.5 }}
          onAnimationComplete={() => {
            if (!isHovered) {
              setIsVisible(false);
            }
          }}
        >
          {/*<EditIcon className="pointer-events-auto h-4 w-4 min-w-[16px] stroke-l-text-main dark:stroke-d-text-main" />*/}
          <TrashIcon
            className="pointer-events-auto h-4 w-4 min-w-[16px] stroke-l-text-main duration-200 hover:scale-[115%] dark:stroke-d-text-main"
            onClick={() => remove(item)}
          />
        </motion.div>
      )}
    </button>
  );
};

function SidebarList({ data }: { data: ViewType[] }) {
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
      <h6 className="mb-1 text-sm font-semibold text-l-text-second dark:text-d-text-second">Views</h6>
      {data.map((item: ViewType) => (
        <ListItem key={item.id} item={item} />
      ))}
    </>
  );
}

export default SidebarList;
