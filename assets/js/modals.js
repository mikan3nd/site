function createShareMenu(type, item) {
      const title = item.title || item.name || 'みかん';
      const id = String(item.id || '');
      if (!id || id.startsWith('sample-')) return '';
      const safeType = type === 'news' ? 'news' : 'products';
      // Always share the CMS item's own detail URL, never the section/list URL.
      const shareUrl = window.location.origin + '/share/' + safeType + '/' + encodeURIComponent(id) + '/';
      return `
        <section class="share-panel" aria-label="共有メニュー">
          <div class="share-panel-heading"><i data-lucide="share-2" class="w-4 h-4"></i><span>この記事を共有</span></div>
          <div class="share-actions">
            <button type="button" onclick="shareItemAction(this, 'native')" data-share-title="${escapeHtml(title)}" data-share-url="${escapeHtml(shareUrl)}"><i data-lucide="share" class="w-4 h-4"></i><span>共有する</span></button>
            <button type="button" onclick="shareItemAction(this, 'copy')" data-share-title="${escapeHtml(title)}" data-share-url="${escapeHtml(shareUrl)}"><i data-lucide="copy" class="w-4 h-4"></i><span>リンクをコピー</span></button>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer"><i data-lucide="twitter" class="w-4 h-4"></i><span>X</span></a>
            <a href="https://line.me/R/msg/text/?${encodeURIComponent(title + ' ' + shareUrl)}" target="_blank" rel="noopener noreferrer"><i data-lucide="message-circle" class="w-4 h-4"></i><span>LINE</span></a>
          </div>
        </section>
      `;
    }

    async function shareItemAction(button, action) {
      const title = button.dataset.shareTitle || 'みかん';
      const url = button.dataset.shareUrl || window.location.href;
      if (action === 'native') {
        if (navigator.share) {
          try { await navigator.share({ title, text: title, url }); }
          catch (error) { if (error.name !== 'AbortError') showToast('共有を開始できませんでした'); }
        } else {
          await copyShareUrl(url);
        }
      } else if (action === 'copy') {
        await copyShareUrl(url);
      }
    }

    async function copyShareUrl(url) {
      try {
        await navigator.clipboard.writeText(url);
        showToast('リンクをコピーしました');
      } catch {
        const field = document.createElement('textarea');
        field.value = url;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        showToast(copied ? 'リンクをコピーしました' : 'コピーできませんでした');
      }
    }

    function openSharedItemFromUrl(type) {
      const id = new URLSearchParams(window.location.search).get('id');
      if (!id) return;
      const items = type === 'news' ? getDisplayNews() : getDisplayProducts();
      const index = items.findIndex(item => String(item.id || '') === id);
      if (index < 0) return;
      if (type === 'news') openNewsModal(index);
      else openProductModal(index);
    }

    function openProductModal(index) {
      const items = getDisplayProducts();
      const item = items[index];
      if (!item) return;

      const catName = escapeHtml(extractCategoryName(item));
      const thumbUrl = extractThumbnailUrl(item);
      const title = escapeHtml(item.title || item.name || '無題のプロダクト');
      const bodyHtml = sanitizeCmsHtml(item.content || item.body || `<p>${escapeHtml(item.description || item.summary || '詳細情報はありません。')}</p>`);
      const rawLinkUrl = item.url || item.link || item.siteUrl || '';
      const linkUrl = safeHttpUrl(rawLinkUrl === '#home' ? routeHref('home') : rawLinkUrl);

      const modalBody = document.getElementById('modal-body');
      modalBody.innerHTML = `
        <article class="space-y-5">
          <div>
            <span class="px-3 py-1 rounded-full bg-mikan-100 text-mikan-800 text-xs font-bold">${catName}</span>
          </div>

          ${thumbUrl ? `
            <img src="${thumbUrl}" alt="${title}" class="w-full aspect-video object-cover rounded-2xl border border-mikan-100" />
          ` : ''}

          <h2 class="font-display font-black text-2xl sm:text-3xl text-charcoal leading-snug">
            ${title}
          </h2>

          <div class="pt-4 border-t border-mikan-100 text-sm sm:text-base text-neutral-700 cms-content">
            ${bodyHtml}
          </div>

          ${linkUrl ? `
            <div class="pt-2">
              <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mikan-500 hover:bg-mikan-600 text-white font-bold text-sm shadow-md transition-all">
                サイト・作品を見る <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          ` : ''}
          ${createShareMenu('products', item)}
        </article>
      `;
      openModal();
    }

    function openNewsModal(index) {
      const items = getDisplayNews();
      const article = items[index];
      if (!article) return;

      const catName = escapeHtml(article.category?.name || article.category || 'お知らせ');
      const bodyHtml = sanitizeCmsHtml(article.content || article.body || `<p>${escapeHtml(article.description || '本文データがありません。')}</p>`);

      const modalBody = document.getElementById('modal-body');
      modalBody.innerHTML = `
        <article class="space-y-5">
          <div class="flex flex-wrap items-center gap-2.5">
            <time class="text-xs font-bold font-mono text-neutral-400">${formatDate(article.publishedAt || article.createdAt)}</time>
            <span class="px-3 py-0.5 rounded-full bg-mikan-100 text-mikan-800 text-xs font-bold">${catName}</span>
          </div>

          <h2 class="font-display font-black text-2xl sm:text-3xl text-charcoal leading-snug">
            ${escapeHtml(article.title || '無題のお知らせ')}
          </h2>

          ${article.eyecatch?.url ? `
            <img src="${safeHttpUrl(article.eyecatch.url)}" alt="${escapeHtml(article.title || '')}" class="w-full h-56 object-cover rounded-2xl border border-mikan-100" />
          ` : ''}

          <div class="pt-4 border-t border-mikan-100 text-sm sm:text-base text-neutral-700 cms-content">
            ${bodyHtml}
          </div>
          ${createShareMenu('news', article)}
        </article>
      `;
      openModal();
    }

    function openModal() {
      const modal = document.getElementById('detail-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    }

    function closeModal() {
      const modal = document.getElementById('detail-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    function closeModalOnBackdrop(e) {
      if (e.target.id === 'detail-modal') {
        closeModal();
      }
    }
