import MainPageContent from "@/app/content";
import isServerAuth from "@/components/authCheckServer";
import { redirect } from "next/navigation";

export default async function Index() {
  const isAuth = await isServerAuth();
  console.log("t/f", isAuth);

  if (!isAuth) return redirect("/login");

  return (
    <>
      <MainPageContent />
    </>
  );
}
