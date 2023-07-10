import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tournamentsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
