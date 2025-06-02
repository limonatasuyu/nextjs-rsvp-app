import { LoginPage } from "@/components/page/login";
import { use } from "react";
import { auth } from "@/../auth";
import { redirect } from "next/navigation";

//type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  //params: Params;
  searchParams: SearchParams;
}) {
  const session = await auth();
  if (session) redirect("/");

  const searchParams = use(props.searchParams);
  return <LoginPage searchParams={searchParams} />;
}
