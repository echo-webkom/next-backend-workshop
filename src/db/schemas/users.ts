import {
  pgTable,
  primaryKey,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "user",
  {
    id: uuid("id").defaultRandom(),
    username: varchar("username").notNull(),
    password: varchar("password").notNull(),
  },
  (table) => ({
    // This is the primary key of the table
    pk: primaryKey(table.id),

    // This is a unique index on the username column
    // This means that other users cannot have the same username
    unique: uniqueIndex("unique_username").on(table.username),
  })
);
