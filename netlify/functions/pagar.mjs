// Pagar Nama + kursi Angkatan Kedua UNINET.
import { getStore } from "@netlify/blobs";

const BAD = ["anjing","anjg","babi","kontol","kntl","memek","mmk","ngentot","ngewe","bangsat","bajingan","goblok","tolol","kampret","asu","jancok","jancuk","pepek","lonte","pelacur","fuck","shit","bitch","porn","bokep","sex","seks","xxx","judi","slot","gacor","togel","casino","maxwin","scam","nazi"];
const VALID = /^[a-z0-9._]{1,30}$/;
const KUOTA = 100000;
const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...extra } });
async function allKeys(store) { const { blobs } = await store.list({ prefix: "n/" }); return blobs.map(b => b.key).sort(); }

export default async (req) => {
  const store = getStore({ name: "pagar", consistency: "strong" });
  if (req.method === "GET") {
    const keys = await allKeys(store);
    return json({ names: keys.map(k => k.split("~")[1]), count: keys.length, kuota: KUOTA }, 200, { "cache-control": "public, max-age=15" });
  }
  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch {}
    const u = String(body.username || "").trim().replace(/^@+/, "").toLowerCase();
    if (!VALID.test(u)) return json({ ok: false, reason: "format" }, 400);
    const flat = u.replace(/[._0-9]/g, "");
    if (BAD.some(w => flat.includes(w))) return json({ ok: false, reason: "kata" }, 400);
    const prev = await store.get("u/" + u);
    if (prev) {
      let rec; try { rec = JSON.parse(prev); } catch { rec = { key: prev }; }
      if (!rec.seat) { const keys = await allKeys(store); rec.seat = keys.indexOf(rec.key) + 1; await store.set("u/" + u, JSON.stringify(rec)); }
      return json({ ok: true, already: true, seat: rec.seat, kuota: KUOTA });
    }
    const key = "n/" + String(Date.now()).padStart(15, "0") + "~" + u;
    await store.set(key, "1");
    const keys = await allKeys(store);
    const seat = keys.indexOf(key) + 1;
    await store.set("u/" + u, JSON.stringify({ key, seat }));
    return json({ ok: true, seat, kuota: KUOTA });
  }
  return json({ ok: false }, 405);
};

export const config = { path: "/api/pagar" };
