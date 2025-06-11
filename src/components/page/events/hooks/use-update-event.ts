import { useCallback, useState } from "react";
import { EventData } from "../types";

export function useUpdateEvent({ refetch }: { refetch: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateEvent = useCallback((eventData: EventData) => {
    const makeRequest = async () => {
      try {
        const response = await fetch("/api/event", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });
        if (!response.ok) {
          throw new Error("Failed to change event data");
        }
        const data = await response.json();
        setLoading(false);
        setError(null);
        refetch();
        return data;
      } catch (error) {
        setError("Failed to change event data");
        console.error("Error changing event data:", error);
        throw error;
      }
    };
    setLoading(true);
    setError(null);
    return makeRequest();
  }, []);

  return { updateEvent, loading, error };
}
