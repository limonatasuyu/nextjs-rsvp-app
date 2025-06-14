import Image from "next/image";

interface IPrevierTemplateProps {
  onChooseTemplate?: (templateId: number) => void;
  closeModal: () => void;
  templateId: number;
}

export function PreviewTemplate({ onChooseTemplate, templateId, closeModal }: IPrevierTemplateProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 bg-opacity-75">
      <div className="relative">
        <button
          className="cursor-pointer absolute top-0 right-0 m-4 text-black bg-white rounded-full px-[10px] pt-1 text-2xl"
          onClick={() => closeModal()}
          type="button"
        >
          &times;
        </button>
        <Image
          src={`/themes/screenshots/template-${templateId}.png`}
          alt="Preview"
          width={1500}
          height={1500}
          className="max-w-full max-h-full"
        />
        <div className="flex w-full items-center justify-center gap-12 mt-4">
          {onChooseTemplate && (
            <button
              className="cursor-pointer hover:bg-primary/70 text-white bg-primary rounded-sm p-4"
              onClick={() => {
                onChooseTemplate(templateId);
                closeModal();
              }}
              type="button"
            >
              Choose
            </button>
          )}
          <button
            className="cursor-pointer hover:bg-black/70 text-white bg-black rounded-sm p-4"
            onClick={() => closeModal()}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
