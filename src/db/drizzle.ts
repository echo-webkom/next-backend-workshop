import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schemas";

/**
 * This is a singleton instance of the database connection.
 *
 * The reason for this is that we don't want to create a new connection
 * every time we want to query the database. Having to many connections
 * can cause the database to crash.
 */

const globalForPg = globalThis as unknown as {
  pg: ReturnType<typeof postgres> | undefined;
};

let pg;

if (process.env.NODE_ENV !== "production") {
  if (!globalForPg.pg) {
    globalForPg.pg = postgres(process.env.DATABASE_URL!);
  }
  pg = globalForPg.pg;
} else {
  pg = postgres(process.env.DATABASE_URL!);
}

export const db = drizzle(pg, {
  schema,
});
