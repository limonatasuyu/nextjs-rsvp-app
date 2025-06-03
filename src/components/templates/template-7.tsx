import React, { useState } from "react";

export default function Template() {

  const [note, setNote] = useState("");

  const handleSubmit = (response: string) => {
    alert(`Response: ${response}\nMessage: ${note}`);
    console.log("Response:", response);
    console.log("Message:", note);
  };

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
        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-md mb-4">ANOTHER ONE 🔥</h1>
        <p className="text-xl text-gray-300 mb-8">
          You're invited to the most legendary night of the year. DJ Khaled style. No excuses.
        </p>

        <div className="flex flex-col gap-4">
          <button
            className="py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-bold rounded-xl uppercase tracking-wide transition"
            onClick={() => handleSubmit("We the best ✅")}
          >
            We the best ✅
          </button>
          <button
            className="py-3 bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold rounded-xl uppercase tracking-wide transition"
            onClick={() => handleSubmit("Might pull up 🤔")}
          >
            Might pull up 🤔
          </button>
          <button
            className="py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-xl uppercase tracking-wide transition"
            onClick={() => handleSubmit("Not this time ❌")}
          >
            Not this time ❌
          </button>
        </div>

        <input
          type="text"
          placeholder="Say something legendary..."
          className="mt-6 w-full px-4 py-3 text-black border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <p className="text-sm text-gray-400 mt-6 italic">
          Dress fresh. Come hungry. Win big. Major key alert. 🔑
        </p>
      </div>
    </div>
  );
};
