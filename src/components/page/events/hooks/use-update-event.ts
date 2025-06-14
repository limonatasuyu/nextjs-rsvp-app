import { useCallback, useState } from "react";
import { EventData } from "../types";
import { useToast } from "@/contexts/toast-context";

export function useUpdateEvent({ refetch }: { refetch: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

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
        showToast("Event data updated successfully", "success");
        return data;
      } catch (error) {
        setLoading(false);
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
        showToast(error instanceof Error ? error.message : "An unexpected error occurred", "error");
        throw error;
      }
    };
    setLoading(true);
    setError(null);
    return makeRequest();
  }, []);

  return { updateEvent, loading, error };
}
