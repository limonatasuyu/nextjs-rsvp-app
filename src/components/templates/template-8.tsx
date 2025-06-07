import React, { useState } from "react";
import { EventData } from "../page/dashboard/types";

export default function Template({ data }: { data: EventData }) {
  const [note, setNote] = useState("");

  const handleClick = (response: string) => {
    alert(`Response: ${response}\nMessage: ${note}`);
    console.log("Response:", response);
    console.log("Message:", note);
  };

  return (
    <div
      className="bg-gray-950 text-white min-h-screen flex items-center justify-center px-6"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="bg-gray-900 p-10 rounded-3xl max-w-lg w-full shadow-2xl animate-fadeIn">
        <h1 className="text-4xl font-semibold text-white text-center mb-4">{data.eventTitle}</h1>
        {data.eventDescription && <p className="text-center text-gray-400 mb-8">{data.eventDescription}</p>}

        <div className="flex flex-col gap-3">
          <button
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition duration-300"
            onClick={() => handleClick("Attending ✔️")}
          >
            Attending ✔️
          </button>
          {data.collectMaybeData && (
            <button
              className="w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition duration-300"
              onClick={() => handleClick("Not Sure 🤷‍♂️")}
            >
              Not Sure 🤷‍♂️
            </button>
          )}
          {data.collectNotComingData && (
            <button
              className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium transition duration-300"
              onClick={() => handleClick("Can't Make It ❌")}
            >
              Can&apos;t Make It ❌
            </button>
          )}
        </div>

        {data.collectNote && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Add your name or comment..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Tailwind animation config for fadeIn */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
