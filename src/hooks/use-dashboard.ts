import { EventData } from "@/components/page/dashboard/types";
import { useEffect, useState } from "react";

export function useDashboard() {
  const [pages, setPages] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch("/api/rsvp/pages");
      const data = await response.json();
      if (!data) return;
      setPages(data);
      setLoading(false);
    };

    fetchPages();
  }, []);

  return { pages, loading };
}
