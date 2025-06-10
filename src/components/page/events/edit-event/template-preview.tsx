import Image from "next/image";

export function TemplatePreview({ templateId, closeModal }: { templateId: string; closeModal: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 bg-opacity-75">
      <div className="relative">
        <button
          className="cursor-pointer absolute top-0 right-0 m-4 text-black bg-white rounded-full px-[10px] pt-1 text-2xl"
          type="button"
          onClick={closeModal}
        >
          x
        </button>
        <Image
          src={`/themes/screenshots/template-${templateId}.png`}
          alt="Preview"
          width={1500}
          height={1500}
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
}

