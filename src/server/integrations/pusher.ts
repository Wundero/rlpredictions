import Pusher from "pusher";
import { env } from "@/env.mjs";
import { type ZodType, z } from "zod";

export let pusher: Pusher | null = null;

if (
  env.PUSHER_APP_ID &&
  env.PUSHER_APP_KEY &&
  env.PUSHER_SECRET &&
  env.PUSHER_HOST
) {
  pusher = new Pusher({
    appId: env.PUSHER_APP_ID,
    key: env.PUSHER_APP_KEY,
    secret: env.PUSHER_SECRET,
    useTLS: true,
    host: env.PUSHER_HOST,
    port: "443",
  });
}

// Type: Record<channel, Record<event, ZodType>>
// TODO pusher events
export const pusherConfig = {
  notification: {
    newNotification: z.object({
      id: z.string(),
    }),
  },
} as const;

export type Channel = keyof typeof pusherConfig;
export type Event<T extends Channel> = keyof (typeof pusherConfig)[T];
export type Data<T extends Channel, E extends Event<T>> = z.infer<
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  (typeof pusherConfig)[T][E]
>;

type PusherInput = {
  [T in Channel]: {
    channel: T;
    event: Event<T>;
    data: Data<T, Event<T>>;
  };
}[Channel];

export const zodConfig = z.custom<PusherInput>((input) => {
  if (!input) {
    return false;
  }
  if (typeof input !== "object") {
    return false;
  }
  if ("channel" in input && "event" in input) {
    const validatedInput = input as {
      channel: string;
      event: string;
      data: unknown;
    };
    if (validatedInput.channel in pusherConfig) {
      const channelConfig =
        pusherConfig[validatedInput.channel as keyof typeof pusherConfig];
      if (channelConfig && validatedInput.event in channelConfig) {
        const eventValidator = channelConfig[
          validatedInput.event as keyof typeof channelConfig
        ] as ZodType;
        if (
          eventValidator &&
          eventValidator.safeParse(validatedInput.data).success
        ) {
          return true;
        }
      }
    }
  }
  return false;
});
