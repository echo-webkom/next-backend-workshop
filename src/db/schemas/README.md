# Creating a Drizzle schema

```ts
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
```

`pgTable` takes three arguments:

- `name` - the name of the table
- `columns` - an object defining the columns of the table
- `constraints` - (optional) a function that takes the table and returns an object defining the constraints of the table

Here we have defined a table called `post` with the following columns:

- `id` - a UUID primary key
- `title` - a non-nullable string
- `body` - a non-nullable string
- `authorId` - a nullable UUID
