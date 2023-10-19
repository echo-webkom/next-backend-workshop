import { pgTable, primaryKey, uuid, varchar, text } from "drizzle-orm/pg-core";

export const posts = pgTable(
  "post",
  {
    id: uuid("id").defaultRandom(),
    title: varchar("title").notNull(),
    body: text("body").notNull(),
    authorId: uuid("author_id"),
  },
  (table) => ({
    pk: primaryKey(table.id),
  })
);
