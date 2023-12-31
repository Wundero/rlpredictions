/* eslint-disable @typescript-eslint/require-await */
import { verifySignature } from "@upstash/qstash/nextjs";
import type { NextApiHandler } from "next";
import { env } from "@/env.mjs";

const handler: NextApiHandler = async (req, res) => {
  // TODO:
  //  update all data sources
  //  revalidate all generated static pages (res.revalidate)
  res.status(200).end();
};

let sigHandler = handler;

if (env.NODE_ENV === "production") {
  sigHandler = verifySignature(handler);
}

export default sigHandler;

export const config = {
  api: {
    bodyParser: env.NODE_ENV !== "production",
  },
};
