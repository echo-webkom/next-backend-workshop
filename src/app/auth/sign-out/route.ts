import { cookies } from "next/headers";
import { COOKIE_KEY } from "@/constants";

/**
 * Sign out route
 *
 * Should eat the cookie and redirect to the home page
 */
export async function GET() {
  const cookieStore = cookies();

  // Eat the cookie
  cookieStore.delete(COOKIE_KEY);

  return new Response("You are signed out", { status: 200 });
}
