import { EventData } from "./types";

export function ViewEventDetailsModal({ eventData }: { eventData: EventData }) {
  const fields = [
    { key: "eventTitle", name: "Event Title" },
    { key: "eventDescription", name: "Event Description" },
    { key: "token", name: "Page Link" },
    { key: "showAttendingCount", name: "Show Attending Count" },
    { key: "showAttendees", name: "Show Attendees" },
    { key: "attendees", name: "Attendees" },
    { key: "notComing", name: "Not Coming" },
    { key: "ageRestricted", name: "Age Restricted" },
    { key: "collectNote", name: "Collect Note" },
    { key: "collectMaybeData", name: "Collect Maybe Coming" },
    { key: "collectNotComingData", name: "Collect Not Coming" },
    { key: "minimumAgeRequirement", name: "Minimum Age Requirement" },
    { key: "templateId", name: "Template" },
  ];

  return (
    <div className="space-y-4 grid grid-cols-6 gap-4">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">{field.name}</label>
          <input
            type="text"
            disabled
            value={
              typeof eventData?.[field.key as keyof typeof eventData] === "boolean"
                ? eventData[field.key as keyof typeof eventData]
                  ? "Yes"
                  : "No"
                : (eventData?.[field.key as keyof typeof eventData] ?? "").toString()
            }
            className="bg-gray-100 text-gray-800 px-3 py-2 border border-gray-300 rounded-md disabled:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}