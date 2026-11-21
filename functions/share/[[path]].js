import { getContent, plainText, imageUrl, categoryName, escapeHtml, safeId } from "../_lib/content.js";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const type = parts[1];
  const id = safeId(parts[2] || "");
  if (!["news", "products"].includes(type) || !id) return new Response("Not Found", { status: 404 });
  try {
    const item = await getContent(type, id);
    if (!item) return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
    });
    const title = String(item.title || item.name || (type === "news" ? "お知らせ" : "プロダクト"));
    const body = plainText(item.content || item.body || item.description || item.summary || "");
    const description = (body || (type === "news" ? "みかんからのお知らせです。" : "みかんが制作したプロダクトです。")).slice(0, 180);
    const category = categoryName(item);
    const canonical = `${url.origin}/share/${type}/${encodeURIComponent(id)}/`;
    const ogImage = `${url.origin}/og/${type}/${encodeURIComponent(id)}.svg`;
    const image = imageUrl(item, type);
    const published = item.publishedAt || item.createdAt || item.updatedAt || "";
    const pageTitle = `${title} | みかん`;
    const contentHtml = body
      ? body.split(/\n+/).map(line => `<p>${escapeHtml(line)}</p>`).join("")
      : "<p>本文はありません。</p>";
    const imageHtml = image ? `<img class="cover" src="${escapeHtml(image)}" alt="">` : "";
    const kind = type === "news" ? "お知らせ" : "プロダクト";
    const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(pageTitle)}</title><meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta property="og:type" content="article"><meta property="og:site_name" content="みかん">
<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonical)}"><meta property="og:image" content="${escapeHtml(ogImage)}">
<meta property="og:image:type" content="image/svg+xml"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${escapeHtml(ogImage)}">
<style>
*{box-sizing:border-box}body{margin:0;background:#f5f6fa;color:#20283f;font-family:system-ui,-apple-system,"Noto Sans JP",sans-serif;line-height:1.8}
header{background:#fff;border-bottom:1px solid #e8eaf0;padding:18px max(22px,calc((100% - 900px)/2));font-weight:800}
main{max-width:900px;margin:42px auto;padding:0 22px}.card{background:#fff;border:1px solid #e8eaf0;border-radius:24px;padding:clamp(22px,5vw,48px);box-shadow:0 12px 36px #1e2b580c}
.tag{display:inline-block;background:#fff1e9;color:#d66b36;padding:3px 13px;border-radius:30px;font-size:12px;font-weight:700}
h1{font-size:clamp(27px,5vw,42px);line-height:1.4;margin:18px 0 12px}.date{color:#9299a9;font-size:13px}.cover{width:100%;max-height:420px;object-fit:cover;border-radius:16px;margin:22px 0}
.content{margin-top:28px;padding-top:24px;border-top:1px solid #edf0f5;white-space:normal;overflow-wrap:anywhere}.content p{margin:0 0 1em}
.back{display:inline-block;margin-top:26px;color:#d66b36;text-decoration:none;font-weight:700}
</style></head><body><header><a href="/" style="color:inherit;text-decoration:none">Mikan / みかん</a></header>
<main><article class="card"><span class="tag">${escapeHtml(category || kind)}</span><h1>${escapeHtml(title)}</h1>
${published ? `<div class="date">${escapeHtml(String(published).slice(0,10).replace(/-/g,"."))}</div>` : ""}
${imageHtml}<div class="content">${contentHtml}</div><a class="back" href="/${type}/">← ${kind}一覧へ戻る</a></article></main></body></html>`;
    return new Response(html, { headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex"
    }});
  } catch (error) {
    return new Response("一時的にページを表示できません。", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
    });
  }
}
