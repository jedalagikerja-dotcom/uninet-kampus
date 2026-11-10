// Pagar Nama UNINET: simpan & tampilkan username yang mengukir namanya sendiri.
import { getStore } from "@netlify/blobs";

const BAD = ["anjing","anjg","babi","kontol","kntl","memek","mmk","ngentot","ngewe","bangsat","bajingan","goblok","tolol","kampret","asu","jancok","jancuk","pepek","lonte","pelacur","fuck","shit","bitch","porn","bokep","sex","seks","xxx","judi","slot","gacor","togel","casino","maxwin","scam","nazi"];
const VALID = /^[a-z0-9._]{1,30}$/;
const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...extra } });

export default async (req) => {
  const store = getStore({ name: "pagar", consistency: "strong" });
  if (req.method === "GET") {
    const { blobs } = await store.list({ prefix: "n/" });
    const names = blobs.map(b => b.key).sort().map(k => k.split("~")[1]);
    return json({ names }, 200, { "cache-control": "public, max-age=20" });
  }
  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch {}
    const u = String(body.username || "").trim().replace(/^@+/, "").toLowerCase();
    if (!VALID.test(u)) return json({ ok: false, reason: "format" }, 400);
    const flat = u.replace(/[._0-9]/g, "");
    if (BAD.some(w => flat.includes(w))) return json({ ok: false, reason: "kata" }, 400);
    if (await store.get("u/" + u)) return json({ ok: true, already: true });
    const key = "n/" + String(Date.now()).padStart(15, "0") + "~" + u;
    await store.set("u/" + u, key);
    await store.set(key, "1");
    return json({ ok: true });
  }
  return json({ ok: false }, 405);
};

export const config = { path: "/api/pagar" };
