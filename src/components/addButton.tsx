"use client";

import { getChats } from "@/app/actions";

export const dynamic = "force-dynamic";

async function testGPT(): Promise<any> {
  try {
    const url = "/api/ai";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) throw res;

    console.log("CLIENT RES: " + res);

    return { status: "success", statusText: "success" };
  } catch (error: any) {
    return { status: "error", statusText: error.statusText };
  }
}

export default function AddButton() {
  return (
    <button onClick={() => testGPT()} className="bg-red-700 px-4 py-2 text-white">
      TEST GPT
    </button>
  );
}
