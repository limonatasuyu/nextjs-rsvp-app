import { useEffect, useState } from "react";

interface Attendee {
  id: string;
  title: string;
  name: string;
  age?: number;
  preference: "yes" | "maybe" | "not-coming";
}

export function useAttendees({ eventToken }: { eventToken: string }) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/attendees?eventToken=${eventToken}`);
        if (!response.ok) {
          throw new Error("Failed to fetch attendees");
        }
        const data = await response.json();
        setAttendees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [eventToken]);
  return { attendees, loading, error };
}
