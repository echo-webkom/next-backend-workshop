import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  // Path to the database schemas
  // So that drizzle can generate the correct migrations
  schema: "./src/db/schemas",

  // Use the postgres driver
  driver: "pg",

  // Path to the migrations directory
  out: "./drizzle/migrations",

  strict: true,

  // Database credentials
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
