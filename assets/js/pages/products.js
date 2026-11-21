function setProductCategory(cat) {
      STATE.selectedProductCategory = cat;
      renderPage();
    }

    function renderProductsPage() {
      const allProducts = getDisplayProducts();
      const categories = ['すべて', ...new Set(allProducts.map(p => extractCategoryName(p)).filter(Boolean))];
      const currentCat = categories.includes(STATE.selectedProductCategory) ? STATE.selectedProductCategory : 'すべて';
      const productMessage = STATE.productStatus === 'loading' || STATE.productStatus === 'idle' ? '<div class="col-span-full rounded-2xl border border-slate-100 bg-white p-10 text-center text-slate-500">プロダクトを読み込んでいます…</div>' : STATE.productStatus === 'error' ? '<div class="col-span-full rounded-2xl border border-slate-100 bg-white p-10 text-center text-slate-500">プロダクトを読み込めませんでした。時間をおいて再度お試しください。</div>' : '<div class="col-span-full rounded-2xl border border-slate-100 bg-white p-10 text-center"><p class="font-bold text-charcoal">現在掲載中のプロダクトはありません</p><p class="mt-2 text-sm text-slate-500">新しい制作物を公開した際に、こちらに掲載します。</p></div>';

      const filteredProducts = currentCat === 'すべて'
        ? allProducts
        : allProducts.filter(p => extractCategoryName(p) === currentCat);

      return `
        <div class="space-y-8">
          <!-- Page Header & Category Filter at Top -->
          <div class="bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-10 shadow-card space-y-6">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mikan-50 text-mikan-500 text-xs font-bold mb-2">
                <i data-lucide="layers" class="w-3.5 h-3.5"></i> Products
              </div>
              <h1 class="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-wide">プロダクト</h1>
              <p class="text-slate-600 text-sm sm:text-base mt-2">
                これまで制作したWebサイト・アプリ・デザイン作品の一覧です。
              </p>
            </div>

            <!-- Top Category Tabs -->
            <div class="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
              ${categories.map(cat => {
                const isActive = cat === currentCat;
                return `
                  <button
                    onclick="setProductCategory(this.dataset.category)" data-category="${escapeHtml(cat)}"
                    class="px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-mikan-500 text-white shadow-sm'
                        : 'bg-mikan-50 text-mikan-500 hover:bg-mikan-100'
                    }">
                    ${escapeHtml(cat)}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Products Grid (Category -> Thumbnail -> Title -> Description) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filteredProducts.length ? filteredProducts.map((item) => {
              const originalIndex = allProducts.indexOf(item);
              const catName = escapeHtml(extractCategoryName(item));
              const thumbUrl = extractThumbnailUrl(item);
              const title = escapeHtml(item.title || '無題のプロダクト');
              const rawDesc = item.content || item.description || '';
              const plainDesc = escapeHtml(stripHtml(rawDesc) || '詳細をクリックしてご覧ください。');

              return `
                <article role="button" tabindex="0" onclick="openProductModal(${originalIndex})" class="group cursor-pointer bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-card hover:shadow-soft hover:border-mikan-300 transition-all flex flex-col">
                  <!-- Top: Category Badge -->
                  <div class="px-5 pt-5 pb-3 flex items-center justify-between">
                    <span class="px-3 py-1 rounded-full bg-mikan-50 text-mikan-500 text-xs font-bold">
                      ${catName}
                    </span>
                    <span class="w-7 h-7 rounded-full bg-mikan-500 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <i data-lucide="chevron-right" class="w-4 h-4"></i>
                    </span>
                  </div>

                  <!-- Thumbnail -->
                  <div class="px-5">
                    <div class="w-full aspect-video rounded-2xl overflow-hidden bg-mikan-50 border border-slate-100 flex items-center justify-center">
                      ${thumbUrl
                        ? `<img src="${thumbUrl}" alt="${title}" onerror="this.onerror=null; this.src='https://placehold.co/800x450/F4F6FC/1E2B58?text=No+Image';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />`
                        : `<div class="flex flex-col items-center justify-center text-mikan-400">
                             <i data-lucide="image" class="w-8 h-8 mb-1"></i>
                             <span class="text-xs font-bold">NO IMAGE</span>
                           </div>`
                      }
                    </div>
                  </div>

                  <!-- Title & Description -->
                  <div class="p-5 pt-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 class="font-display font-bold text-lg sm:text-xl text-charcoal group-hover:text-mikan-500 transition-colors line-clamp-1">
                        ${title}
                      </h2>
                      <p class="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        ${plainDesc}
                      </p>
                    </div>
                  </div>
                </article>
              `;
            }).join('') : productMessage}
          </div>
        </div>
      `;
    }

    // --- 4.2 NEWS PAGE (microCMS Backend Integration without status/config UI) ---


function renderPage() {
 const root = document.getElementById("app-view");
 if (!root) return;
 root.innerHTML = '<div class="page-transition">' + renderProductsPage() + '</div>';
 if (typeof lucide !== "undefined") lucide.createIcons();
}
