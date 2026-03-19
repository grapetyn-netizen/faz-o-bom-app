import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, shows, trilhas, uploads, Show, InsertShow, Trilha, InsertTrilha, Upload, InsertUpload } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Shows queries
export async function createShow(show: InsertShow): Promise<Show | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(shows).values(show);
    return db.select().from(shows).where(eq(shows.id, show.id)).limit(1).then(r => r[0] || null);
  } catch (error) {
    console.error("[Database] Failed to create show:", error);
    throw error;
  }
}

export async function getUserShows(userId: number): Promise<Show[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(shows).where(eq(shows.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get user shows:", error);
    return [];
  }
}

export async function updateShow(id: string, data: Partial<Show>): Promise<Show | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.update(shows).set(data).where(eq(shows.id, id));
    return db.select().from(shows).where(eq(shows.id, id)).limit(1).then(r => r[0] || null);
  } catch (error) {
    console.error("[Database] Failed to update show:", error);
    throw error;
  }
}

export async function deleteShow(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(shows).where(eq(shows.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete show:", error);
    throw error;
  }
}

// Trilhas queries
export async function createTrilha(trilha: InsertTrilha): Promise<Trilha | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(trilhas).values(trilha);
    return db.select().from(trilhas).where(eq(trilhas.id, trilha.id)).limit(1).then(r => r[0] || null);
  } catch (error) {
    console.error("[Database] Failed to create trilha:", error);
    throw error;
  }
}

export async function getUserTrilhas(userId: number): Promise<Trilha[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(trilhas).where(eq(trilhas.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get user trilhas:", error);
    return [];
  }
}

export async function updateTrilha(id: string, data: Partial<Trilha>): Promise<Trilha | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.update(trilhas).set(data).where(eq(trilhas.id, id));
    return db.select().from(trilhas).where(eq(trilhas.id, id)).limit(1).then(r => r[0] || null);
  } catch (error) {
    console.error("[Database] Failed to update trilha:", error);
    throw error;
  }
}

export async function deleteTrilha(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(trilhas).where(eq(trilhas.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete trilha:", error);
    throw error;
  }
}

// Uploads queries
export async function createUpload(upload: InsertUpload): Promise<Upload | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(uploads).values(upload);
    return db.select().from(uploads).where(eq(uploads.id, upload.id)).limit(1).then(r => r[0] || null);
  } catch (error) {
    console.error("[Database] Failed to create upload:", error);
    throw error;
  }
}

export async function getUserUploads(userId: number): Promise<Upload[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(uploads).where(eq(uploads.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get user uploads:", error);
    return [];
  }
}

export async function getUploadsByRelated(relatedId: string): Promise<Upload[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(uploads).where(eq(uploads.relatedId, relatedId));
  } catch (error) {
    console.error("[Database] Failed to get uploads by related ID:", error);
    return [];
  }
}
