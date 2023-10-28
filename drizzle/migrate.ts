import "dotenv/config";
import { db } from "@/db/drizzle";
import { migrate } from "drizzle-orm/postgres-js/migrator";

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
