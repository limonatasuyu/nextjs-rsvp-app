import { EventData } from "@/components/page/events/types";
import { useEffect, useState } from "react";

export function useEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch("/api/rsvp/pages");
      const data = await response.json();
      if (!data) return;
      setEvents(data);
      setLoading(false);
    };

    fetchPages();
  }, []);

  return { events, loading };
}
