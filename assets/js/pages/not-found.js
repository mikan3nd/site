function render404Page() {
      return `
        <div class="max-w-2xl mx-auto text-center py-8 sm:py-12">
          <div class="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-14 shadow-soft space-y-6">
            <div class="space-y-2">
              <span class="inline-block px-4 py-1 rounded-full bg-mikan-50 text-mikan-500 font-display font-bold text-sm tracking-widest">
                404 NOT FOUND
              </span>
              <h1 class="font-display font-bold text-2xl sm:text-4xl text-charcoal pt-3 leading-snug">
                お探しのページは、<br>見つかりませんでした
              </h1>
              <p class="text-sm sm:text-base text-slate-600 max-w-md mx-auto pt-2 leading-relaxed">
                アクセスしようとしたページは削除されたか、URLが変更された可能性があります。トップページより改めてお探しください。
              </p>
            </div>

            <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button onclick="navigateTo('home')" class="px-7 py-3.5 rounded-full bg-mikan-500 hover:bg-mikan-600 text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2">
                <i data-lucide="home" class="w-4 h-4"></i>
                Homeへ戻る
              </button>
              <button onclick="navigateTo('news')" class="px-6 py-3.5 rounded-full bg-mikan-50 hover:bg-mikan-100 text-mikan-500 font-bold text-sm transition-all">
                お知らせを見る
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // ==========================================
    // 5. Modals (Product & News Detail)
    // ==========================================
