"use client";

import { useRSVPPageData } from "@/hooks/use-rsvppage-data";
import { useSearchParams } from "next/navigation";
import Template1 from "@/components/templates/template-1";
import Template2 from "@/components/templates/template-2";
import Template3 from "@/components/templates/template-3";
import Template4 from "@/components/templates/template-4";
import Template5 from "@/components/templates/template-5";
import Template6 from "@/components/templates/template-6";
import Template7 from "@/components/templates/template-7";
import Template8 from "@/components/templates/template-8";

export function RSVPPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    return <div>Invalid token</div>;
  }
  const { data, isLoading } = useRSVPPageData({ token });

  const templates: { [key: number]: any } = {
    0: null,
    1: Template1,
    2: Template2,
    3: Template3,
    4: Template4,
    5: Template5,
    6: Template6,
    7: Template7,
    8: Template8,
  };

  const templateId = data?.templateId ? Number(data?.templateId) : 0;
  const Template = templates[templateId as keyof typeof templates] ?? null;

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>{Template ? <Template data={data} /> : <div>Invalid template</div>}</>
      )}
    </>
  );
}
