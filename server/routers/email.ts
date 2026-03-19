import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailRouter = router({
  sendReport: protectedProcedure
    .input(
      z.object({
        emailAssociacao: z.string().email(),
        emailCopia: z.string().email().optional(),
        tipo: z.enum(["shows", "trilhas"]),
        nomeMusico: z.string(),
        dataInicio: z.string().optional(),
        dataFim: z.string().optional(),
        showsSelecionados: z.array(z.string()).optional(),
        trilhasSelecionadas: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const subject =
          input.tipo === "shows"
            ? `Relatório de Shows - ${input.nomeMusico}`
            : `Relatório de Trilhas Sonoras - ${input.nomeMusico}`;

        const htmlContent = `
          <h2>${subject}</h2>
          <p>Olá,</p>
          <p>Segue em anexo o relatório de ${input.tipo === "shows" ? "shows" : "trilhas sonoras"} para fins de acompanhamento junto ao ECAD.</p>
          <p><strong>Músico/Compositor:</strong> ${input.nomeMusico}</p>
          <p><strong>Período:</strong> ${input.dataInicio || "N/A"} a ${input.dataFim || "N/A"}</p>
          <p><strong>Quantidade:</strong> ${input.tipo === "shows" ? input.showsSelecionados?.length || 0 : input.trilhasSelecionadas?.length || 0}</p>
          <p>Atenciosamente,<br/>Faz o B.O.M.</p>
        `;

        const result = await resend.emails.send({
          from: "noreply@fazobom.com",
          to: input.emailAssociacao,
          cc: input.emailCopia ? [input.emailCopia] : undefined,
          subject,
          html: htmlContent,
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        return { success: true, messageId: result.data?.id };
      } catch (error) {
        console.error("[Email] Failed to send report:", error);
        throw error;
      }
    }),
});
