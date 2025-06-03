import { useEffect, useState } from "react";

interface IRSVPPageData {
  templateId: string;
  // Add other properties as needed
}

export function useRSVPPageData({ token }: { token: string }) {
  const [data, setData] = useState<IRSVPPageData | null>(null);

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
