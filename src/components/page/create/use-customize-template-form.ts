import { useQueryString } from "@/hooks/use-query-string";
import { randomBytes } from "crypto";
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
export function useCustomizeTemplateForm({ templateId }: { templateId: number }) {
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
    const token = randomBytes(32).toString("hex");

    params.push({ name: "currentStep", value: "3" });
    params.push({ name: "templateId", value: templateId.toString() });
    params.push({ name: "token", value: token });
    addMultipleQueryParameters(params);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (e.target instanceof HTMLButtonElement) {
      const { name } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: !prevFormData[name as keyof typeof prevFormData],
      }));
    }
  };
  return { formData, handleChange, submitForm, formDataErrors };
}
