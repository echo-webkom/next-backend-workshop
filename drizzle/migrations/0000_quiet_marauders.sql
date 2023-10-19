CREATE TABLE IF NOT EXISTS "post" (
	"id" uuid DEFAULT gen_random_uuid(),
	"title" varchar NOT NULL,
	"body" text NOT NULL,
	"author_id" uuid,
	CONSTRAINT post_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid DEFAULT gen_random_uuid(),
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT user_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_username" ON "user" ("username");