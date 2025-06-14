const templates = [
  { id: "1", name: "Template 1", image: "/themes/screenshots/template-1.png" },
  { id: "2", name: "Template 2", image: "/themes/screenshots/template-2.png" },
  { id: "3", name: "Template 3", image: "/themes/screenshots/template-3.png" },
  { id: "4", name: "Template 4", image: "/themes/screenshots/template-4.png" },
  { id: "5", name: "Template 5", image: "/themes/screenshots/template-5.png" },
  { id: "6", name: "Template 6", image: "/themes/screenshots/template-6.png" },
  { id: "7", name: "Template 7", image: "/themes/screenshots/template-7.png" },
  { id: "8", name: "Template 8", image: "/themes/screenshots/template-8.png" },
];

export const editEventModalFields = [
  { key: "eventTitle", name: "Event Title", type: "text" },
  { key: "eventDescription", name: "Event Description", type: "textarea" },
  { key: "token", name: "Page Link", type: "text" },
  { key: "minimumAgeRequirement", name: "Minimum Age Requirement", type: "number" },
  { key: "templateId", name: "Template", type: "select", options: templates },
  { key: "showAttendingCount", name: "Show Attending Count", type: "switch" },
  { key: "showAttendees", name: "Show Attendees", type: "switch" },
  { key: "notComing", name: "Not Coming", type: "switch" },
  { key: "ageRestricted", name: "Age Restricted", type: "switch" },
  { key: "collectNote", name: "Collect Note", type: "switch" },
  { key: "collectMaybeData", name: "Collect Maybe Coming", type: "switch" },
  { key: "collectNotComingData", name: "Collect Not Coming", type: "switch" },
];

export const viewEventModalFields = [
  { key: "eventTitle", name: "Event Title", type: "text" },
  { key: "eventDescription", name: "Event Description", type: "textarea" },
  { key: "token", name: "Page Link", type: "text" },
  { key: "minimumAgeRequirement", name: "Minimum Age Requirement", type: "number" },
  { key: "templateId", name: "Template", type: "select", options: templates },
  { key: "attendees", name: "Attendees", type: "text" },
  { key: "showAttendingCount", name: "Show Attending Count", type: "switch" },
  { key: "showAttendees", name: "Show Attendees", type: "switch" },
  { key: "notComing", name: "Not Coming", type: "switch" },
  { key: "ageRestricted", name: "Age Restricted", type: "switch" },
  { key: "collectNote", name: "Collect Note", type: "switch" },
  { key: "collectMaybeData", name: "Collect Maybe Coming", type: "switch" },
  { key: "collectNotComingData", name: "Collect Not Coming", type: "switch" },
];
