import "dotenv/config";
import * as schema from "@/db/schemas";
import { posts } from "@/db/schemas";
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

async function seed() {
  await db.insert(posts).values({
    title: "Hello world",
    body: "This is my first post",
  });
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
