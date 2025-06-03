import { CreatePage } from "@/components/page/create";
import { use } from "react";
import { auth } from "@/../auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/login");

  return <CreatePage />;
}
