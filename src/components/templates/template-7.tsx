import { EventData } from "../page/events/types";
import { AttendeeInfoForm } from "./attendee-info-form";
import { useUserResponse } from "./use-user-response";

export default function Template({ data }: { data: EventData }) {
  const { response, handleSubmit, message, setMessage } = useUserResponse();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-black/60 text-white text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1545193544-312c958f7e36?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/70 backdrop-blur-lg shadow-2xl rounded-3xl p-10 max-w-xl w-full border-4 border-yellow-400">
        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-md mb-4">{data.eventTitle}</h1>
        {data.eventDescription && <p className="text-xl text-gray-300 mb-8">{data.eventDescription}</p>}
        {response ? (
          <AttendeeInfoForm
            preference={response}
            eventToken={data.token}
            ageRestricted={data.ageRestricted}
            minimumAgeRequirement={data.minimumAgeRequirement}
            showAttendees={data.showAttendees}
          />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <button
                className="py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-bold rounded-xl uppercase tracking-wide transition"
                onClick={() => handleSubmit("yes")}
              >
                We the best ✅
              </button>
              {data.collectMaybeData && (
                <button
                  className="py-3 bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold rounded-xl uppercase tracking-wide transition"
                  onClick={() => handleSubmit("maybe")}
                >
                  Might pull up 🤔
                </button>
              )}
              {data.collectNotComingData && (
                <button
                  className="py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl uppercase tracking-wide transition"
                  onClick={() => handleSubmit("not-coming")}
                >
                  Not this time ❌
                </button>
              )}
            </div>

            {data.collectNote && (
              <input
                type="text"
                placeholder="Say something legendary..."
                className="mt-6 w-full px-4 py-3 text-black border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
