// worker/lib/resend.ts

import { Resend } from "npm:resend@3.5.0";

const apiKey = Deno.env.get("RESEND_API_KEY");

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(apiKey);

