import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Shows table for musicians
export const shows = mysqlTable("shows", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: int("userId").notNull(),
  nomeShow: text("nomeShow").notNull(),
  dataShow: timestamp("dataShow").notNull(),
  localShow: text("localShow").notNull(),
  responsavelShow: text("responsavelShow").notNull(),
  categoria: varchar("categoria", { length: 100 }).notNull(),
  instrumento: varchar("instrumento", { length: 100 }).notNull(),
  linkRepertorio: text("linkRepertorio"),
  textoRepertorio: text("textoRepertorio"),
  fotoUrls: json("fotoUrls").$type<string[]>().default([]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Show = typeof shows.$inferSelect;
export type InsertShow = typeof shows.$inferInsert;

// Trilhas (Soundtracks) table for composers
export const trilhas = mysqlTable("trilhas", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: int("userId").notNull(),
  nomeTrilha: text("nomeTrilha").notNull(),
  nomeCompositor: text("nomeCompositor").notNull(),
  coautores: json("coautores").$type<string[]>().default([]),
  dataVeiculacao: timestamp("dataVeiculacao").notNull(),
  tipoObra: varchar("tipoObra", { length: 100 }).notNull(),
  categoriaExecucao: varchar("categoriaExecucao", { length: 100 }).notNull(),
  categoriaOutros: text("categoriaOutros"),
  nomePrograma: text("nomePrograma").notNull(),
  veiculo: varchar("veiculo", { length: 100 }).notNull(),
  cueSheetUrl: text("cueSheetUrl"),
  video: text("video"),
  contratoUrl: text("contratoUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Trilha = typeof trilhas.$inferSelect;
export type InsertTrilha = typeof trilhas.$inferInsert;

// Uploads table for tracking file uploads
export const uploads = mysqlTable("uploads", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: int("userId").notNull(),
  fileName: text("fileName").notNull(),
  fileUrl: text("fileUrl").notNull(),
  fileKey: text("fileKey").notNull(),
  fileType: varchar("fileType", { length: 50 }).notNull(),
  relatedId: varchar("relatedId", { length: 36 }),
  relatedType: varchar("relatedType", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Upload = typeof uploads.$inferSelect;
export type InsertUpload = typeof uploads.$inferInsert;