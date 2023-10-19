import { COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function getSession() {
  try {
    const cookieStore = cookies();

    const token = cookieStore.get(COOKIE_KEY);

    if (!token?.value) {
      return null;
    }

    const payload = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      sub: string;
      iat: number;
    };

    const user = await db.query.users.findFirst({
      where: (user) => eq(user.id, payload.sub),
    });

    return user;
  } catch {
    return null;
  }
}
