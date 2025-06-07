import { DashboardPage } from "@/components/page/dashboard";
import { auth } from "@/../auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/login");

  return <DashboardPage />;
}
