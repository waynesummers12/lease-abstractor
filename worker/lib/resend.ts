// worker/lib/resend.ts
import { Resend } from "npm:resend@3.5.0";

export const resend = new Resend(
  Deno.env.get("RESEND_API_KEY")!
);
