import { EventData } from "@/components/page/events/types";
import { useToast } from "@/contexts/toast-context";
import { useCallback, useEffect, useState } from "react";

export function useEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchPages = useCallback(async () => {
    const response = await fetch("/api/events");
    try {
      const data = await response.json();
      if (!data) return;
      const formattedData: EventData[] = data.map((item: EventData) => ({
        ...item,
        attendeeCount: item.attendees?.length ?? 0,
        attendees: item.attendees ?? [],
      }));
      setEvents(formattedData);
      setLoading(false);
      showToast("Events fetched successfully", "success");
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("Failed to fetch events", "error");
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, []);

  return { events, loading, refetch: fetchPages };
}
