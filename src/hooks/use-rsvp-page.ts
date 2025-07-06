import { Attendee, EventData } from "@/components/page/events/types";
import { useEffect, useState } from "react";

export function useRSVPPage({ token }: { token: string | null }) {
  const [data, setData] = useState<EventData | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/event?token=${token}`);
        const data = await response.json();
        const formattedData: Record<string, boolean | string | Attendee[]> = {};
        Object.entries(data).forEach(([key, value]) => {
          if (value !== "true" && value !== "false") {
            formattedData[key] = value as string | boolean | Attendee[];
          } else {
            formattedData[key] = value === "true";
          }
        });
        setData(formattedData as unknown as EventData);
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
