
/* Shared site runtime */
const SITE_ROOT = document.body.dataset.root || "./";
const CURRENT_PAGE = document.body.dataset.page || "home";
STATE.currentRoute = CURRENT_PAGE;

function routeHref(route) {
  return route === "home" ? SITE_ROOT : SITE_ROOT + route + "/";
}
function updateActiveNav() {
  document.querySelectorAll("[data-route]").forEach(link => {
    const active = link.dataset.route === CURRENT_PAGE;
    if (link.classList.contains("nav-btn")) {
      link.classList.toggle("text-mikan-500", active);
      link.classList.toggle("border-b-2", active);
      link.classList.toggle("border-mikan-500", active);
      link.classList.toggle("text-charcoal", !active);
    }
    if (link.classList.contains("mobile-nav-btn")) {
      link.classList.toggle("bg-mikan-50", active);
      link.classList.toggle("text-mikan-500", active);
      link.classList.toggle("border-mikan-300", active);
    }
    if (link.tagName === "A") link.href = routeHref(link.dataset.route);
  });
}
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const button = document.getElementById("mobile-menu-btn");
  if (!menu) return;
  const willOpen = menu.classList.contains("hidden");
  menu.classList.toggle("hidden");
  button?.setAttribute("aria-expanded", String(willOpen));
}
function showToast(message) {
  const toast = document.getElementById("toast");
  const label = document.getElementById("toast-message");
  if (!toast || !label) return;
  label.textContent = message;
  toast.classList.remove("translate-y-24", "opacity-0");
  window.setTimeout(() => toast.classList.add("translate-y-24", "opacity-0"), 3200);
}
async function loadSharedLayout() {
  const [header, footer, overlays] = await Promise.all(
    ["header.html", "footer.html", "overlays.html"].map(async file => {
      const response = await fetch(SITE_ROOT + "components/" + file);
      if (!response.ok) throw new Error("共通レイアウトを読み込めません: " + file);
      return response.text();
    })
  );
  const main = document.getElementById("app-view");
  main.insertAdjacentHTML("beforebegin", header);
  main.insertAdjacentHTML("afterend", footer);
  document.body.insertAdjacentHTML("beforeend", overlays);
  updateActiveNav();
  installBackToTop();
}

function installBackToTop() {
  if (document.getElementById("back-to-top")) return;
  const button = document.createElement("button");
  button.id = "back-to-top";
  button.type = "button";
  button.setAttribute("aria-label", "ページの先頭へ戻る");
  button.setAttribute("title", "ページの先頭へ戻る");
  button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/><path d="M12 21V9"/></svg>';
  document.body.appendChild(button);

  const updateVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 360);
  };
  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
}
window.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadSharedLayout();
    if (typeof renderPage === "function") renderPage();
    fetchDiscordLanyard();
    fetchMicroCMSNews();
    fetchMicroCMSProducts();
    lucide.createIcons();
  } catch (error) {
    console.error(error);
    const main = document.getElementById("app-view");
    if (main) main.innerHTML = '<p class="rounded-2xl bg-white p-6 text-center text-slate-600">ページの読み込みに失敗しました。時間をおいて再度お試しください。</p>';
  }
});
