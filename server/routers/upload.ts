import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createUpload, getUploadsByRelated } from "../db";
import { nanoid } from "nanoid";
import { storagePut } from "../storage";

export const uploadRouter = router({
  uploadPhoto: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileData: z.string(), // base64 encoded
        relatedId: z.string().optional(),
        relatedType: z.enum(["show", "trilha"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Convert base64 to buffer
        const buffer = Buffer.from(input.fileData, "base64");

        // Generate unique file key
        const fileKey = `photos/${ctx.user.id}/${nanoid(16)}-${input.fileName}`;

        // Upload to Supabase Storage
        const { url } = await storagePut(fileKey, buffer, "image/jpeg");

        // Save upload record to database
        const upload = await createUpload({
          id: nanoid(36),
          userId: ctx.user.id,
          fileName: input.fileName,
          fileUrl: url,
          fileKey,
          fileType: "photo",
          relatedId: input.relatedId,
          relatedType: input.relatedType,
        });

        return { success: true, url, uploadId: upload?.id };
      } catch (error) {
        console.error("[Upload] Failed to upload photo:", error);
        throw error;
      }
    }),

  uploadFile: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileData: z.string(), // base64 encoded
        fileType: z.enum(["pdf", "doc", "image"]),
        relatedId: z.string(),
        relatedType: z.enum(["show", "trilha"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Convert base64 to buffer
        const buffer = Buffer.from(input.fileData, "base64");

        // Determine MIME type
        const mimeTypes: Record<string, string> = {
          pdf: "application/pdf",
          doc: "application/msword",
          image: "image/jpeg",
        };

        // Generate unique file key
        const fileKey = `files/${ctx.user.id}/${input.relatedType}/${nanoid(16)}-${input.fileName}`;

        // Upload to Supabase Storage
        const { url } = await storagePut(
          fileKey,
          buffer,
          mimeTypes[input.fileType] || "application/octet-stream"
        );

        // Save upload record to database
        const upload = await createUpload({
          id: nanoid(36),
          userId: ctx.user.id,
          fileName: input.fileName,
          fileUrl: url,
          fileKey,
          fileType: input.fileType,
          relatedId: input.relatedId,
          relatedType: input.relatedType,
        });

        return { success: true, url, uploadId: upload?.id };
      } catch (error) {
        console.error("[Upload] Failed to upload file:", error);
        throw error;
      }
    }),

  getUploadsByRelated: protectedProcedure
    .input(
      z.object({
        relatedId: z.string(),
        relatedType: z.enum(["show", "trilha"]),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await getUploadsByRelated(input.relatedId);
      } catch (error) {
        console.error("[Upload] Failed to get uploads:", error);
        return [];
      }
    }),
});
