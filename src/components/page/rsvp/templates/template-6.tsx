import { AttendeeInfoForm } from "../attendee-info-form";
import { useUserResponse } from "../hooks/use-user-response";
import { TemplateProps } from "../types";

export default function Template({ data }: TemplateProps) {
  const { response, handleSubmit, message, setMessage } = useUserResponse();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-yellow-50/80 text-gray-900"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-orange-500">{data.eventTitle}</h1>
        {data.eventDescription && <p className="text-lg text-gray-700 mt-2">{data.eventDescription}</p>}

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
            <div className="mt-6 flex flex-col gap-4">
              <button
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition duration-300"
                onClick={() => handleSubmit("yes")}
              >
                I&apos;m In! 🍉
              </button>
              {data.collectMaybeData && (
                <button
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full transition duration-300"
                  onClick={() => handleSubmit("maybe")}
                >
                  Thinking About It 🏖️
                </button>
              )}
              {data.collectNotComingData && (
                <button
                  className="w-full py-3 bg-red-400 hover:bg-red-500 text-white font-bold rounded-full transition duration-300"
                  onClick={() => handleSubmit("not-coming")}
                >
                  Can&apos;t Make It 😎
                </button>
              )}
            </div>
            {data.collectNote && (
              <input
                type="text"
                placeholder="Leave a fun message 🌺"
                className="mt-6 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
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
