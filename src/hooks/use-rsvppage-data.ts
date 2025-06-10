import { EventData } from "@/components/page/events/types";
import { useEffect, useState } from "react";

export function useRSVPPageData({ token }: { token: string | null }) {
  const [data, setData] = useState<EventData | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/rsvp?token=${token}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return { data, isLoading };
}
