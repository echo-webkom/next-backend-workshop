import "dotenv/config";
import * as schema from "@/db/schemas";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Create connection to the database
const pg = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

// Initialize drizzle client
const db = drizzle(pg, {
  schema,
});

const { users, posts } = schema;

async function seed() {
  await db.insert(users).values({
    id: "214c46c7-afae-487b-a5b1-0dd5b4d6e18a",
    username: "admin",
    password: "password",
  });

  await db.insert(posts).values([
    {
      title: "Hello world",
      body: "This is my first post",
    },
    {
      title: "Hello world 2",
      body: "This is my second post",
      authorId: "214c46c7-afae-487b-a5b1-0dd5b4d6e18a",
    },
  ]);
}

seed()
  .then(() => {
    console.log("Seed complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
