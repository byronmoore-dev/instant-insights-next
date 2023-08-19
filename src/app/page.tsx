import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import AddButton from "@/components/addButton";
import GPTForm from "@/components/form";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full h-screen flex flex-col items-center bg-black">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <AddButton />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <p className="text-white">Hey, {user.email}!</p>
                <LogoutButton />
              </div>
            ) : (
              <Link href="/login" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <GPTForm />
    </div>
  );
}
