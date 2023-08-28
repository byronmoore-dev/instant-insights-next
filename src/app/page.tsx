import MainPageContent from "@/app/content";
import isServerAuth from "@/components/authCheckServer";
import { redirect } from "next/navigation";

export default async function Index() {
  const isAuth = await isServerAuth();
  if (!isAuth) return redirect("/login");

  return (
    <>
      <MainPageContent />
    </>
  );
}
