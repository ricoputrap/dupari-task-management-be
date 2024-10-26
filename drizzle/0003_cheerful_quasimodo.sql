ALTER TABLE "USER" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "USER" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "TASK_BOARD" ALTER COLUMN "created_at" SET DEFAULT 1729984998539;--> statement-breakpoint
ALTER TABLE "TASK" ALTER COLUMN "created_at" SET DEFAULT 1729984998539;--> statement-breakpoint
ALTER TABLE "USER" ALTER COLUMN "createdAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "USER" ALTER COLUMN "createdAt" SET DEFAULT 1729984998539;--> statement-breakpoint
ALTER TABLE "USER" ALTER COLUMN "updatedAt" SET DATA TYPE bigint;