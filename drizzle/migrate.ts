import "dotenv/config";
import * as schema from "@/db/schemas";
import { migrate } from "drizzle-orm/postgres-js/migrator";
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

// Run the migrations
migrate(db, {
  migrationsFolder: "./drizzle/migrations",
})
  // If the migrations are successful, exit with code 0
  .then(() => {
    console.log("Migrations complete");
    process.exit(0);
  })
  // If the migrations fail, log the error and exit with code 1
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
