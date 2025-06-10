"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EventData } from "./types";
import { useDeleteEvent } from "@/hooks/use-delete-event";

export function DeleteEventModal({
  eventData,
  closeModal,
}: {
  eventData: EventData;
  closeModal: () => void;
}) {
  const { deleteEvent, loading, error } = useDeleteEvent({ token: eventData.token });

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
        <button
          disabled={loading}
          onClick={deleteEvent}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete {loading && <LoadingSpinner className="size-5 ml-2"/>}
        </button>
        <button
          disabled={loading}
          onClick={closeModal}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
