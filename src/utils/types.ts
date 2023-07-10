import { z } from "zod";


export const teamValidator = z.object({

});

export type Team = z.infer<typeof teamValidator>;