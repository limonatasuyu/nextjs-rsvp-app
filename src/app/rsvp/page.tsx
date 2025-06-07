import { RSVPPage } from "@/components/page/rsvp";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <RSVPPage />
    </Suspense>
  );
}
