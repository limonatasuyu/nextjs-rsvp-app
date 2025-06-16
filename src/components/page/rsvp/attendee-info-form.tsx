import { useActionState } from "react";
import { saveAttendee } from "@/actions/save-attendee";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { OtherAttendees } from "./other-attendees";

const titles = [
  "Mr.",
  "Mrs.",
  "Ms.",
  "Miss",
  "Mx.",
  "Dr.",
  "Prof.",
  "Rev.",
  "Fr.",
  "Rabbi",
  "Imam",
  "Sir",
  "Dame",
  "Hon.",
  "Capt.",
  "Major",
  "Lt.",
  "Col.",
  "Gen.",
  "President",
  "Chancellor",
  "Amb.",
  "Justice",
  "Sheikh",
  "Ayatollah",
  "Cardinal",
  "Bishop",
];

const initialState = {
  error: "",
  success: false,
};

type AttendeeFormProps = {
  preference: "yes" | "maybe" | "not-coming";
  eventToken: string;
  note?: string;
  ageRestricted: boolean;
  minimumAgeRequirement?: number;
  showAttendees: boolean;
};

export function AttendeeInfoForm({
  preference,
  eventToken,
  note,
  ageRestricted,
  minimumAgeRequirement,
  showAttendees,
}: AttendeeFormProps) {
  const [state, formAction, isPending] = useActionState(saveAttendee, initialState);
  if (state.success) {
    return (
      <div>
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">Your response has been saved.</span>
        </div>
        {showAttendees && <OtherAttendees eventToken={eventToken} />}
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-semibold text-center">Attendee Information</h2>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="eventToken" value={eventToken} />
        <input type="hidden" name="preference" value={preference} />
        <input type="hidden" name="note" value={note} />
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <select
            id="title"
            name="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select title</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="tel"
            name="tel"
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your phone number"
            required
          />
        </div>
        {ageRestricted && (
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min={minimumAgeRequirement}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your age"
              required
            />
          </div>
        )}
        <button
          disabled={isPending}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Submit Information {isPending && <LoadingSpinner className="size-5 ml-2" />}
        </button>
      </form>
    </div>
  );
}
