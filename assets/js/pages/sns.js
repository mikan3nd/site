function renderSnsPage() {
      return `
        <div class="space-y-8">
          <div class="bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-10 shadow-card text-center max-w-3xl mx-auto">
            <span class="font-script text-2xl text-mikan-500 brush-blue">Social Media</span>
            <h1 class="font-display font-bold text-3xl sm:text-4xl text-charcoal mt-2 tracking-wide">公式SNS・コミュニティ</h1>
            <p class="text-slate-600 text-sm sm:text-base mt-3">
              「みかん」の最新情報や制作の裏側、日々のつぶやきはSNSで発信しています。<br class="hidden sm:inline">
              ぜひ気軽にフォローやメッセージをお寄せください。
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${SNS_DATA.map(sns => `
              <div class="bg-white rounded-3xl border border-slate-200 hover:border-mikan-500 p-6 shadow-card hover:shadow-soft transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-mikan-500 text-white flex items-center justify-center shadow-sm">
                      ${sns.iconSvg}
                    </div>
                    <span class="px-3 py-1 rounded-full bg-mikan-50 text-mikan-500 text-xs font-bold">${sns.badge}</span>
                  </div>
                  <h2 class="font-display font-bold text-xl text-charcoal">${sns.name}</h2>
                  <p class="text-xs font-mono font-bold text-slate-400 mt-0.5">${sns.handle}</p>
                  <p class="text-sm text-slate-600 mt-3 leading-relaxed">
                    ${sns.description}
                  </p>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <a href="${sns.url}" target="_blank" rel="noopener noreferrer" class="flex-grow py-2.5 px-4 rounded-xl bg-mikan-500 hover:bg-mikan-600 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5">
                    フォロー・開く <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                  </a>
                  <button onclick="copyHandle('${sns.handle}')" class="p-2.5 rounded-xl bg-mikan-50 hover:bg-mikan-100 text-mikan-500 transition-colors" title="IDをコピー">
                    <i data-lucide="copy" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    function copyHandle(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(`「${text}」をクリップボードにコピーしました`);
    }

    // --- 4.5 CONTACT PAGE ---
