import { getContent, plainText, categoryName, escapeHtml, safeId } from "../_lib/content.js";

const xml = value => escapeHtml(value).replace(/&#39;/g, "&apos;");
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const type = parts[1];
  const id = safeId((parts[2] || "").replace(/\.svg$/i, ""));
  if (!["news", "products"].includes(type) || !id) return new Response("Not Found", { status: 404 });
  try {
    const item = await getContent(type, id);
    if (!item) return new Response("Not Found", { status: 404, headers: { "Cache-Control": "no-store" } });
    const title = String(item.title || item.name || "みかん");
    const category = categoryName(item);
    const description = plainText(item.content || item.body || item.description || item.summary || "");
    const heading = title.length > 34 ? title.slice(0, 33) + "…" : title;
    const sub = description.length > 56 ? description.slice(0, 55) + "…" : description;
    const label = type === "news" ? "NEWS" : "PRODUCT";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8f2"/><stop offset="1" stop-color="#f0f3ff"/></linearGradient><linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f49a61"/><stop offset="1" stop-color="#d96c38"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#bg)"/><circle cx="1080" cy="80" r="260" fill="#f5b27d" opacity=".16"/><circle cx="80" cy="600" r="240" fill="#8798d8" opacity=".12"/>
<rect x="64" y="64" width="1072" height="502" rx="34" fill="#fff" stroke="#e8eaf0" stroke-width="2"/>
<rect x="104" y="108" width="150" height="42" rx="21" fill="url(#accent)"/><text x="179" y="136" fill="#fff" font-family="Arial,sans-serif" font-size="19" font-weight="700" text-anchor="middle" letter-spacing="2">${xml(label)}</text>
<text x="104" y="206" fill="#d66b36" font-family="sans-serif" font-size="22" font-weight="700">${xml(category.slice(0,22))}</text>
<text x="104" y="310" fill="#20283f" font-family="'Noto Sans JP',sans-serif" font-size="54" font-weight="800">${xml(heading)}</text>
<text x="104" y="382" fill="#687187" font-family="'Noto Sans JP',sans-serif" font-size="25">${xml(sub)}</text>
<path d="M104 456H1096" stroke="#edf0f5" stroke-width="2"/><text x="104" y="514" fill="#20283f" font-family="Arial,sans-serif" font-size="27" font-weight="800" letter-spacing="3">MIKAN</text>
<text x="1096" y="514" fill="#9299a9" font-family="sans-serif" font-size="18" text-anchor="end">Mikan Official Website</text></svg>`;
    return new Response(svg, { headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff"
    }});
  } catch (error) {
    return new Response("Not Found", { status: 404, headers: { "Cache-Control": "no-store" } });
  }
}
