import { auth } from "@/../auth";
import { getUserByEmail } from "@/lib/db/user-logic";
import { createRSVPPage, getRSVPPagesByUser } from "@/lib/db/rsvp-logic";


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
