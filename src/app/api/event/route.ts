import { auth } from "@/../auth";
import { deleteRSVPPage, updateRSVPPage, getRSVPPageByToken } from "@/lib/db/rsvp-logic";
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
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 400,
    });
  }

  const dto = { token };
  const data = await getRSVPPageByToken(dto);
  if (!data) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
export async function PUT(request: Request) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await request.json();
  const user = await getUserByEmail(session.user.email);

  if (!user) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 404,
    });
  }

  const userId = user.id;
  const dto = { ...body, userId };

  const updatedPage = await updateRSVPPage(dto);

  if (!updatedPage) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "RSVP page updated successfully" }), {
    status: 200,
  });
}
