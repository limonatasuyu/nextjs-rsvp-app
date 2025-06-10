import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function ShareRSVP() {
  const searchParams = useSearchParams();
  const templateId = Number(searchParams.get("templateId"));

  async function getToken() {
    const data: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
      data[key] = value;
    }
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to get token");
    }
    const responseJson = await response.json();
    return responseJson.token;
  }

  const [url, setUrl] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (typeof window === "undefined" || url) return;
    (async () => {
      const token = await getToken();
      if (!token) return;
      setUrl(`${window.location.origin}/rsvp?&token=${token}`);
    })();
  }, [templateId, url, setUrl]);

  if (!templateId && templateId !== 0) {
    return <div className="text-center text-red-500">No template selected.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-4">Share Your RSVP Page</h2>
      <p className="mb-4">Use the link below to share your RSVP page with guests:</p>
      <input
        type="text"
        readOnly
        value={url || "Generating link..."}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(url || "")}
        className="cursor-pointer bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition"
      >
        Copy Link
      </button>
      <a href="/events" className="ml-4 text-sm text-gray-500 mt-4">
        Go to dashboard
      </a>
      <div className="w-full flex items-center justify-center mt-8">
        <Image
          src={`/themes/screenshots/template-${templateId}.png`}
          alt="Template"
          width={500}
          height={500}
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
