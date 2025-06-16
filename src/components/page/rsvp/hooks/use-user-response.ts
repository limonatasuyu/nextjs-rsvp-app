import { useState } from "react";

export function useUserResponse() {
  const [response, setResponse] = useState<null | "yes" | "not-coming" | "maybe">(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (choice: "yes" | "not-coming" | "maybe") => {
    setResponse(choice);
  };

  return {
    response,
    message,
    setMessage,
    handleSubmit,
  };
}
