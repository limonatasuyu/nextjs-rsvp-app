import { useState } from "react";
import { useCallback } from "react";

export function useDeleteEvent({ token, onDelete }: { token: string, onDelete?: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteEvent = useCallback(() => {
    setLoading(true);
    const makeRequest = async () => {
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
        return;
      }
      onDelete?.();
    };
    makeRequest();
  }, [token]);

  return { deleteEvent, error, loading };
}
