import { createTRPCRouter } from "@/server/api/trpc";
import { liveRouter } from "./routers/live";
import { tournamentsRouter } from "./routers/tournaments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  live: liveRouter,
  tournaments: tournamentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
