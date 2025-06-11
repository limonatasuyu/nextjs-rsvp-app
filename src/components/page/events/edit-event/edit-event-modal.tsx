import { EventData } from "../types";
import { modalFields } from "../mock";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal";
import Image from "next/image";
import { TemplatePreview } from "./template-preview";
import { ChooseTemplate } from "./choose-template";
import { useCallback, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function EditEventModal({
  eventData,
  closeModal,
  updateEvent,
  updateLoading,
}: {
  eventData: EventData;
  closeModal: () => void;
  updateEvent: (data: EventData) => Promise<void>;
  updateLoading: boolean;
}) {
  const [formData, setFormData] = useState<EventData>(eventData);
  const { openModal, ModalRenderer, closeModal: closeInnerModal } = useModal();
  console.log("formData", formData);
  const changeFormData = (key: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const renderField = useCallback(
    (field: {
      key: string;
      name: string;
      type: string;
      options?: { id: string; name: string; image: string }[];
    }) => {
      const value = formData[field.key as keyof EventData];

      if (field.key === "token") {
        return (
          <div className="flex items-center space-x-2">
            <input
              id={field.key}
              type="text"
              defaultValue={`${window.location.origin}/rsvp?&token=${value}` as string}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              readOnly
            />
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/rsvp?&token=${value}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Copy
            </button>
          </div>
        );
      }

      if (field.type === "text" || field.type === "number") {
        return (
          <input
            id={field.key}
            type={field.type}
            onChange={(e) => changeFormData(field.key, e.target.value)}
            defaultValue={value as string | number}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        );
      }

      if (field.type === "textarea") {
        return (
          <textarea
            id={field.key}
            onChange={(e) => changeFormData(field.key, e.target.value)}
            defaultValue={value as string}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        );
      }

      if (field.type === "switch") {
        return (
          <Switch onClick={() => changeFormData(field.key, !value)} value={value as string} id={field.key} />
        );
      }

      if (field.name === "Template") {
        return (
          <div>
            <Image
              width={400}
              height={200}
              src={`/themes/screenshots/template-${value}.png`}
              alt={field.name}
              className="cursor-pointer w-90 h-auto rounded-lg"
              onClick={() =>
                openModal(<TemplatePreview templateId={value as string} closeModal={closeInnerModal} />)
              }
            />
            <button
              onClick={() =>
                openModal(
                  <ChooseTemplate
                    onChangeTemplate={(newValue) => changeFormData("templateId", String(newValue))}
                    currentTemplateId={value as number}
                    closeModal={closeInnerModal}
                  />
                )
              }
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Change
            </button>
          </div>
        );
      }

      return null;
    },
    [formData, openModal, closeInnerModal]
  );

  const handleCloseModal = () => {
    openModal(
      <div>
        <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
        <p>Are you sure you want to close the modal? Any unsaved changes will be lost.</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            onClick={() => {
              closeInnerModal();
              closeModal();
            }}
          >
            Close
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            onClick={closeInnerModal}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const handleSaveChanges = () => {
    openModal(
      <div>
        <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
        <p>Are you sure to change event details?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            disabled={updateLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            onClick={() => {
              updateEvent(formData).then(() => {
                closeInnerModal();
                closeModal();
              });
            }}
          >
            Save {updateLoading && <LoadingSpinner className="size-5 ml-2" />}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            onClick={closeInnerModal}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ModalRenderer />
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {modalFields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <label htmlFor={field.key} className="text-sm font-medium text-gray-700 mb-1">
                {field.name}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-start">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
