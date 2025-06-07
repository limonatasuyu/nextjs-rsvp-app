import { auth } from "@/../auth";
import { getRSVPPagesByUser, deleteRSVPPage } from "@/lib/db/rsvp-logic";
import { getUserByEmail } from "@/lib/db/user-logic";

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await request.json();
  const token = body.token;
  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), {
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
  const dto = { userId, token };
  await deleteRSVPPage(dto);
  return new Response(null, {
    status: 200,
  });
}

export async function GET() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 404,
    });
  }
  const userId = user.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const dto = { userId };
  const data = await getRSVPPagesByUser(dto);
  if (!data) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
