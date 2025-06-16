"use client";

import { useRSVPPage } from "@/hooks/use-rsvp-page";
import { useSearchParams } from "next/navigation";
import Template1 from "@/components/page/rsvp/templates/template-1";
import Template2 from "@/components/page/rsvp/templates/template-2";
import Template3 from "@/components/page/rsvp/templates/template-3";
import Template4 from "@/components/page/rsvp/templates/template-4";
import Template5 from "@/components/page/rsvp/templates/template-5";
import Template6 from "@/components/page/rsvp/templates/template-6";
import Template7 from "@/components/page/rsvp/templates/template-7";
import Template8 from "@/components/page/rsvp/templates/template-8";
import { TemplateType } from "@/components/page/rsvp/types";

export function RSVPPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data, isLoading } = useRSVPPage({ token });

  const templates: { [key: number]: null | TemplateType } = {
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
  const Template = templates[templateId + 1 as keyof typeof templates] ?? null;
  if (!token) {
    return <div>Invalid token</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
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
