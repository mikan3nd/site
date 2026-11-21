function navigateTo(route, event) {
      if (event) event.preventDefault();
      const targetRoute = VALID_ROUTES.includes(route) ? route : '404';
      STATE.currentRoute = targetRoute;
      window.location.hash = targetRoute;
      updateActiveNav();
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateActiveNav() {
      document.querySelectorAll('.nav-btn').forEach(btn => {
        const r = btn.getAttribute('data-route');
        if (r === STATE.currentRoute) {
          btn.classList.add('text-mikan-500', 'border-b-2', 'border-mikan-500');
          btn.classList.remove('text-charcoal', 'hover:text-mikan-500');
        } else {
          btn.classList.remove('text-mikan-500', 'border-b-2', 'border-mikan-500');
          btn.classList.add('text-charcoal', 'hover:text-mikan-500');
        }
      });

      document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        const r = btn.getAttribute('data-route');
        if (r === STATE.currentRoute) {
          btn.classList.add('bg-mikan-50', 'text-mikan-500', 'border-mikan-300');
        } else {
          btn.classList.remove('bg-mikan-50', 'text-mikan-500', 'border-mikan-300');
        }
      });
    }

    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toast-message').textContent = msg;
      toast.classList.remove('translate-y-24', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
      }, 3200);
    }

    // ==========================================
    // 4. Page Renderers
    // ==========================================
    function renderCurrentPage() {
      const container = document.getElementById('app-view');
      let html = '';

      switch (STATE.currentRoute) {
        case 'home':
          html = renderHomePage();
          break;
        case 'products':
          html = renderProductsPage();
          break;
        case 'news':
          html = renderNewsPage();
          break;
        case 'sns':
          html = renderSnsPage();
          break;
        case 'contact':
          html = renderContactPage();
          break;
        default:
          html = render404Page();
          break;
      }

      container.innerHTML = `<div class="page-transition">${html}</div>`;
      lucide.createIcons();
    }

    // --- 4.1 HOME PAGE ---
