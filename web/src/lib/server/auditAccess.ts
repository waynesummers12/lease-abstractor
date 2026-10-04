import { NextResponse } from "next/server";
import { portfolioAccess } from "./portfolioAccess";
import { createClient } from "@supabase/supabase-js";

const encoder = new TextEncoder();
const cookieName = (id: string) => `audit_access_${id}`;

async function sign(message: string): Promise<string | null> {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) return null;
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function auditCapability(id: string) {
  return sign(`audit:${id}`);
}

export async function workerProof(method: string, path: string) {
  return sign(`worker:${method}:${path}`);
}

export async function setAuditCookie(response: NextResponse, id: string) {
  const token = await auditCapability(id);
  if (!token) throw new Error("Audit access is not configured");
  response.cookies.set(cookieName(id), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function canReadAudit(req: Request, id: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(id)) return false;
  const cookie = req.headers.get("cookie")?.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName(id)}=`))?.slice(cookieName(id).length + 1);
  const expected = await auditCapability(id);
  if (expected && cookie && cookie.length === expected.length) {
    const left = encoder.encode(cookie);
    const right = encoder.encode(expected);
    let difference = 0;
    for (let index = 0; index < left.length; index++) difference |= left[index] ^ right[index];
    if (difference === 0) {
      const access = await portfolioAccess(req);
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (url && service) {
        const db = access?.db ?? createClient(url, service, { auth: { persistSession: false } });
        const { data } = await db
          .from("lease_audits").select("user_id").eq("id", id).maybeSingle();
        if (data && (data.user_id === null || data.user_id === access?.userId)) return true;
      }
    }
  }
  const access = await portfolioAccess(req);
  if (!access) return false;
  const { data } = await access.db.from("lease_audits").select("id")
    .eq("id", id).eq("user_id", access.userId).maybeSingle();
  return Boolean(data);
}
