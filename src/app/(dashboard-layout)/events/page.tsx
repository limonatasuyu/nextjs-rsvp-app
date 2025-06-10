import { EventsPage } from "@/components/page/events";
import { auth } from "@/../auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/login");

  return <EventsPage />;
}
