import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./upstash";

type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

export const limit = (requests: number, window: Duration) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
  });
};
