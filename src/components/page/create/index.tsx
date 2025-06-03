"use client";
import { Steps } from "./steps";
import { Templates } from "./templates";
import { CustomizeTemplate } from "./customize-template";
import { ShareRSVP } from "./share-rsvp";
import { useSearchParams } from "next/navigation";

export function CreatePage() {
  const searchParams = useSearchParams()
  
  const gettedStep = searchParams.get("currentStep");
  const currentStep = gettedStep ? Number(gettedStep) : 1;
  return (
    <main className="mx-auto container mt-16">
      <Steps currentStep={currentStep} />
      {currentStep === 1 && <Templates />}
      {currentStep === 2 && <CustomizeTemplate />}
      {currentStep === 3 && <ShareRSVP />}
    </main>
  );
}
