"use client";

import { EventData } from "./types";

export function DeleteEventModal({ eventData }: { eventData: EventData }) {
  const link = "/rsvp?token=" + eventData.token;
  return (
    <div>
      <h3>This action is not reversable</h3>
      <p>
        Are you sure you want to delete the event in{" "}
        <a className="text-blue-500 hover:text-blue-300" href={link} target="_blank">
          here
        </a>
      </p>
      <div className="flex justify-between mt-6">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2">
          Delete
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
          Cancel
        </button>
      </div>
    </div>
  );
}
