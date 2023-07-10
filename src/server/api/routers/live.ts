import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const liveRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      await sleep(1000)
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
