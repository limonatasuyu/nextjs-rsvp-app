import { EventData } from "../page/events/types";
import { AttendeeInfoForm } from "./attendee-info-form";
import { useUserResponse } from "./use-user-response";
import Image from "next/image";

export default function Template({ data }: { data: EventData }) {
  const { response, handleSubmit, message, setMessage } = useUserResponse();

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white text-gray-800 min-h-screen">
      {/* Header */}
      <header className="relative w-full h-[18rem] flex items-center justify-center overflow-hidden">
        <Image
          fill
          src="/themes/images/banner.jpg"
          alt="Winter Banner"
          className="absolute w-full h-full object-cover brightness-75"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white z-10 drop-shadow-md">
          {data.eventTitle}
        </h1>
      </header>

      {/* RSVP Section */}
      <main className="max-w-2xl mx-auto mt-12 px-6 flex flex-col items-center text-center gap-8">
        {data.eventDescription && (
          <h2 className="text-2xl font-semibold text-gray-700">{data.eventDescription}</h2>
        )}

        {response ? (
          <AttendeeInfoForm
            preference={response}
            eventToken={data.token}
            ageRestricted={data.ageRestricted}
            minimumAgeRequirement={data.minimumAgeRequirement}
            showAttendees={data.showAttendees}
          />
        ) : (
          <div className="w-full bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
            <button
              onClick={() => handleSubmit("yes")}
              className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300"
            >
              Absolutely! 🎉
            </button>
            {data.collectMaybeData && (
              <button
                onClick={() => handleSubmit("maybe")}
                className="w-full py-3 rounded-lg bg-blue-300 hover:bg-blue-400 text-white font-medium transition-all duration-300"
              >
                Might be late ⏰
              </button>
            )}
            {data.collectNotComingData && (
              <button
                onClick={() => handleSubmit("not-coming")}
                className="w-full py-3 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-medium transition-all duration-300"
              >
                Can&apos;t make it 😔
              </button>
            )}
            {data.collectNote && (
              <input
                type="text"
                placeholder="Leave a note or your name..."
                className="mt-2 py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        © 2025 Kristmıs Celebration. All rights reserved.
      </footer>
    </div>
  );
}
