import React, { useState } from "react";

export default function Template() {
  const [message, setMessage] = useState("");

  const handleSubmit = (response: string) => {
    alert(`Response: ${response}\nMessage: ${message}`);
    console.log("Response:", response);
    console.log("Message:", message);
  };

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
        <h1 className="text-4xl font-extrabold text-orange-500">🌴 Summer Bash 2025!</h1>
        <p className="text-lg text-gray-700 mt-2">Join us for sunshine, music, and fun under the sun!</p>

        <div className="mt-6 flex flex-col gap-4">
          <button
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition duration-300"
            onClick={() => handleSubmit("I'm In! 🍉")}
          >
            I'm In! 🍉
          </button>
          <button
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full transition duration-300"
            onClick={() => handleSubmit("Thinking About It 🏖️")}
          >
            Thinking About It 🏖️
          </button>
          <button
            className="w-full py-3 bg-red-400 hover:bg-red-500 text-white font-bold rounded-full transition duration-300"
            onClick={() => handleSubmit("Can't Make It 😎")}
          >
            Can't Make It 😎
          </button>
        </div>

        <input
          type="text"
          placeholder="Leave a fun message 🌺"
          className="mt-6 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <p className="text-xs text-gray-500 mt-4">Bikinis optional. Good vibes required.</p>
      </div>
    </div>
  );
}
