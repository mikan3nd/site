function renderContactPage() {
      return `
        <div class="max-w-2xl mx-auto text-center py-8">
          <div class="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-14 shadow-soft space-y-6">
            <div class="w-16 h-16 rounded-2xl bg-mikan-500 text-white flex items-center justify-center mx-auto shadow-md">
              <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </div>

            <div class="space-y-2">
              <span class="font-script text-2xl text-mikan-500 brush-lavender">Contact</span>
              <h1 class="font-display font-bold text-2xl sm:text-3xl text-charcoal pt-1 tracking-wide">お問い合わせ</h1>
              <p class="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                お問い合わせやご連絡は、X（Twitter）のDMまたはリプライにてお気軽にお寄せください。
              </p>
            </div>

            <div class="pt-4">
              <a href="https://x.com/mikan3nd" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-mikan-500 hover:bg-mikan-600 text-white font-bold text-sm shadow-lg transition-all">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                @mikan3nd のDMを送る
              </a>
            </div>
          </div>
        </div>
      `;
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      const form = document.getElementById('contact-form');
      const success = document.getElementById('contact-success');
      form.classList.add('hidden');
      success.classList.remove('hidden');
      showToast('お問い合わせを受け付けました（デモ送信）');
    }

    function resetContactForm() {
      const form = document.getElementById('contact-form');
      const success = document.getElementById('contact-success');
      form.reset();
      success.classList.add('hidden');
      form.classList.remove('hidden');
    }

    // --- 4.6 404 NOT FOUND PAGE ---


function renderPage() {
 const root = document.getElementById("app-view");
 if (!root) return;
 root.innerHTML = '<div class="page-transition">' + renderContactPage() + '</div>';
 if (typeof lucide !== "undefined") lucide.createIcons();
}
