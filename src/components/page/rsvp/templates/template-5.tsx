import { useUserResponse } from "../hooks/use-user-response";
import { AttendeeInfoForm } from "../attendee-info-form";
import { TemplateProps } from "../types";

export default function Template({ data }: TemplateProps) {
  const { response, handleSubmit, message, setMessage } = useUserResponse();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-white/60 text-gray-900"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1608889175661-3c9b1a3e2fdc?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-lg w-full space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-800">{data.eventTitle}</h1>
        {data.eventDescription && (
          <p className="text-center text-gray-600 text-lg">{data.eventDescription}</p>
        )}

        {response ? (
          <AttendeeInfoForm
            preference={response}
            eventToken={data.token}
            ageRestricted={data.ageRestricted}
            minimumAgeRequirement={data.minimumAgeRequirement}
            showAttendees={data.showAttendees}
            showAttendingCount={data.showAttendingCount}
            attendeeCount={data.attendeeCount}
          />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <button
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
                onClick={() => handleSubmit("yes")}
              >
                I&apos;m Coming! ☃️
              </button>
              {data.collectMaybeData && (
                <button
                  className="w-full py-3 bg-indigo-300 hover:bg-indigo-400 text-white font-semibold rounded-xl transition"
                  onClick={() => handleSubmit("maybe")}
                >
                  Maybe 🌨️
                </button>
              )}
              {data.collectNotComingData && (
                <button
                  className="w-full py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-xl transition"
                  onClick={() => handleSubmit("not-coming")}
                >
                  Can&apos;t Make It ❌
                </button>
              )}
            </div>

            {data.collectNote && (
              <input
                type="text"
                placeholder="Leave a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
