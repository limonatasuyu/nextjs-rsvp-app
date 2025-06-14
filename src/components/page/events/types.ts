export type Attendee = {
  email: string;
  id: string;
  name: string;
  note: string;
  preference: "yes" | "maybe" | "not-coming";
  age?: string;
  tel: string;
  title: string;
};

export type EventData = {
  attendees: Attendee[];
  showAttendingCount: string;
  token: string;
  eventDescription: string;
  collectNotComingData: boolean;
  showAttendees: boolean;
  templateId: number;
  collectMaybeData: boolean;
  minimumAgeRequirement: number;
  eventTitle: string;
  collectNote: boolean;
  ageRestricted: boolean;
  attendeeCount?: number;
};
