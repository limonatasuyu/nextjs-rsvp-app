import { useToast } from "@/contexts/toast-context";
import { useCallback, useState } from "react";

export function useDeleteAttendee({ onDelete }: { onDelete?: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  const deleteAttendee = useCallback(
    (attendeeId: string, token: string) => {
      setLoading(true);
      const makeRequest = async () => {
        try {
          const response = await fetch("/api/event/attendee", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, attendeeId }),
          });

          setLoading(false);
          if (!response.ok) {
            setError("Something went wrong");
            showToast("Failed to delete attendee", "error");
            return;
          }
          showToast("Attendee deleted successfully", "success");
          onDelete?.();
        } catch (error) {
          setLoading(false);
          setError(error instanceof Error ? error.message : "An unexpected error occurred");
          showToast(error instanceof Error ? error.message : "An unexpected error occurred", "error");
          console.error("Error deleting attendee:", error);
        }
      };
      makeRequest();
    },
    [onDelete, showToast]
  );

  return { deleteAttendee, error, loading };
}
