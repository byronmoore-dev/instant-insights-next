"use client";
import { useQuery } from "@tanstack/react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import Link from "next/link";
import { removeView } from "@/app/actions";

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

const removeView21 = async (id: string) => {
  try {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No valid user logged in");

    let res2 = await supabase.from("view").select("*").eq("user_id", user.id);
    console.log("all select", res2);

    console.log("ID: " + id);
    let res = await supabase.from("view").delete().eq("id", id);
    if (res.error) throw res.error;
    console.log("data: ", res);

    // useViewStore.getState().removeView(id);
  } catch (e) {
    throw e;
  }
};

function Sidebar() {
  const { data, error, isLoading } = useQuery<ViewType[]>({
    queryKey: ["all-views"],
    queryFn: () => getAllViews(),
  });

  if (isLoading) return <p>loading mf</p>;
  if (!data) return <p>loading mf</p>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="h-screen w-72 overflow-hidden bg-neutral-900">
      {data.map((item: ViewType) => (
        <div
          key={item.id}
          className="group relative w-full flex justify-between items-center text-left pl-4 hover:bg-neutral-800 rounded-md duration-75"
        >
          <Link href={`/view/${item.id}`} className="text-white py-4 whitespace-nowrap">
            {item?.title}
          </Link>
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1 pointer-events-auto hidden group-hover:flex bg-red-500 hover:bg-green-300"
            onClick={() => removeView(item.id)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
