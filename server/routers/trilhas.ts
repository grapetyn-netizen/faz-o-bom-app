import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createTrilha, getUserTrilhas, updateTrilha, deleteTrilha } from "../db";
import { nanoid } from "nanoid";

export const trilhasRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getUserTrilhas(ctx.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const trilha = await createTrilha({
        id: nanoid(36),
        userId: ctx.user.id,
        ...input,
      });
      return trilha;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nomeTrilha: z.string().optional(),
        nomeCompositor: z.string().optional(),
        coautores: z.array(z.string()).optional(),
        dataVeiculacao: z.date().optional(),
        tipoObra: z.string().optional(),
        categoriaExecucao: z.string().optional(),
        categoriaOutros: z.string().optional(),
        nomePrograma: z.string().optional(),
        veiculo: z.string().optional(),
        cueSheetUrl: z.string().optional(),
        video: z.string().optional(),
        contratoUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updateTrilha(id, data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteTrilha(input.id);
    }),

  duplicate: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const trilhas = await getUserTrilhas(ctx.user.id);
      const trilha = trilhas.find((t) => t.id === input.id);

      if (!trilha) {
        throw new Error("Trilha not found");
      }

      const duplicatedTrilha = await createTrilha({
        id: nanoid(36),
        userId: ctx.user.id,
        nomeTrilha: `${trilha.nomeTrilha} (Cópia)`,
        nomeCompositor: trilha.nomeCompositor,
        coautores: trilha.coautores,
        dataVeiculacao: trilha.dataVeiculacao,
        tipoObra: trilha.tipoObra,
        categoriaExecucao: trilha.categoriaExecucao,
        categoriaOutros: trilha.categoriaOutros,
        nomePrograma: trilha.nomePrograma,
        veiculo: trilha.veiculo,
        cueSheetUrl: trilha.cueSheetUrl,
        video: trilha.video,
        contratoUrl: trilha.contratoUrl,
      });

      return duplicatedTrilha;
    }),
});
