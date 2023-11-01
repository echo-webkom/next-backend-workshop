import { COOKIE_KEY } from "@/constants";
import { db } from "@/db/drizzle";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signIn(username: string, password: string) {
  try {
    // Check if any user has the same username
    const exisitingUser = await db.query.users.findFirst({
      where: (user) => eq(user.username, username),
    });

    if (exisitingUser) {
      return new Response("User already exists", { status: 400 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 12);

    // Create the user
    const user = await db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
      })
      .returning()
      .then((res) => res[0] ?? null);

    if (!user) {
      return {
        success: false,
        message: "User creation failed",
      };
    }

    // Create a JWT
    const token = jwt.sign(
      { sub: user.id, iat: Math.floor(Date.now() / 1000) },
      process.env.JWT_SECRET!
    );

    const cookieStore = cookies();

    // Set the JWT as a cookie
    cookieStore.set(COOKIE_KEY, token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: "/",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return {
      success: true,
      message: "You are signed in",
    };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
