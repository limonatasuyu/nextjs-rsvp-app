import Image from "next/image";

export function ShareRSVP({ templateId }: { templateId: number | null }) {
  if (!templateId) {
    return <div className="text-center text-red-500">No template selected.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-4">Share Your RSVP Page</h2>
      <p className="mb-4">Use the link below to share your RSVP page with guests:</p>
      <input
        type="text"
        readOnly
        value={`https://yourdomain.com/rsvp/${templateId}`}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(`https://yourdomain.com/rsvp/${templateId}`)}
        className="cursor-pointer bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition"
      >
        Copy Link
      </button>
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
