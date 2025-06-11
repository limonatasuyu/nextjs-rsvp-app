import { EventData } from "../types";
import { modalFields } from "../mock";

export function ViewEventModal({ eventData }: { eventData: EventData }) {


  return (
    <div className="space-y-4 grid grid-cols-6 gap-4">
      {modalFields.map((field) => (
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