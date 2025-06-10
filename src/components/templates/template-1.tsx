import React, { useState } from "react";
import { EventData } from "../page/events/types";

export default function Template({ data }: { data: EventData }) {
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (choice: string) => {
    setResponse(choice);
    // For demo: Log the response and message
    console.log("RSVP Response:", choice);
    console.log("Message:", message);
    console.log("response: ", response)
    alert(`Thanks for your response: "${choice}"\nMessage: "${message}"`);
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      {/* Banner */}
      <div className="w-full max-h-[20rem] flex justify-center items-center overflow-hidden relative text-center">
        <img className="w-full object-cover h-[20rem] brightness-50" src="./banner.jpg" alt="Banner Image" />
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          {data.eventTitle}
        </h1>
      </div>

      {/* RSVP Section */}
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center gap-8">
        {data.eventDescription && (
          <h2 className="text-2xl md:text-3xl font-semibold text-center">{data.eventDescription}</h2>
        )}

        <div className="flex flex-col gap-4 bg-white shadow-xl rounded-2xl p-6 max-w-md w-full">
          <button
            className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition duration-300"
            onClick={() => handleSubmit("Yes 😀")}
          >
            Yes 😀
          </button>
          {data.collectMaybeData && (
            <button
              className="py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-medium transition duration-300"
              onClick={() => handleSubmit("Maybe 🤔")}
            >
              Maybe 🤔
            </button>
          )}
          {data.collectNotComingData && (
            <button
              className="py-3 px-6 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition duration-300"
              onClick={() => handleSubmit("No 🚫")}
            >
              No 🚫
            </button>
          )}

          {data.collectNote && (
            <input
              type="text"
              placeholder="Leave a message..."
              className="mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
