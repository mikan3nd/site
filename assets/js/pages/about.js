function renderAboutPage() {
  return `
    <div class="about-page">
      <section class="about-hero">
        <span class="about-eyebrow">ABOUT / PROFILE</span>
        <p class="mt-6 text-sm font-bold tracking-widest text-slate-400">はじめまして。</p>
        <h1 class="mt-2 text-4xl sm:text-6xl font-black tracking-tight text-slate-900">みかんについて</h1>
        <p class="mt-5 max-w-2xl text-sm sm:text-base leading-8 text-slate-600">
          WebサイトやUIデザイン、身近なデジタル体験に関心を持ち、個人で制作や試行錯誤をしています。
          このサイトでは、プロフィールや制作物、活動のお知らせをまとめています。
        </p>
      </section>

      <section class="about-section">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-1.5 h-6 rounded-full bg-mikan-500"></span>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">興味のあること</h2>
        </div>
        <div class="about-interest-grid">
          <article class="about-interest">
            <span class="about-interest-icon"><i data-lucide="panels-top-left"></i></span>
            <h3 class="font-bold text-base text-slate-900">Web・UIデザイン</h3>
            <p class="mt-2 text-sm leading-7 text-slate-600">見やすさや使いやすさを考えながら、Webサイトのデザインや構成を試しています。</p>
          </article>
          <article class="about-interest">
            <span class="about-interest-icon"><i data-lucide="code-2"></i></span>
            <h3 class="font-bold text-base text-slate-900">個人制作</h3>
            <p class="mt-2 text-sm leading-7 text-slate-600">HTML・CSS・JavaScriptなどを使い、小さなWebサービスやツールを制作しています。</p>
          </article>
          <article class="about-interest">
            <span class="about-interest-icon"><i data-lucide="smartphone"></i></span>
            <h3 class="font-bold text-base text-slate-900">スマートフォン</h3>
            <p class="mt-2 text-sm leading-7 text-slate-600">スマートフォンの機能や画面設計、日々の使い心地にも関心があります。</p>
          </article>
        </div>
      </section>

      <section class="about-section">
        <div class="flex items-center gap-3 mb-4">
          <span class="w-1.5 h-6 rounded-full bg-mikan-500"></span>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">このサイトについて</h2>
        </div>
        <p class="text-sm sm:text-base leading-8 text-slate-600">
          このサイトは、個人の活動や制作物を紹介する公式ホームページです。
          お知らせやプロダクト情報の一部はmicroCMSで管理しています。
          制作物の詳細は、各プロダクトの紹介ページから確認できます。
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="../products/" class="inline-flex items-center gap-2 rounded-full bg-mikan-500 px-5 py-3 text-sm font-bold text-white hover:bg-mikan-600">プロダクトを見る <i data-lucide="arrow-up-right" class="w-4 h-4"></i></a>
          <a href="../contact/" class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-mikan-300">お問い合わせ <i data-lucide="mail" class="w-4 h-4"></i></a>
        </div>
      </section>
    </div>
  `;
}

function renderPage() {
  const root = document.getElementById("app-view");
  if (!root) return;
  root.innerHTML = '<div class="page-transition">' + renderAboutPage() + '</div>';
  if (typeof lucide !== "undefined") lucide.createIcons();
}
