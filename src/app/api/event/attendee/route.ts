import { getUserByEmail } from "@/lib/db/user-logic";
import { deleteAttendeeByToken } from "@/lib/db/rsvp-logic";
import { auth } from "../../../../../auth";

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await request.json();
  const token = body.token;
  const attendeeId = body.attendeeId;

  if (!token || !attendeeId) {
    return new Response(JSON.stringify({ error: "Missing token or attendeeId" }), {
      status: 400,
    });
  }

  const user = await getUserByEmail(session.user.email);
  if (!user) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 404,
    });
  }

  const userId = user.id;
  const dto = { userId, token, attendeeId };

  await deleteAttendeeByToken(dto);

  return new Response(null, {
    status: 200,
  });
}
