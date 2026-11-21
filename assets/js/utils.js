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

    // ==========================================
    // 3. Router & Navigation
    // ==========================================
    const VALID_ROUTES = ['home', 'products', 'news', 'sns', 'contact', '404'];
