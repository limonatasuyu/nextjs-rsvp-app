import { useModal } from "@/hooks/use-modal";
import { useDeleteAttendee } from "../hooks/use-delete-attendee";
import { Attendee } from "../types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ViewAttendeesModal({
  closeModal,
  attendees,
  eventToken,
  refetchData,
}: {
  closeModal: () => void;
  attendees: Attendee[];
  eventToken: string;
  refetchData: () => void;
}) {
  const { openModal, closeModal: closeInnerModal, ModalRenderer } = useModal();
  const { deleteAttendee, loading } = useDeleteAttendee({
    onDelete: () => {
      closeInnerModal();
      refetchData();
      closeModal();
    },
  });

  const handleDeleteAttendee = (attendeeId: string) => {
    console.log("Deleting attendee with ID:", attendeeId);
    openModal(
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Delete Attendee</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this attendee? This action is not reversable.
        </p>
        <div className="flex justify-end">
          <button
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition mr-2"
            onClick={() => deleteAttendee(attendeeId, eventToken)}
          >
            Delete {loading && <LoadingSpinner className="size-5 ml-2" />}
          </button>
          <button
            disabled={loading}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            onClick={closeInnerModal}
          >
            Cancel
          </button>
        </div>
      </div>,
      "Delete Attendee"
    );
  };
  return (
    <>
      <ModalRenderer />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Attendees</h2>
        <p className="text-gray-600 mb-4">List of attendees for the event will be displayed here.</p>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <th className="px-4 py-2 border-b border-gray-300 text-left">Title</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Name</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Email</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Tel</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Age</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Preference</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Note</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {attendees.map((attendee, index) => (
                <tr key={attendee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{attendee.title}</td>
                  <td className="px-4 py-2">{attendee.name}</td>
                  <td className="px-4 py-2">{attendee.email}</td>
                  <td className="px-4 py-2">{attendee.tel}</td>
                  <td className="px-4 py-2">{attendee.age ?? "-"}</td>
                  <td className="px-4 py-2 capitalize">{attendee.preference}</td>
                  <td className="px-4 py-2">{attendee.note}</td>
                  <td className="px-4 py-2 flex justify-start gap-2">
                    <button
                      onClick={() => handleDeleteAttendee(attendee.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!attendees.length && (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No attendees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
