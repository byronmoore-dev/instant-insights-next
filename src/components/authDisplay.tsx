import React, { useEffect, useState } from "react";
import LogoutButton from "./logoutButton";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default function AuthDisplay() {
  const supabase = createClientComponentClient();
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const getAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setState(user);
      }
    };

    getAuth();
  }, [supabase]);
  return (
    <nav className="relative">
      {state ? (
        <LogoutButton />
      ) : (
        <Link href="/login" className="bg-gray-700 px-6 py-2 rounded-md text-white">
          Login
        </Link>
      )}
    </nav>
  );
}
