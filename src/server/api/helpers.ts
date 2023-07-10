import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export const helpers = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: createTRPCContext(),
    transformer: superjson,
  });
