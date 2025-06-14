"use client";
import Image from "next/image";
import { useState } from "react";
import { useQueryString } from "@/hooks/use-query-string";

export function Templates() {
  const [currentTemplate, setCurrentTemplate] = useState<number | null>(null);
  const { addMultipleQueryParameters } = useQueryString();

  return (
    <>
      <div className="mt-16 grid grid-cols-4 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => setCurrentTemplate(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setCurrentTemplate(i);
            }}
          >
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
              <h2 className="text-lg font-bold">Template {i}</h2>
            </div>
          </div>
        ))}
      </div>
      {currentTemplate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 bg-opacity-75">
          <div className="relative">
            <button
              className="cursor-pointer absolute top-0 right-0 m-4 text-black bg-white rounded-full px-[10px] pt-1 text-2xl"
              onClick={() => setCurrentTemplate(null)}
              type="button"
            >
              &times;
            </button>
            <Image
              src={`/themes/screenshots/template-${currentTemplate}.png`}
              alt="Preview"
              width={1500}
              height={1500}
              className="max-w-full max-h-full"
            />
            <div className="flex w-full items-center justify-center gap-12 mt-4">
              <button
                className="cursor-pointer hover:bg-primary/70 text-white bg-primary rounded-sm p-4"
                onClick={() => {
                  addMultipleQueryParameters([
                    { name: "template", value: currentTemplate.toString() },
                    { name: "currentStep", value: "2" },
                  ]);
                  setCurrentTemplate(null);
                }}
                type="button"
              >
                Choose
              </button>
              <button
                className="cursor-pointer hover:bg-black/70 text-white bg-black rounded-sm p-4"
                onClick={() => setCurrentTemplate(null)}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
