import { useQueryString } from "@/hooks/use-query-string";
import { randomBytes } from "crypto";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export interface IFormData {
  eventTitle: string;
  eventDescription: string;
  collectMaybeData: boolean;
  collectNotComingData: boolean;
  ageRestricted: boolean;
  minimumAgeRequirement: number;
  showAttendingCount: boolean;
  showAttendees: boolean;
  collectNote: boolean;
}

interface IFormDataErrors {
  eventTitle?: string;
  eventDescription?: string;
  minimumAgeRequirement?: string;
}

export function CustomizeTemplate() {
  const [formData, setFormData] = useState<IFormData>({
    eventTitle: "",
    eventDescription: "",
    collectMaybeData: false,
    collectNotComingData: false,
    ageRestricted: false,
    minimumAgeRequirement: 0,
    showAttendingCount: false,
    showAttendees: false,
    collectNote: false,
  });

  const searchParams = useSearchParams();
  const templateId = Number(searchParams.get("template"));

  const { addMultipleQueryParameters } = useQueryString();
  const [formDataErrors, setFormDataErrors] = useState<IFormDataErrors>({});

  const validateForm = () => {
    const errors: IFormDataErrors = {};
    if (!formData.eventTitle) {
      errors.eventTitle = "Event title is required.";
    }
    if (!formData.eventDescription) {
      errors.eventDescription = "Event description is required.";
    }
    if (formData.ageRestricted && formData.minimumAgeRequirement === 0) {
      errors.minimumAgeRequirement = "Minimum age requirement must be greater than 0.";
    }

    setFormDataErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      console.error("Form validation failed:", formDataErrors);
    }

    const params: { name: string; value: string }[] = [];
    for (const key in formData) {
      if (formData[key as keyof IFormData] === false) {
        params.push({ name: key, value: "false" });
      } else {
        params.push({ name: key, value: String(formData[key as keyof IFormData]) });
      }
    }
    params.push({ name: "currentStep", value: "3" });
    params.push({ name: "templateId", value: templateId.toString() });
    const token = randomBytes(32).toString("hex");
    params.push({ name: "token", value: token });
    addMultipleQueryParameters(params);
  };

  return (
    <div className="container mx-auto mt-16 flex items-center justify-between px-12 pb-12">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center">Customize Template</h1>
        <p className="text-center text-gray-600 mt-4">
          Customize your template with the selected template ID: {templateId}
        </p>
        <form className="w-full max-w-md mx-auto mt-8">
          <label className="block text-lg font-medium mt-6" htmlFor="event-title">
            Event Title
          </label>
          <input
            id="event-title"
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            value={formData.eventTitle}
            onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
          />
          {formDataErrors.eventTitle && (
            <p className="text-red-500 text-sm mt-2">{formDataErrors.eventTitle}</p>
          )}
          <label className="block text-lg font-medium mt-6" htmlFor="event-description">
            Event Description
          </label>
          <input
            id="event-description"
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            value={formData.eventDescription}
            onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
          />
          {formDataErrors.eventDescription && (
            <p className="text-red-500 text-sm mt-2">{formDataErrors.eventDescription}</p>
          )}
          <div className="flex items-center gap-4 mt-8 w-fit">
            <label className="block text-lg font-medium" htmlFor="collect-maybe-data">
              Collect Note
            </label>
            <input
              id="collect-note"
              type="checkbox"
              value={String(formData.collectNote)}
              onChange={() => setFormData({ ...formData, collectNote: !formData.collectNote })}
            />
          </div>
          <div className="flex items-center gap-4 mt-8 w-fit">
            <label className="block text-lg font-medium" htmlFor="collect-maybe-data">
              Collect Maybe Data
            </label>
            <input
              id="collect-maybe-data"
              type="checkbox"
              value={String(formData.collectMaybeData)}
              onChange={() => setFormData({ ...formData, collectMaybeData: !formData.collectMaybeData })}
            />
          </div>
          <div className="flex items-center gap-4 mt-8 w-fit">
            <label className="block text-lg font-medium" htmlFor="collect-not-coming-data">
              Collect Not Coming Data
            </label>
            <input
              id="collect-not-coming-data"
              type="checkbox"
              value={String(formData.collectNotComingData)}
              onChange={() =>
                setFormData({ ...formData, collectNotComingData: !formData.collectNotComingData })
              }
            />
          </div>
          <div className="flex items-center gap-4 mt-8 w-fit">
            <label className="block text-lg font-medium" htmlFor="age-restricted-data">
              Age Restricted
            </label>
            <input
              id="age-restricted-data"
              type="checkbox"
              value={String(formData.ageRestricted)}
              onChange={() => {
                if (formData.ageRestricted) {
                  setFormData({ ...formData, minimumAgeRequirement: 0, ageRestricted: false }); // Reset minimum age if unchecked
                } else {
                  setFormData({ ...formData, ageRestricted: true });
                }
              }}
            />
          </div>
          {formData.ageRestricted && (
            <>
              <label className="block text-lg font-medium mt-6" htmlFor="minimum-age-requirement">
                Minimum Age
              </label>
              <input
                id="minimum-age-requirement"
                type="number"
                min="0"
                max="100"
                className="w-full p-2 border border-gray-300 rounded-md mt-4"
                value={formData.minimumAgeRequirement}
                onChange={(e) => setFormData({ ...formData, minimumAgeRequirement: Number(e.target.value) })}
              />
              {formDataErrors.minimumAgeRequirement && (
                <p className="text-red-500 text-sm mt-2">{formDataErrors.minimumAgeRequirement}</p>
              )}
            </>
          )}
          <div className="flex items-center gap-4 mt-8 w-fit">
            <label className="block text-lg font-medium" htmlFor="show-attending-count">
              Show Attending Count
            </label>
            <input
              id="show-attending-count"
              type="checkbox"
              value={String(formData.showAttendingCount)}
              onChange={() => setFormData({ ...formData, showAttendingCount: !formData.showAttendingCount })}
            />
          </div>
          <div className="flex items-center gap-4 mt-8 w-fit">
            <label className="block text-lg font-medium" htmlFor="show-attendees">
              Show Attendees
            </label>
            <input
              id="show-attendees"
              type="checkbox"
              value={String(formData.showAttendees)}
              onChange={() => setFormData({ ...formData, showAttendees: !formData.showAttendees })}
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-full bg-primary hover:bg-primary/80 text-white text-lg font-semibold px-6 py-3 rounded-2xl transition"
            onClick={submitForm}
          >
            Submit Customization
          </button>
        </form>
      </div>
      <Image
        src={`/themes/screenshots/template-${templateId}.png`}
        alt="Template"
        width={500}
        height={500}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
}
