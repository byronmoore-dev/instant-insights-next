"use client";

import Link from "next/link";
import { getAllViews, removeView } from "@/app/actions";
import { TrashIcon, ViewIcon } from "@/lib/assets/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import styles from "@/css/scrollbar.module.css";
import { AllViewsProps } from "@/types/general";

const excludedPaths = ["/login", "/signup", "/reset", "/dashboard", "/profile"];

interface ListItemProps {
  item: AllViewsProps;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();
  const path = usePathname();

  const remove = async (item: AllViewsProps) => {
    let res = await removeView(item.id);
    if (res?.status === 204) {
      queryClient.setQueryData(["all-views"], (oldData: AllViewsProps[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((view) => view.id !== item.id);
      });

      if (path.includes(item.id)) {
        router.push("/");
      }
    }
  };

  return (
    <button
      key={item.id}
      className={`group relative mb-1 flex h-[44px] min-h-[44px] w-full items-center overflow-hidden rounded-md duration-75 ${
        path.includes(item.id)
          ? "bg-l-foreground brightness-90 dark:bg-d-foreground dark:brightness-110"
          : "hover:bg-l-foreground hover:dark:bg-d-foreground"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/view/${item.id}`}
        className={`group relative flex w-full items-center overflow-hidden whitespace-nowrap px-2 py-3 text-sm ${
          path.includes(item.id) ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <ViewIcon className="absolute left-2 top-1/2 -translate-y-1/2 stroke-l-text-main dark:stroke-d-text-main" />
        <p className="relative ml-5  text-l-text-main dark:text-d-text-main">{item?.title}</p>
        <motion.span
          className={`absolute right-0 top-0 h-full w-[20%] bg-gradient-to-r duration-500 group-hover:w-[20%] group-hover:dark:via-d-foreground/70 ${
            path.includes(item.id)
              ? "from-l-foreground/0 to-l-foreground group-hover:to-l-foreground dark:from-d-foreground/0 dark:to-d-foreground group-hover:dark:to-d-foreground "
              : "from-l-background/0 to-l-background group-hover:to-l-foreground dark:from-d-background/0 dark:to-d-background group-hover:dark:to-d-foreground"
          }`}
        />
      </Link>
      {isVisible && (
        <motion.div
          className="absolute right-2 top-1/2 z-30 flex -translate-y-1/2 cursor-pointer gap-2"
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

function SidebarList() {
  const path = usePathname();

  const { data } = useQuery<AllViewsProps[]>({
    queryKey: ["all-views"],
    queryFn: () => getAllViews(),
    refetchOnWindowFocus: false,
    enabled: !excludedPaths.some((excludedPath) => path.includes(excludedPath)),
  });

  if (!data) return null;

  if (data.length == 0) {
    return (
      <div className="px-6">
        <h6 className="mb-1 text-sm font-semibold text-white/50">Views</h6>
        <div className={"relative flex w-full cursor-default items-center overflow-hidden overflow-y-scroll py-3 text-center text-sm text-white/80"}>
          <p className="relative">You have no views yet. Click the 'New View' button to begin!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h6 className="mb-1 px-6 text-sm font-semibold text-l-text-second dark:text-d-text-second">Views</h6>
      <div className={classNames(styles.container, "overflow-y-scroll px-6")}>
        {data.map((item: AllViewsProps) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default SidebarList;
