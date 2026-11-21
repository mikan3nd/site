function renderNewsPage() {
      const displayArticles = getDisplayNews();

      return `
        <div class="space-y-8">
          <!-- Page Header -->
          <div class="bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-10 shadow-card">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mikan-50 text-mikan-500 text-xs font-bold mb-2">
              <i data-lucide="rss" class="w-3.5 h-3.5"></i> News & Updates
            </div>
            <h1 class="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-wide">お知らせ</h1>
            <p class="text-slate-600 text-sm sm:text-base mt-2">
              「みかん」の最新の活動情報やイベント・リリースのお知らせをお届けします。
            </p>
          </div>

          <!-- News List -->
          <div class="space-y-4">
            ${displayArticles.map((article, idx) => {
              const catName = article.category?.name || article.category || 'お知らせ';
              const excerpt = stripHtml(article.content || article.body || article.description || '記事の詳細をクリックしてご覧ください。');
              return `
                <article role="button" tabindex="0" onclick="openNewsModal(${idx})" class="group cursor-pointer bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-card hover:shadow-soft hover:border-mikan-300 transition-all">
                  <div class="flex flex-wrap items-center gap-3 mb-2.5">
                    <time class="text-xs font-bold font-mono text-slate-400">${formatDate(article.publishedAt || article.createdAt)}</time>
                    <span class="px-3 py-0.5 rounded bg-mikan-50 text-mikan-500 text-xs font-bold">${catName}</span>
                  </div>
                  <h2 class="font-display font-bold text-lg sm:text-xl text-charcoal group-hover:text-mikan-500 transition-colors">
                    ${article.title || '無題のお知らせ'}
                  </h2>
                  <p class="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    ${excerpt}
                  </p>
                  <div class="mt-4 flex items-center text-xs font-bold text-mikan-500 group-hover:translate-x-1 transition-transform">
                    記事全文を読む <i data-lucide="chevron-right" class="w-4 h-4 ml-0.5"></i>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // --- 4.3 SNS PAGE ---


function renderPage() {
 const root = document.getElementById("app-view");
 if (!root) return;
 root.innerHTML = '<div class="page-transition">' + renderNewsPage() + '</div>';
 if (typeof lucide !== "undefined") lucide.createIcons();
}
