import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_KEY } from "@/constants";
import jwt from "jsonwebtoken";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Sign in route
 *
 * Should check if any users has the same username.
 * If user is found, verify the password.
 * Redirect to the home page
 */
export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as {
      username: string;
      password: string;
    };

    const user = await db.query.users.findFirst({
      where: (user) => eq(user.username, payload.username),
    });

    if (!user) {
      return new Response("User doesn't exist", { status: 400 });
    }

    if (user.password !== payload.password) {
      return new Response("Wrong password", { status: 400 });
    }

    const token = jwt.sign(
      { sub: user.id, iat: Math.floor(Date.now() / 1000) },
      process.env.JWT_SECRET!
    );

    const cookieStore = cookies();

    cookieStore.set(COOKIE_KEY, token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: "/",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    revalidatePath("/");

    return new Response("You are signed in", { status: 200 });
  } catch (e) {
    if (e instanceof SyntaxError) {
      return new Response("Bad request", { status: 400 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
