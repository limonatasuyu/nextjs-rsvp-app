import { SignUpPage } from "@/components/page/signup";
import { auth } from "@/../auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) redirect("/");
  return <SignUpPage />;
}
