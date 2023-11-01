import { db } from "@/db/drizzle";
import { posts } from "@/db/schemas";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title: string;
      body: string;
    };

    // Get the session of the user
    const session = await getSession();

    /**
     * Insert the post
     *
     * If the user is not logged in, the authorId will be null.
     */
    await db.insert(posts).values({
      ...body,
      authorId: session?.id,
    });

    return new Response("Post created", { status: 200 });
  } catch (e) {
    return new Response("Internal server error", { status: 500 });
  }
}
