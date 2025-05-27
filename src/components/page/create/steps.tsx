import Image from "next/image";

export function Steps({currentStep = 1}: {currentStep?: number}) {
  const steps = [
    {
      title: "Choose a template",
      description: "Create a new RSVP page",
      icon: "/icons/template.svg",
    },
    {
      title: "Customize",
      description: "Customize your RSVP page",
      icon: "/icons/customize.svg",
    },
    //{
    //  title: "Settings",
    //  description: "Manage your RSVP page",
    //  icon: "/icons/settings.svg",
    //},
    {
      title: "Share",
      description: "Share your RSVP page",
      icon: "/icons/share.svg",
    },
  ];
  return (
    <div>
      <div className="flex">
        {steps.map((step) => {
          return (
            <div key={step.title} className="flex-1 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[3px] mt-2 text-center text-lg">
                <Image src={step.icon} alt={step.title} width={24} height={24} />
              </div>

              <h2 className="text-2xl font-bold">{step.title}</h2>
              <p className="text-gray-500">{step.description}</p>
            </div>
          );
        })}
      </div>
      <div className="container mx-auto mt-12 h-8 w-full bg-gray-200">
        <div className="bg-primary h-8" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
      </div>
    </div>
  );
}
