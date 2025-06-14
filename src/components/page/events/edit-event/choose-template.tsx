import { useModal } from "@/hooks/use-modal";
import Image from "next/image";
import { useState } from "react";
import { PreviewTemplate } from "@/components/layout/preview-template";

export function ChooseTemplate({
  currentTemplateId,
  closeModal,
  onChangeTemplate,
}: {
  currentTemplateId: number;
  closeModal: () => void;
  onChangeTemplate?: (templateId: number) => void;
}) {
  const [choosenTemplate, setChoosenTemplate] = useState<number | null>(currentTemplateId);
  const { openModal, ModalRenderer, closeModal: closeInnerModal } = useModal();
  const handleTemplateChange = () => {
    if (!choosenTemplate) return;
    onChangeTemplate?.(choosenTemplate);
    closeModal();
  };
  return (
    <>
      <ModalRenderer />
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 bg-opacity-75">
        <div className="rounded-lg bg-white w-full max-w-7xl">
          <div className="flex w-full max-w-7xl items-center justify-end p-4">
            <button onClick={closeModal}>X</button>
          </div>
          <div className="relative grid grid-cols-4 gap-16 p-6 w-full max-w-7xl">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() =>
                  openModal(
                    <PreviewTemplate
                      onChooseTemplate={setChoosenTemplate}
                      templateId={i}
                      closeModal={closeInnerModal}
                    />
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    openModal(
                      <PreviewTemplate
                        onChooseTemplate={setChoosenTemplate}
                        templateId={i}
                        closeModal={closeInnerModal}
                      />
                    );
                  }
                }}
              >
                {i == choosenTemplate && (
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Selected</div>
                )}
                <div className="relative text-center text-gray-500 group">
                  <Image
                    src={`/themes/screenshots/template-${i}.png`}
                    className="w-full h-40 bg-gray-200 rounded-lg group-hover:opacity-20 transition-opacity duration-300"
                    width={400}
                    height={200}
                    alt={`Template ${i}`}
                  />
                  <span className="hidden group-hover:inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
                    Preview
                  </span>
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-bold">Template {i + 1}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-start w-full max-w-7xl p-4">
            <button
              className="cursor-pointer hover:bg-primary/70 text-white bg-primary rounded-sm p-4"
              onClick={handleTemplateChange}
              type="button"
            >
              Confirm Choosen Template
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
