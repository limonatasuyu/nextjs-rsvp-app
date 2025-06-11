import { EventData } from "@/components/page/events/types";
import { useCallback, useEffect, useState } from "react";

function isStringTrue(value: string): boolean {
  return value?.toLowerCase?.() === "true";
}
export function useEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = useCallback(async () => {
    const response = await fetch("/api/event");
    const data = await response.json();
    if (!data) return;
    const formattedData: EventData[] = data.map((item: any) => ({
      showAttendingCount: isStringTrue(item.showAttendingCount),
      token: item.token,
      eventDescription: item.eventDescription,
      collectNotComingData: isStringTrue(item.collectNotComingData),
      showAttendees: isStringTrue(item.showAttendees),
      templateId: item.templateId,
      collectMaybeData: isStringTrue(item.collectMaybeData),
      minimumAgeRequirement: item.minimumAgeRequirement,
      eventTitle: item.eventTitle,
      collectNote: isStringTrue(item.collectNote),
      ageRestricted: isStringTrue(item.ageRestricted),
      attendeeCount: item.attendeeCount ?? 0,
    }));
    setEvents(formattedData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPages();
  }, []);

  return { events, loading, refetch: fetchPages };
}
