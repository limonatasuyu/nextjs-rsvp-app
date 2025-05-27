"use client";
import { useState } from "react";
import { Steps } from "./steps";
import { Templates } from "./templates";
import { CustomizeTemplate } from "./customize-template";
import { ShareRSVP } from "./share-rsvp";

export function CreatePage() {
  const [choosenTemplate, setChoosenTemplate] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="mx-auto container mt-16">
      <Steps currentStep={currentStep} />
      {currentStep === 1 && (
        <Templates
          setChoosenTemplate={(template: number | null) => {
            setChoosenTemplate(template);
            setCurrentStep(2);
          }}
        />
      )}
      {currentStep === 2 && (
        <CustomizeTemplate templateId={choosenTemplate} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 3 && <ShareRSVP templateId={choosenTemplate} />}
    </main>
  );
}
