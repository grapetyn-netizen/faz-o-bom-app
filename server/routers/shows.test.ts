import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("shows router", () => {
  it("should list shows for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const shows = await caller.shows.list();

    expect(Array.isArray(shows)).toBe(true);
  });

  it("should create a new show", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const newShow = await caller.shows.create({
      nomeShow: "Test Show",
      dataShow: new Date("2026-03-20"),
      localShow: "Test Venue",
      responsavelShow: "Test Organizer",
      categoria: "musico-executante",
      instrumento: "guitarra",
      fotoUrls: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
    });

    expect(newShow).toBeDefined();
    expect(newShow?.nomeShow).toBe("Test Show");
    expect(newShow?.localShow).toBe("Test Venue");
  });

  it("should update a show", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const newShow = await caller.shows.create({
      nomeShow: "Original Show",
      dataShow: new Date("2026-03-20"),
      localShow: "Original Venue",
      responsavelShow: "Test Organizer",
      categoria: "musico-executante",
      instrumento: "guitarra",
      fotoUrls: ["photo1.jpg"],
    });

    if (newShow?.id) {
      const updated = await caller.shows.update({
        id: newShow.id,
        nomeShow: "Updated Show",
      });

      expect(updated?.nomeShow).toBe("Updated Show");
    }
  });

  it("should delete a show", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const newShow = await caller.shows.create({
      nomeShow: "Show to Delete",
      dataShow: new Date("2026-03-20"),
      localShow: "Test Venue",
      responsavelShow: "Test Organizer",
      categoria: "musico-executante",
      instrumento: "guitarra",
      fotoUrls: ["photo1.jpg"],
    });

    if (newShow?.id) {
      const deleted = await caller.shows.delete({ id: newShow.id });
      expect(deleted).toBe(true);
    }
  });
});
