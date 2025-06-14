import { useAttendees } from "./use-attendees";

export function OtherAttendees({ eventToken }: { eventToken: string }) {
  const { attendees, loading, error } = useAttendees({ eventToken });
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 mt-12">Other Attendees</h2>
      {error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          <p>Error loading other attendees</p>
        </div>
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <th className="px-4 py-2 border-b border-gray-300 text-left">Title</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Name</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Age</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Coming</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {attendees.map((attendee, index) => (
                <tr key={attendee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border-b">{attendee.title}</td>
                  <td className="px-4 py-2 border-b">{attendee.name}</td>
                  <td className="px-4 py-2 border-b">{attendee.age ?? "-"}</td>
                  <td className="px-4 py-2 border-b capitalize">{attendee.preference}</td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    Loading attendees...
                  </td>
                </tr>
              )}
              {!attendees.length && !loading && (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No attendees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
