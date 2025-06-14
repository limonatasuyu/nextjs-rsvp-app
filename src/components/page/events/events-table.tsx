import { useModal } from "@/hooks/use-modal";
import React from "react";
import { ViewEventModal } from "./view-event/view-event-modal";
import { EditEventModal } from "./edit-event/edit-event-modal";
import { EventData } from "./types";
import { DeleteEventModal } from "./delete-event-modal";
import Link from "next/link";
import { useUpdateEvent } from "./hooks/use-update-event";

export function EventsTable({
  data,
  loading,
  refetchData,
}: {
  data: EventData[];
  loading: boolean;
  refetchData: () => void;
}) {
  const headers = [
    "Event Title",
    "Event Description",
    "Age Restricted",
    "Minimum Age Requirement",
    "Show Attending Count",
    "Collect Not Coming Data",
    "Show Attendees",
    "Collect Maybe Data",
    "Collect Note",
    "Attendee Count",
    "Actions",
  ];
  const { closeModal, openModal, ModalRenderer } = useModal();
  const { updateEvent, loading: updateLoading } = useUpdateEvent({ refetch: refetchData });

  const handleEdit = (row: EventData) => {
    openModal(
      <EditEventModal
        eventData={row}
        closeModal={closeModal}
        updateEvent={updateEvent}
        updateLoading={updateLoading}
      />,
      "Edit Event Details"
    );
  };
  const handleView = (row: EventData) => {
    openModal(
      <ViewEventModal eventData={row} closeModal={closeModal} refetchData={refetchData} />,
      "View Event Details"
    );
  };
  const handleDelete = (row: EventData) => {
    openModal(
      <DeleteEventModal eventData={row} closeModal={closeModal} refetchData={refetchData} />,
      "Delete Event"
    );
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-2 border-b border-gray-300 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-2">{row.eventTitle}</td>
              <td className="px-4 py-2">{row.eventDescription}</td>
              <td className="px-4 py-2">{row.ageRestricted ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{row.minimumAgeRequirement}</td>
              <td className="px-4 py-2">{row.showAttendingCount ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{row.collectNotComingData ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{row.showAttendees ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{row.collectMaybeData ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{row.collectNote ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{row.attendeeCount ?? 0}</td>
              <td className="px-4 py-2 flex justify-start gap-2">
                <button
                  onClick={() => handleEdit(row)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                >
                  🖊️ Edit
                </button>
                <button
                  onClick={() => handleDelete(row)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => handleView(row)}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded"
                >
                  👁️ View
                </button>
              </td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={headers.length} className="text-center py-4">
                Loading events...
              </td>
            </tr>
          )}
          {!data.length && !loading && (
            <>
              <tr>
                <td colSpan={headers.length} className="text-center py-4">
                  No events found.
                </td>
              </tr>
              <tr>
                <td colSpan={headers.length} className="text-center py-4">
                  <Link
                    href="/create"
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                  >
                    ➕ Create Event
                  </Link>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <ModalRenderer />
    </div>
  );
}
