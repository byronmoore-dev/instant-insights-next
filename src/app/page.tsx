import isServerAuth from "@/lib/hooks/useAuthCheckServer";
import CreateInsightsForm from "@/components/form";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const isAuth = await isServerAuth();
  if (!isAuth) return redirect("/login");

  return <CreateInsightsForm />;
}
