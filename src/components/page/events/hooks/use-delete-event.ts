import { useToast } from "@/contexts/toast-context";
import { useState } from "react";
import { useCallback } from "react";

export function useDeleteEvent({ token, onDelete }: { token: string; onDelete?: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  const deleteEvent = useCallback(() => {
    setLoading(true);
    const makeRequest = async () => {
      try {
        const response = await fetch("/api/event", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        setLoading(false);
        if (!response.ok) {
          setError("Something went wrong");
          showToast("Failed to delete event", "error");
          return;
        }
        showToast("Event deleted successfully", "success");
        onDelete?.();
      } catch (error) {
        setLoading(false);
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
        showToast(error instanceof Error ? error.message : "An unexpected error occurred", "error");
        console.error("Error deleting event:", error);
      }
    };
    makeRequest();
  }, [token]);

  return { deleteEvent, error, loading };
}
