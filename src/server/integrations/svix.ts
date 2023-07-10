import { Svix } from "svix";
import {env} from '@/env.mjs';

export let svix: Svix | null = null;

if (env.SVIX_TOKEN) {
    svix = new Svix(env.SVIX_TOKEN);
}
