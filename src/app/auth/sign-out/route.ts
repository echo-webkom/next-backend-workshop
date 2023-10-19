import { cookies } from "next/headers";
import { COOKIE_KEY } from "@/constants";

/**
 * Sign out route
 *
 * Should eat the cookie and redirect to the home page
 */
export async function GET() {
  const cookieStore = cookies();

  cookieStore.set(COOKIE_KEY, "", {
    expires: new Date(0),
    path: "/",
    sameSite: "lax",
    httpOnly: process.env.NODE_ENV === "production",
  });

  return new Response("You are signed out", { status: 200 });
}
