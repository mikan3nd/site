const CMS = {
  news: { domain: "swe2db8jva", endpoint: "news", key: "ksq03pQ5FRz9yDM47YPdyxlqhzlQir5TGStQ" },
  products: { domain: "mikan-product", endpoint: "blogs", key: "0zDNjpizK50XUrNzpSB4eVhwyXDB8QQeI0p5" }
};

export async function getContent(type, id) {
  const config = CMS[type];
  if (!config || !id || id.length > 128) return null;
  const endpoint = `https://${config.domain}.microcms.io/api/v1/${config.endpoint}/${encodeURIComponent(id)}`;
  const response = await fetch(endpoint, {
    headers: { "X-MICROCMS-API-KEY": config.key },
    cf: { cacheTtl: 0, cacheEverything: false }
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`microCMS returned ${response.status}`);
  return response.json();
}

export function plainText(value) {
  return String(value || "")
    .replace(/<\/(p|div|h[1-6]|li|br|blockquote)>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function imageUrl(item, type) {
  const value = type === "news"
    ? (item.eyecatch || item.thumbnail || item.image)
    : (item.thumbnail || item.eyecatch || item.image || item.cover);
  const url = typeof value === "string" ? value : value?.url;
  return typeof url === "string" && /^https:\/\//i.test(url) ? url : "";
}

export function categoryName(item) {
  const value = item.category;
  if (Array.isArray(value)) return String(value[0]?.name || value[0]?.title || value[0] || "お知らせ");
  if (value && typeof value === "object") return String(value.name || value.title || "お知らせ");
  return String(value || "お知らせ");
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

export function safeId(value) {
  return /^[A-Za-z0-9_-]{1,128}$/.test(value) ? value : "";
}
