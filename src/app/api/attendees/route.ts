import { getAttendeesByEventToken } from "@/lib/db/rsvp-logic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventToken = searchParams.get("eventToken");

  if (!eventToken) {
    return new Response(JSON.stringify({ error: "Missing event token" }), {
      status: 400,
    });
  }

  const dto = {
    eventToken,
  };
  const result = await getAttendeesByEventToken(dto);
  if (!result) {
    return new Response(JSON.stringify({ error: "No attendees found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
