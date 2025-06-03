import React, { useState } from "react";

export default function Template() {
  const [note, setNote] = useState("");

  const handleSubmit = (response: string) => {
    alert(`Response: ${response}\nMessage: ${note}`);
    console.log("Response:", response);
    console.log("Message:", note);
  };

  return (
    <div className="bg-pink-50 text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Banner Section */}
      <section className="bg-gradient-to-r from-red-300 via-pink-300 to-yellow-200 py-12 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">You're Invited! 🎄</h1>
        <p className="mt-4 text-lg text-white font-light">Celebrate Kristmıs with us in style</p>
      </section>

      {/* RSVP Card */}
      <section className="flex justify-center mt-10 px-4">
        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Can you make it?</h2>

          <div className="flex flex-col gap-4">
            <button
              className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full transition"
              onClick={() => handleSubmit("Count me in! 🎉")}
            >
              Count me in! 🎉
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full transition"
              onClick={() => handleSubmit("Still deciding 🤔")}
            >
              Still deciding 🤔
            </button>
            <button
              className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full transition"
              onClick={() => handleSubmit("Can't come 😢")}
            >
              Can't come 😢
            </button>
          </div>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Your name or message..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-300 outline-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-gray-500">
        ❄️ Made with love for Kristmıs 2025 ❄️
      </footer>
    </div>
  );
}
