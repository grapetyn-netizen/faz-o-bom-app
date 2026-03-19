import { describe, it, expect } from "vitest";
import { z } from "zod";

// Test schema validation for shows
const showSchema = z.object({
  nomeShow: z.string().min(1),
  dataShow: z.date(),
  localShow: z.string().min(1),
  responsavelShow: z.string().min(1),
  categoria: z.string().min(1),
  instrumento: z.string().min(1),
  linkRepertorio: z.string().optional(),
  textoRepertorio: z.string().optional(),
  fotoUrls: z.array(z.string()).default([]),
});

// Test schema validation for trilhas
const trilhaSchema = z.object({
  nomeTrilha: z.string().min(1),
  nomeCompositor: z.string().min(1),
  coautores: z.array(z.string()).default([]),
  dataVeiculacao: z.date(),
  tipoObra: z.string().min(1),
  categoriaExecucao: z.string().min(1),
  categoriaOutros: z.string().optional(),
  nomePrograma: z.string().min(1),
  veiculo: z.string().min(1),
  cueSheetUrl: z.string().optional(),
  video: z.string().optional(),
  contratoUrl: z.string().optional(),
});

describe("Schema Validation", () => {
  it("should validate show data correctly", () => {
    const validShow = {
      nomeShow: "Test Show",
      dataShow: new Date("2026-03-20"),
      localShow: "Test Venue",
      responsavelShow: "Test Organizer",
      categoria: "musico-executante",
      instrumento: "guitarra",
      fotoUrls: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
    };

    const result = showSchema.safeParse(validShow);
    expect(result.success).toBe(true);
  });

  it("should reject invalid show data", () => {
    const invalidShow = {
      nomeShow: "",
      dataShow: "invalid-date",
      localShow: "Test Venue",
    };

    const result = showSchema.safeParse(invalidShow);
    expect(result.success).toBe(false);
  });

  it("should validate trilha data correctly", () => {
    const validTrilha = {
      nomeTrilha: "Test Trilha",
      nomeCompositor: "Test Composer",
      dataVeiculacao: new Date("2026-03-20"),
      tipoObra: "trilha-original",
      categoriaExecucao: "TA",
      nomePrograma: "Test Program",
      veiculo: "tv",
      coautores: ["Coautor 1", "Coautor 2"],
    };

    const result = trilhaSchema.safeParse(validTrilha);
    expect(result.success).toBe(true);
  });

  it("should reject invalid trilha data", () => {
    const invalidTrilha = {
      nomeTrilha: "",
      nomeCompositor: "",
      dataVeiculacao: "invalid-date",
    };

    const result = trilhaSchema.safeParse(invalidTrilha);
    expect(result.success).toBe(false);
  });

  it("should handle optional fields in show", () => {
    const showWithoutOptionals = {
      nomeShow: "Test Show",
      dataShow: new Date("2026-03-20"),
      localShow: "Test Venue",
      responsavelShow: "Test Organizer",
      categoria: "musico-executante",
      instrumento: "guitarra",
    };

    const result = showSchema.safeParse(showWithoutOptionals);
    expect(result.success).toBe(true);
  });

  it("should handle optional fields in trilha", () => {
    const trilhaWithoutOptionals = {
      nomeTrilha: "Test Trilha",
      nomeCompositor: "Test Composer",
      dataVeiculacao: new Date("2026-03-20"),
      tipoObra: "trilha-original",
      categoriaExecucao: "TA",
      nomePrograma: "Test Program",
      veiculo: "tv",
    };

    const result = trilhaSchema.safeParse(trilhaWithoutOptionals);
    expect(result.success).toBe(true);
  });
});
