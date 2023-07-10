import Pusher from "pusher-js";
import { useEffect } from "react";
import { env } from "@/env.mjs";
import type { Channel, Event, Data } from "@i/pusher";

let pusher: Pusher | null = null;

if (env.NEXT_PUBLIC_PUSHER_KEY && env.NEXT_PUBLIC_PUSHER_HOST) {
  pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: env.NEXT_PUBLIC_PUSHER_HOST,
    wsPort: 443,
    wssPort: 443,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });
}

export function usePusher<E extends Event<Channel>, T extends Data<Channel, E>>(
  channelName: Channel,
  eventName: E,
  onEvent: (data: T) => void
) {
  useEffect(() => {
    if (!pusher) return;
    const channel = pusher.subscribe(channelName as string);
    channel.bind(eventName, (data: T) => onEvent(data));
    return () => {
      if (!pusher) {
        return;
      }
      channel.unbind(eventName);
      pusher.unsubscribe(channelName as string);
    };
  }, [channelName, eventName, onEvent]);
}
