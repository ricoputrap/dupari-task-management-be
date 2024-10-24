CREATE TABLE IF NOT EXISTS "BOARD_MEMBER" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"board_id" integer NOT NULL,
	"is_active" integer DEFAULT 1 NOT NULL,
	"invited_at" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TASK_BOARD" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"owner_id" integer NOT NULL,
	"created_at" integer DEFAULT 1729774938041 NOT NULL,
	"updated_at" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TASK" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"status" integer DEFAULT 1 NOT NULL,
	"due_date" integer NOT NULL,
	"assignee_id" integer,
	"board_id" integer NOT NULL,
	"created_at" integer DEFAULT 1729774938041 NOT NULL,
	"updated_at" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "USER" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" integer DEFAULT 1729774938041 NOT NULL,
	"updated_at" integer NOT NULL,
	CONSTRAINT "USER_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BOARD_MEMBER" ADD CONSTRAINT "BOARD_MEMBER_user_id_USER_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."USER"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BOARD_MEMBER" ADD CONSTRAINT "BOARD_MEMBER_board_id_TASK_BOARD_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."TASK_BOARD"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TASK_BOARD" ADD CONSTRAINT "TASK_BOARD_owner_id_USER_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."USER"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TASK" ADD CONSTRAINT "TASK_assignee_id_USER_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."USER"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TASK" ADD CONSTRAINT "TASK_board_id_TASK_BOARD_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."TASK_BOARD"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
