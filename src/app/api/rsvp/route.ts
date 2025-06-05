import { auth } from "@/../auth";
import { getUserByEmail } from "@/lib/db/user-logic";
import { createRSVPPage, getRSVPPageByToken } from "@/lib/db/rsvp-logic";

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

export async function POST(request: Request) {
  try {
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

    const dto = { ...body, userId: user.id };
    const { token } = await createRSVPPage(dto);

    if (!token) {
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ token }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
