import { useModal } from "@/hooks/use-modal";
import React from "react";
import { ViewEventDetailsModal } from "./view-event-details-modal";
import { EditEventDetailsModal } from "./edit-event/edit-event-details-modal";
import { EventData } from "./types";
import { DeleteEventModal } from "./delete-event-modal";

function isStringTrue(value: string): boolean {
  return value.toLowerCase() === "true";
}

export function EventsTable({ data, loading }: { data: EventData[], loading: boolean }) {
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

  const handleEdit = (row: EventData) => {
    openModal(<EditEventDetailsModal eventData={row} closeModal={closeModal} />, "Edit Event Details");
  };
  const handleView = (row: EventData) => {
    openModal(<ViewEventDetailsModal eventData={row} />, "View Event Details");
  };
  const handleDelete = (row: EventData) => {
    openModal(<DeleteEventModal eventData={row} closeModal={closeModal} />, "Delete Event");
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
              <td className="px-4 py-2 border-b">{row.eventTitle}</td>
              <td className="px-4 py-2 border-b">{row.eventDescription}</td>
              <td className="px-4 py-2 border-b">{isStringTrue(row.ageRestricted) ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.minimumAgeRequirement}</td>
              <td className="px-4 py-2 border-b">{isStringTrue(row.showAttendingCount) ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{isStringTrue(row.collectNotComingData) ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{isStringTrue(row.showAttendees) ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{isStringTrue(row.collectMaybeData) ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{isStringTrue(row.collectNote) ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.attendeeCount ?? 0}</td>
              <td className="px-4 py-2 border-b flex justify-start gap-2">
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
                  <a
                    href="/create"
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                  >
                    ➕ Create Event
                  </a>
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
