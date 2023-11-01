import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid, varchar, text } from "drizzle-orm/pg-core";
import { users } from ".";

export const posts = pgTable(
  "post",
  {
    id: uuid("id").notNull().defaultRandom(),
    title: varchar("title").notNull(),
    body: text("body").notNull(),
    authorId: uuid("author_id"),
  },
  (table) => ({
    pk: primaryKey(table.id),
  })
);

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
