"use server";

import { IAttendee } from "@/components/templates/attendee-info-form";
import { saveAttendeeByToken } from "@/lib/db/rsvp-logic";

export async function saveAttendee(prevState: { error: string; success: boolean }, formData: FormData) {
  const data: IAttendee = {
    eventToken: formData.get("eventToken") as string,
    preference: formData.get("preference") as "yes" | "maybe" | "not-coming",
    note: formData.get("note") as string,
    title: formData.get("title") as string,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    tel: formData.get("tel") as string,
    age: (formData.get("age") as number | null) ?? undefined,
  };
  return saveAttendeeByToken(data);
}
