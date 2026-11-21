function getDisplayProducts() {
      if (STATE.productStatus === 'success' && STATE.productItems.length > 0) {
        return STATE.productItems;
      }
      return FALLBACK_PRODUCTS;
    }

    function extractCategoryName(item) {
      if (!item || !item.category) return 'その他';
      if (Array.isArray(item.category)) {
        const first = item.category[0];
        if (!first) return 'その他';
        return typeof first === 'object' ? (first.name || first.title || 'その他') : String(first);
      }
      if (typeof item.category === 'object') {
        return item.category.name || item.category.title || 'その他';
      }
      return String(item.category);
    }

    function extractThumbnailUrl(item) {
      if (!item) return null;
      const imgField = item.thumbnail || item.eyecatch || item.image || item.cover;
      if (!imgField) return null;
      if (typeof imgField === 'string') return imgField;
      if (imgField.url) return imgField.url;
      return null;
    }

    // Helper to get active news list (live microCMS or silent fallback)
    function getDisplayNews() {
      if (STATE.cmsStatus === 'success' && STATE.cmsArticles.length > 0) {
        return STATE.cmsArticles;
      }
      return FALLBACK_NEWS;
    }

    // Format ISO Date to YYYY.MM.DD
    function formatDate(isoString) {
      if (!isoString) return '2026.11.20';
      try {
        const d = new Date(isoString);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}.${m}.${day}`;
      } catch {
        return isoString.slice(0, 10);
      }
    }

    // Strip HTML tags for plain text excerpt
    function stripHtml(html) {
      if (!html) return '';
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }


/* Sanitize rich text received from microCMS before inserting it into the page. */
function sanitizeCmsHtml(input) {
  const template = document.createElement("template");
  template.innerHTML = String(input || "");

  const allowedTags = new Set([
    "P", "BR", "STRONG", "B", "EM", "I", "U", "S",
    "UL", "OL", "LI", "H1", "H2", "H3", "H4",
    "BLOCKQUOTE", "PRE", "CODE", "A", "IMG", "FIGURE",
    "FIGCAPTION", "TABLE", "THEAD", "TBODY", "TR",
    "TH", "TD", "HR", "DIV", "SPAN"
  ]);
  const blockedTags = new Set([
    "SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "FORM",
    "INPUT", "BUTTON", "META", "LINK", "SVG", "MATH",
    "VIDEO", "AUDIO", "SOURCE", "TEMPLATE"
  ]);

  const safeUrl = (value, allowMailto = false) => {
    try {
      const parsed = new URL(value, window.location.origin);
      return parsed.protocol === "https:" || parsed.protocol === "http:" ||
        (allowMailto && parsed.protocol === "mailto:");
    } catch {
      return false;
    }
  };

  const clean = parent => {
    Array.from(parent.childNodes).forEach(node => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        if (node.nodeType !== Node.TEXT_NODE) node.remove();
        return;
      }

      const tag = node.tagName;
      if (blockedTags.has(tag)) {
        node.remove();
        return;
      }

      clean(node);
      if (!allowedTags.has(tag)) {
        node.replaceWith(...Array.from(node.childNodes));
        return;
      }

      Array.from(node.attributes).forEach(attribute => {
        const name = attribute.name.toLowerCase();
        const allowed = (tag === "A" && ["href", "title"].includes(name)) ||
          (tag === "IMG" && ["src", "alt", "title", "width", "height"].includes(name)) ||
          (["TH", "TD"].includes(tag) && ["colspan", "rowspan", "scope"].includes(name));
        if (!allowed) node.removeAttribute(attribute.name);
      });

      if (tag === "A") {
        const href = node.getAttribute("href");
        if (href && !safeUrl(href, true)) node.removeAttribute("href");
        if (node.getAttribute("href")) {
          node.setAttribute("target", "_blank");
          node.setAttribute("rel", "noopener noreferrer");
        }
      }

      if (tag === "IMG") {
        const src = node.getAttribute("src");
        if (!src || !safeUrl(src)) node.remove();
        else {
          node.setAttribute("loading", "lazy");
          node.setAttribute("decoding", "async");
        }
      }
    });
  };

  clean(template.content);
  return template.innerHTML;
}
