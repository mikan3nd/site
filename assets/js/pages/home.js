function renderHomePage() {
      const newsItems = getDisplayNews();
      const latestNews = newsItems.slice(0, 3);
      const allProducts = getDisplayProducts();
      const featuredProducts = allProducts.slice(0, 3);

      const statusConfig = {
        online: { color: 'bg-emerald-500', label: 'Online' },
        idle: { color: 'bg-amber-400', label: 'Idle' },
        dnd: { color: 'bg-rose-500', label: 'Do Not Disturb' },
        offline: { color: 'bg-slate-400', label: 'Offline' }
      };
      const currentStatus = statusConfig[STATE.discord.status] || statusConfig.offline;
      const defaultDiscordIdx = Number((BigInt(DISCORD_USER_ID) >> 22n) % 6n);
      const defaultDiscordAvatar = `https://cdn.discordapp.com/embed/avatars/${defaultDiscordIdx}.png`;

      return `
        <section class="relative bg-white rounded-[2rem] border border-slate-100 shadow-soft overflow-hidden mb-16">
          <div class="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-r from-accent-blue/65 via-mikan-200/75 to-accent-lavender/65 pointer-events-none"></div>
          <div class="relative z-10 px-6 sm:px-12 pt-10 sm:pt-14 pb-12 sm:pb-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div class="flex items-center w-full md:w-auto">
              <div class="space-y-2 text-center md:text-left mx-auto md:mx-0">
                <h1 class="font-display font-black text-5xl sm:text-7xl text-charcoal tracking-wider">みかん</h1>
                <span class="block text-mikan-500 font-extrabold text-xl sm:text-2xl tracking-wide">Mikan</span>
              </div>
            </div>
            <div class="relative flex justify-center shrink-0">
              <div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2.25rem] bg-gradient-to-br from-mikan-50 to-mikan-100 p-4 sm:p-5 shadow-lg border border-white flex items-center justify-center animate-float">
                <div class="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-white shadow-inner flex items-center justify-center">
                  ${STATE.discord.avatarUrl
                    ? `<img src="${STATE.discord.avatarUrl}" alt="${STATE.discord.username}のアイコン" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${defaultDiscordAvatar}';" class="w-full h-full object-cover" />`
                    : `<div class="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400"><i data-lucide="user" class="w-16 h-16"></i></div>`
                  }
                </div>
                <div title="Discord Status: ${currentStatus.label}" class="absolute -left-4 bottom-8 w-12 h-12 rounded-full bg-mikan-500 text-white shadow-lg flex items-center justify-center border-2 border-white">
                  <span class="w-3.5 h-3.5 rounded-full ${currentStatus.color} block"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-[2rem] border border-slate-100 p-6 sm:p-10 shadow-card">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div class="flex items-center gap-3">
              <span class="w-2 h-6 rounded-full bg-mikan-500"></span>
              <h2 class="font-display font-bold text-2xl text-charcoal tracking-wide">最新のお知らせ</h2>
            </div>
            <a data-route="news" href="./news/" class="inline-flex items-center gap-1.5 text-sm font-bold text-mikan-500 hover:text-mikan-600">お知らせ一覧へ <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
          </div>
          <div class="divide-y divide-slate-100">
            ${latestNews.length ? latestNews.map((item) => {
              const catName = escapeHtml(item.category?.name || item.category || 'お知らせ');
              return `
                <a href="/share/news/${encodeURIComponent(item.id || '')}/" class="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 cursor-pointer group">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div class="flex items-center gap-2.5 shrink-0">
                      <time class="text-xs font-bold text-slate-400 font-mono">${formatDate(item.publishedAt || item.createdAt)}</time>
                      <span class="px-2.5 py-0.5 rounded bg-mikan-50 text-mikan-500 text-xs font-bold">${catName}</span>
                    </div>
                    <h3 class="font-bold text-sm sm:text-base text-charcoal group-hover:text-mikan-500 transition-colors line-clamp-1">${escapeHtml(item.title || '無題のお知らせ')}</h3>
                  </div>
                  <i data-lucide="chevron-right" class="hidden sm:block w-4 h-4 text-slate-400 group-hover:text-mikan-500 group-hover:translate-x-1 transition-all shrink-0"></i>
                </a>
              `;
            }).join('') : (STATE.cmsStatus === 'loading' || STATE.cmsStatus === 'idle' ? '<div class="py-8 text-center text-sm text-slate-500">お知らせを読み込んでいます…</div>' : STATE.cmsStatus === 'error' ? '<div class="py-8 text-center text-sm text-slate-500">お知らせを読み込めませんでした。</div>' : '<div class="py-8 text-center text-sm text-slate-500">現在お知らせはありません。</div>')}
          </div>
        </section>

        <section class="mt-8 sm:mt-10 bg-white rounded-[2rem] border border-slate-100 p-6 sm:p-10 shadow-card">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-7 gap-4">
            <div class="flex items-center gap-3">
              <span class="w-2 h-6 rounded-full bg-mikan-500"></span>
              <div>
                <p class="text-xs font-bold tracking-[.16em] text-mikan-500">MY WORKS</p>
                <h2 class="font-display font-bold text-2xl text-charcoal tracking-wide">プロダクト</h2>
              </div>
            </div>
            <a data-route="products" href="./products/" class="inline-flex items-center gap-1.5 text-sm font-bold text-mikan-500 hover:text-mikan-600">すべてのプロダクト <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${featuredProducts.length ? featuredProducts.map(item => {
              const originalIndex = allProducts.indexOf(item);
              const catName = extractCategoryName(item);
              const thumbUrl = extractThumbnailUrl(item);
              const title = escapeHtml(item.title || item.name || '無題のプロダクト');
              const plainDesc = escapeHtml(stripHtml(item.description || item.content || item.summary || '') || '詳細はプロダクトページをご覧ください。');
              return `
                <article role="button" tabindex="0" onclick="openProductModal(${originalIndex})" class="group min-w-0 cursor-pointer rounded-2xl border border-slate-100 bg-white overflow-hidden hover:border-mikan-300 hover:shadow-soft transition-all">
                  <div class="aspect-video overflow-hidden bg-mikan-50">
                    ${thumbUrl
                      ? `<img src="${thumbUrl}" alt="${title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />`
                      : `<div class="w-full h-full flex items-center justify-center text-mikan-300"><i data-lucide="image" class="w-9 h-9"></i></div>`
                    }
                  </div>
                  <div class="p-5">
                    <span class="inline-flex rounded-full bg-mikan-50 px-3 py-1 text-xs font-bold text-mikan-500">${catName}</span>
                    <h3 class="mt-3 font-display font-bold text-lg text-charcoal line-clamp-1 group-hover:text-mikan-500 transition-colors">${title}</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">${plainDesc}</p>
                    <span class="mt-4 inline-flex items-center gap-1 text-xs font-bold text-mikan-500">詳しく見る <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
                  </div>
                </article>
              `;
            }).join('') : (STATE.productStatus === 'loading' || STATE.productStatus === 'idle' ? '<div class="col-span-full py-8 text-center text-sm text-slate-500">プロダクトを読み込んでいます…</div>' : STATE.productStatus === 'error' ? '<div class="col-span-full py-8 text-center text-sm text-slate-500">プロダクトを読み込めませんでした。</div>' : '<div class="col-span-full py-8 text-center text-sm text-slate-500">現在掲載中のプロダクトはありません。</div>')}
          </div>
        </section>


      `;
    }

    function renderPage() {
      const root = document.getElementById("app-view");
      if (!root) return;
      root.innerHTML = '<div class="page-transition">' + renderHomePage() + '</div>';
      if (typeof lucide !== "undefined") lucide.createIcons();
    }