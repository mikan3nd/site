function renderUpdatesPage() {
  const status = STATE.githubUpdateStatus;
  const commits = STATE.githubUpdates || [];
  const content = status === 'loading' || status === 'idle'
    ? '<p class="text-sm text-slate-500">GitHubから更新履歴を取得しています…</p>'
    : status === 'error'
      ? '<div class="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">更新履歴を取得できませんでした。GitHub APIの一時的な制限、または通信状況をご確認ください。</div>'
      : commits.length
        ? `<ol class="relative ml-2 border-l-2 border-slate-100 pl-6 space-y-6">${commits.map(commit => {
            const message = escapeHtml((commit.commit?.message || '更新').split('\\n')[0]);
            const date = formatGitHubDate(commit.commit?.author?.date || commit.commit?.committer?.date);
            const url = safeHttpUrl(commit.html_url);
            const shortSha = escapeHtml(String(commit.sha || '').slice(0, 7));
            return `
              <li class="relative">
                <span class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-mikan-500 shadow"></span>
                <time class="text-xs font-semibold tracking-wide text-slate-400">${date}</time>
                <h2 class="mt-1 text-base sm:text-lg font-bold text-slate-800">${message}</h2>
                <div class="mt-2 flex items-center gap-3 text-xs text-slate-400">
                  <span class="font-mono">${shortSha}</span>
                  ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-semibold text-mikan-500 hover:underline">GitHubで見る <i data-lucide="external-link" class="h-3 w-3"></i></a>` : ''}
                </div>
              </li>`;
          }).join('')}</ol>`
        : '<p class="text-sm text-slate-500">表示できる更新履歴はありません。</p>';

  return `
    <div class="space-y-7">
      <section class="rounded-[2rem] border border-slate-100 bg-white p-7 sm:p-10 shadow-card">
        <span class="inline-flex items-center gap-2 rounded-full bg-mikan-50 px-3 py-1 text-xs font-bold text-mikan-500"><i data-lucide="git-commit-horizontal" class="h-4 w-4"></i> DEVELOPMENT LOG</span>
        <h1 class="mt-3 text-3xl sm:text-4xl font-black text-charcoal">更新履歴</h1>
        <p class="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-slate-600">このサイトの更新履歴です。GitHubのコミット情報を取得して自動的に表示しています。</p>
      </section>
      <section class="rounded-[2rem] border border-slate-100 bg-white p-7 sm:p-10 shadow-card">
        <div class="mb-7 flex items-center justify-between gap-3">
          <h2 class="text-lg font-bold text-charcoal">最近の更新</h2>
          <a href="https://github.com/mikan3nd/site/commits/main" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-mikan-500 hover:underline">GitHubの全履歴 <i data-lucide="external-link" class="inline h-3 w-3"></i></a>
        </div>
        ${content}
      </section>
      <p class="text-center text-xs text-slate-400">GitHub APIから最新8件を取得しています。</p>
    </div>
  `;
}

function renderPage() {
  const root = document.getElementById('app-view');
  if (!root) return;
  root.innerHTML = '<div class="page-transition">' + renderUpdatesPage() + '</div>';
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
