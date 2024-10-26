ALTER TABLE "USER" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "USER" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "TASK_BOARD" ALTER COLUMN "created_at" SET DEFAULT 1729985049237;--> statement-breakpoint
ALTER TABLE "TASK" ALTER COLUMN "created_at" SET DEFAULT 1729985049238;--> statement-breakpoint
ALTER TABLE "USER" ALTER COLUMN "created_at" SET DEFAULT 1729985049237;