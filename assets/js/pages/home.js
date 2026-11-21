function renderHomePage() {
      const newsItems = getDisplayNews();
      const latestNews = newsItems.slice(0, 3);

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
        <!-- Hero Section (Inspired by clean academic/editorial layout) -->
        <section class="relative bg-white rounded-[2rem] border border-slate-100 shadow-soft overflow-hidden mb-16">
          <!-- Bottom Periwinkle/Lavender Accent Band -->
          <div class="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-r from-accent-blue/65 via-mikan-200/75 to-accent-lavender/65 pointer-events-none"></div>

          <div class="relative z-10 px-6 sm:px-12 pt-10 sm:pt-14 pb-12 sm:pb-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <!-- Left: Large Title -->
            <div class="flex items-center w-full md:w-auto">
              <div class="space-y-2 text-center md:text-left mx-auto md:mx-0">
                <!-- Large Name -->
                <h1 class="font-display font-black text-5xl sm:text-7xl text-charcoal tracking-wider">
                  みかん
                </h1>
                <span class="block text-mikan-500 font-extrabold text-xl sm:text-2xl tracking-wide">Mikan</span>
              </div>
            </div>

            <!-- Right: Rounded Framing Card with Discord Avatar (Lanyard API) -->
            <div class="relative flex justify-center shrink-0">
              <div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2.25rem] bg-gradient-to-br from-mikan-50 to-mikan-100 p-4 sm:p-5 shadow-lg border border-white flex items-center justify-center animate-float">
                <div class="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-white shadow-inner flex items-center justify-center">
                  ${STATE.discord.avatarUrl
                    ? `<img src="${STATE.discord.avatarUrl}" alt="${STATE.discord.username}のアイコン" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${defaultDiscordAvatar}';" class="w-full h-full object-cover" />`
                    : `<div class="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
                         <i data-lucide="user" class="w-16 h-16"></i>
                       </div>`
                  }
                </div>

                <!-- Navy Circular Arrow/Status Badge -->
                <div title="Discord Status: ${currentStatus.label}" class="absolute -left-4 bottom-8 w-12 h-12 rounded-full bg-mikan-500 text-white shadow-lg flex items-center justify-center border-2 border-white">
                  <span class="w-3.5 h-3.5 rounded-full ${currentStatus.color} block"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Latest News Excerpt -->
        <section class="bg-white rounded-[2rem] border border-slate-100 p-6 sm:p-10 shadow-card">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div class="flex items-center gap-3">
              <span class="w-2 h-6 rounded-full bg-mikan-500"></span>
              <h2 class="font-display font-bold text-2xl text-charcoal tracking-wide">最新のお知らせ</h2>
            </div>
            <button onclick="navigateTo('news')" class="inline-flex items-center gap-1.5 text-sm font-bold text-mikan-500 hover:text-mikan-600">
              お知らせ一覧へ <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="divide-y divide-slate-100">
            ${latestNews.map((item, idx) => {
              const catName = item.category?.name || item.category || 'お知らせ';
              return `
                <article onclick="openNewsModal(${idx})" class="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 cursor-pointer group">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div class="flex items-center gap-2.5 shrink-0">
                      <time class="text-xs font-bold text-slate-400 font-mono">${formatDate(item.publishedAt || item.createdAt)}</time>
                      <span class="px-2.5 py-0.5 rounded bg-mikan-50 text-mikan-500 text-xs font-bold">${catName}</span>
                    </div>
                    <h3 class="font-bold text-sm sm:text-base text-charcoal group-hover:text-mikan-500 transition-colors line-clamp-1">
                      ${item.title || '無題のお知らせ'}
                    </h3>
                  </div>
                  <i data-lucide="chevron-right" class="hidden sm:block w-4 h-4 text-slate-400 group-hover:text-mikan-500 group-hover:translate-x-1 transition-all shrink-0"></i>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }

    // --- 4.1.5 PRODUCTS PAGE (microCMS: mikan-product) ---
