import Image from "next/image";
import { useCustomizeTemplateForm } from "./use-customize-template-form";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function CustomizeTemplate() {
  const searchParams = useSearchParams();
  const templateId = Number(searchParams.get("template"));

  const { formData, handleChange, submitForm, formDataErrors } = useCustomizeTemplateForm({
    templateId,
  });
  console.log("formData.collectNote: ", formData.collectNote);
  return (
    <div className="container mx-auto mt-16 flex items-center justify-between px-12 pb-12">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center">Customize Template</h1>
        <p className="text-center text-gray-600 mt-4">
          Customize your template with the selected template ID: {templateId}
        </p>
        <form className="w-full max-w-md mx-auto mt-8">
          <Input
            name="eventTitle"
            label="Event Title"
            value={formData.eventTitle}
            onChange={handleChange}
            errorMessage={formDataErrors.eventTitle}
          />
          <Input
            name="eventDescription"
            label="Event Description"
            value={formData.eventDescription}
            onChange={handleChange}
            errorMessage={formDataErrors.eventTitle}
          />
          <Switch
            name="collectNote"
            label="Collect Note"
            value={formData.collectNote as unknown as string}
            onClick={handleChange}
          />
          <Switch
            name="collectMaybeData"
            label="Collect Maybe Data"
            value={formData.collectMaybeData as unknown as string}
            onClick={handleChange}
          />
          <Switch
            name="collectNotComingData"
            label="Collect Not Coming Data"
            value={formData.collectNotComingData as unknown as string}
            onClick={handleChange}
          />
          <Switch
            name="ageRestricted"
            label="Age Restricted"
            value={formData.ageRestricted as unknown as string}
            onClick={handleChange}
          />
          {formData.ageRestricted && (
            <Input
              name="minimumAgeRequirement"
              label="Minimum Age Requirement"
              type="number"
              value={formData.minimumAgeRequirement}
              onChange={handleChange}
            />
          )}
          <Switch
            name="showAttendingCount"
            label="Show Attending Count"
            value={formData.showAttendingCount as unknown as string}
            onClick={handleChange}
          />
          <Switch
            name="showAttendees"
            label="Show Attendees"
            value={formData.showAttendees as unknown as string}
            onClick={handleChange}
          />
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
