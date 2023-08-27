"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function useAuthCheck() {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        //router.push("/login");
      }
    };

    getAuth();
  }, [supabase]);
  return null;
}
