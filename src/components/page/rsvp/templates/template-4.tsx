import { AttendeeInfoForm } from "../attendee-info-form";
import { useUserResponse } from "../hooks/use-user-response";
import { TemplateProps } from "../types";

export default function Template({ data }: TemplateProps) {
  const { response, handleSubmit, message, setMessage } = useUserResponse();

  return (
    <div className="bg-pink-50 text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <section className="bg-gradient-to-r from-red-300 via-pink-300 to-yellow-200 py-12 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">{data.eventTitle}</h1>
        {data.eventDescription && (
          <p className="mt-4 text-lg text-white font-light">{data.eventDescription}</p>
        )}
      </section>

      <section className="flex justify-center mt-10 px-4">
        {response ? (
          <AttendeeInfoForm
            preference={response}
            eventToken={data.token}
            ageRestricted={data.ageRestricted}
            minimumAgeRequirement={data.minimumAgeRequirement}
            showAttendees={data.showAttendees}
          />
        ) : (
          <div className="bg-white shadow-xl rounded-3xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Can you make it?</h2>

            <div className="flex flex-col gap-4">
              <button
                className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full transition"
                onClick={() => handleSubmit("yes")}
              >
                Count me in! 🎉
              </button>
              {data.collectMaybeData && (
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full transition"
                  onClick={() => handleSubmit("maybe")}
                >
                  Still deciding 🤔
                </button>
              )}
              {data.collectNotComingData && (
                <button
                  className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full transition"
                  onClick={() => handleSubmit("not-coming")}
                >
                  Can&apos;t come 😢
                </button>
              )}
            </div>

            {data.collectNote && (
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Your name or message..."
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-300 outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
