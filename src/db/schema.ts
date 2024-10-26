import { bigint, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const userTable = pgTable('USER', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),

  // mbr: Member, own: Owner
  role: text('role').notNull().default('mbr'),

  created_at: bigint({ mode: "number" }).notNull().default(Date.now()),
  updated_at: bigint({ mode: "number" })
    .notNull()
    .$onUpdate(() => Date.now()),
});

export const taskBoardTable = pgTable('TASK_BOARD', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at').notNull().default(Date.now()),
    updatedAt: integer('updated_at')
      .notNull()
      .$onUpdate(() => Date.now()),
});

export const taskTable = pgTable('TASK', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),

  // 1: To Do, 2: In Progress, 3: Done
  status: integer('status').notNull().default(1),

  dueDate: integer('due_date').notNull(),
  assigneeId: integer('assignee_id')
    .references(() => userTable.id, { onDelete: 'cascade' }),
  boardId: integer('board_id')
    .notNull()
    .references(() => taskBoardTable.id, { onDelete: 'cascade' }),

  createdAt: integer('created_at').notNull().default(Date.now()),
  updatedAt: integer('updated_at')
    .notNull()
    .$onUpdate(() => Date.now()),
});

export const boardMemberTable = pgTable('BOARD_MEMBER', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  boardId: integer('board_id')
    .notNull()
    .references(() => taskBoardTable.id, { onDelete: 'cascade' }),
  is_active: integer('is_active').notNull().default(1),
  invited_at: integer('invited_at').notNull()
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertTaskBoard = typeof taskBoardTable.$inferInsert;
export type SelectTaskBoard = typeof taskBoardTable.$inferSelect;

export type InsertTask = typeof taskTable.$inferInsert;
export type SelectTask = typeof taskTable.$inferSelect;

export type InsertBoardMember = typeof boardMemberTable.$inferInsert;
export type SelectBoardMember = typeof boardMemberTable.$inferSelect;