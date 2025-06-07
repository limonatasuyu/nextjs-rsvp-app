import React, { useState } from "react";
import { EventData } from "../page/dashboard/types";

export default function Template({ data }: { data: EventData }) {
  const [note, setNote] = useState("");

  const handleSubmit = (response: string) => {
    alert(`Response: ${response}\nNote: ${note}`);
    console.log("Response:", response);
    console.log("Note:", note);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-gray-900 font-sans"
      style={{
        background: "linear-gradient(to bottom right, #fcd34d, #f87171)",
      }}
    >
      <div className="bg-white/90 shadow-2xl backdrop-blur-sm rounded-3xl p-8 max-w-md w-full text-center space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="./banner.jpg"
            alt="Party Banner"
            className="rounded-2xl shadow-md w-full h-40 object-cover mb-4"
          />
          <h1 className="text-3xl font-bold text-red-600">{data.eventTitle}</h1>
          {data.eventDescription && <p className="text-sm text-gray-600 mt-2">{data.eventDescription}</p>}
        </div>

        <div className="space-y-3">
          <button
            className="w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition"
            onClick={() => handleSubmit("Yes, I'm in! 🎉")}
          >
            Yes, I&apos;m in! 🎉
          </button>
          {data.collectMaybeData && (
            <button
              className="w-full py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition"
              onClick={() => handleSubmit("Maybe 🤔")}
            >
              Maybe 🤔
            </button>
          )}
          {data.collectNotComingData && (
            <button
              className="w-full py-3 rounded-full bg-gray-400 hover:bg-gray-500 text-white font-semibold transition"
              onClick={() => handleSubmit("Sorry, can't make it 🚫")}
            >
              Sorry, can&apos;t make it 🚫
            </button>
          )}
        </div>

        {data.collectNote && (
          <input
            type="text"
            placeholder="Leave a note 🎁"
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}

      </div>
    </div>
  );
}
