const CMS = {
  news: { domain: "swe2db8jva", endpoint: "news", key: "ksq03pQ5FRz9yDM47YPdyxlqhzlQir5TGStQ" },
  products: { domain: "mikan-product", endpoint: "blogs", key: "0zDNjpizK50XUrNzpSB4eVhwyXDB8QQeI0p5" }
};

async function cmsFetch(url, key) {
  return fetch(url, { headers: { "X-MICROCMS-API-KEY": key } });
}

async function findInCollection(config, id) {
  const base = "https://" + config.domain + ".microcms.io/api/v1/" + config.endpoint;
  const limit = 100;
  let offset = 0;
  let totalCount = Infinity;
  while (offset < totalCount && offset < 1000) {
    const response = await cmsFetch(base + "?limit=" + limit + "&offset=" + offset, config.key);
    if (!response.ok) throw new Error("microCMS collection returned " + response.status);
    const data = await response.json();
    const items = Array.isArray(data.contents) ? data.contents : [];
    const found = items.find(item => item && item.id === id);
    if (found) return found;
    totalCount = Number(data.totalCount) || 0;
    if (items.length === 0) break;
    offset += items.length;
  }
  return null;
}

export async function getContent(type, id) {
  const config = CMS[type];
  if (!config || !id || id.length > 128) return null;
  const endpoint = "https://" + config.domain + ".microcms.io/api/v1/" + config.endpoint + "/" + encodeURIComponent(id);
  try {
    const response = await cmsFetch(endpoint, config.key);
    if (response.ok) return await response.json();
  } catch (error) {
    // Try the collection endpoint below.
  }
  return findInCollection(config, id);
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
  const value = type === "news" ? (item.eyecatch || item.thumbnail || item.image) : (item.thumbnail || item.eyecatch || item.image || item.cover);
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