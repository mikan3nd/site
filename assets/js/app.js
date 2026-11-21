// ==========================================
    // 6. Initialization
    // ==========================================
    window.addEventListener('hashchange', () => {
      const hashRoute = window.location.hash.replace('#', '') || 'home';
      STATE.currentRoute = VALID_ROUTES.includes(hashRoute) ? hashRoute : '404';
      updateActiveNav();
      renderCurrentPage();
    });

    window.addEventListener('DOMContentLoaded', () => {
      const initialHash = window.location.hash.replace('#', '');
      if (initialHash) {
        STATE.currentRoute = VALID_ROUTES.includes(initialHash) ? initialHash : '404';
      }
      updateActiveNav();
      renderCurrentPage();
      // Fetch Discord avatar & status via Lanyard API
      fetchDiscordLanyard();
      // Fetch news articles from microCMS silently
      fetchMicroCMSNews();
      // Fetch products from microCMS silently
      fetchMicroCMSProducts();
    });
