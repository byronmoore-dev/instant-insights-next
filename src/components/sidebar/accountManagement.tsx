import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SignoutButton from "@/components/sidebar/signoutButton";
import ThemeSwitch from "../themeSwitch";
export const dynamic = "force-dynamic";

export default function AccountManagement() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getAuth = async () => {
      const {
        data: { user: userState },
      } = await supabase.auth.getUser();
      if (userState) {
        setUser(userState);
        console.log(userState);
      }
    };

    getAuth();
  }, [supabase]);

  return (
    <div className="mb-2 mt-auto flex flex-col p-6">
      <ThemeSwitch />
      {user ? (
        <SignoutButton />
      ) : (
        <Link href="/login" className="rounded-md bg-gray-700 px-6 py-2 text-white">
          Login
        </Link>
      )}
    </div>
  );
}
