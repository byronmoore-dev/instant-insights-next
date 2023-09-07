import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SignoutButton from "@/components/sidebar/signoutButton";
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
        <SignoutButton />
      ) : (
        <Link href="/login" className="rounded-md bg-gray-700 px-6 py-2 text-white">
          Login
        </Link>
      )}
    </nav>
  );
}
