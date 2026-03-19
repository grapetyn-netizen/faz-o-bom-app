import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createShow, getUserShows, updateShow, deleteShow } from "../db";
import { nanoid } from "nanoid";

export const showsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getUserShows(ctx.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        nomeShow: z.string().min(1),
        dataShow: z.date(),
        localShow: z.string().min(1),
        responsavelShow: z.string().min(1),
        categoria: z.string().min(1),
        instrumento: z.string().min(1),
        linkRepertorio: z.string().optional(),
        textoRepertorio: z.string().optional(),
        fotoUrls: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const show = await createShow({
        id: nanoid(36),
        userId: ctx.user.id,
        ...input,
      });
      return show;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nomeShow: z.string().min(1).optional(),
        dataShow: z.date().optional(),
        localShow: z.string().optional(),
        responsavelShow: z.string().optional(),
        categoria: z.string().optional(),
        instrumento: z.string().optional(),
        linkRepertorio: z.string().optional(),
        textoRepertorio: z.string().optional(),
        fotoUrls: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updateShow(id, data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteShow(input.id);
    }),

  duplicate: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const shows = await getUserShows(ctx.user.id);
      const show = shows.find((s) => s.id === input.id);

      if (!show) {
        throw new Error("Show not found");
      }

      const duplicatedShow = await createShow({
        id: nanoid(36),
        userId: ctx.user.id,
        nomeShow: `${show.nomeShow} (Cópia)`,
        dataShow: show.dataShow,
        localShow: show.localShow,
        responsavelShow: show.responsavelShow,
        categoria: show.categoria,
        instrumento: show.instrumento,
        linkRepertorio: show.linkRepertorio,
        textoRepertorio: show.textoRepertorio,
        fotoUrls: show.fotoUrls,
      });

      return duplicatedShow;
    }),
});
