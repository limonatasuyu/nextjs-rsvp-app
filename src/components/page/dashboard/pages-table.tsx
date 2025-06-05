import { useModal } from "@/hooks/use-modal";
import React from "react";
import { ViewEventDetailsModal } from "./view-event-details-modal";
import { EditEventDetailsModal } from "./edit-event-details-modal";
import { EventData } from "./types";
import { DeleteEventModal } from "./delete-event-modal";

type Props = {
  data: EventData[];
};

const EventDataGrid: React.FC<Props> = ({ data }) => {
  const headers = [
    "Show Attending Count",
    "Event Description",
    "Collect Not Coming Data",
    "Show Attendees",
    "Template ID",
    "Collect Maybe Data",
    "Minimum Age Requirement",
    "Event Title",
    "Collect Note",
    "Age Restricted",
    "Attendee Count",
    "Actions",
  ];
  const { closeModal, openModal, ModalRenderer } = useModal();

  const handleEdit = (row: EventData) => {
    openModal(<EditEventDetailsModal eventData={row} />, "Edit Event Details");
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
              <td className="px-4 py-2 border-b">{row.showAttendingCount ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.eventDescription}</td>
              <td className="px-4 py-2 border-b">{row.collectNotComingData ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.showAttendees ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.templateId}</td>
              <td className="px-4 py-2 border-b">{row.collectMaybeData ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.minimumAgeRequirement}</td>
              <td className="px-4 py-2 border-b">{row.eventTitle}</td>
              <td className="px-4 py-2 border-b">{row.collectNote ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.ageRestricted ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b">{row.attendeeCount ?? 0}</td>
              <td className="px-4 py-2 border-b space-x-2">
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
        </tbody>
      </table>
      <ModalRenderer />
    </div>
  );
};

export default EventDataGrid;
