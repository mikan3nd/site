function renderAboutPage() {
  return `
    <div class="about-page space-y-8 sm:space-y-10">
      <section class="about-hero relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-soft">
        <div class="about-hero-glow" aria-hidden="true"></div>
        <div class="relative z-10 px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
          <span class="inline-flex items-center gap-2 rounded-full bg-mikan-50 px-3 py-1 text-xs font-bold tracking-wider text-mikan-500">
            <i data-lucide="user-round" class="h-3.5 w-3.5"></i> ABOUT ME
          </span>
          <p class="mt-6 text-sm font-bold tracking-[.18em] text-slate-400">HELLO, I'M</p>
          <h1 class="mt-1 font-display text-5xl font-black tracking-wide text-charcoal sm:text-7xl">みかん<span class="ml-3 text-xl font-bold text-mikan-500 sm:text-2xl">Mikan</span></h1>
          <p class="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            WebサイトやUIのデザイン、スマートフォンなど、身近なデジタルのものに興味があります。
            気になったことを試しながら、自分のアイデアを少しずつ形にしています。
          </p>
        </div>
        <div class="about-hero-mark" aria-hidden="true">M</div>
      </section>

      <section class="grid gap-6 md:grid-cols-[1.15fr_.85fr]">
        <article class="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-card sm:p-9">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-mikan-50 text-mikan-500"><i data-lucide="user-round" class="h-5 w-5"></i></span>
            <div>
              <p class="text-xs font-bold tracking-[.16em] text-mikan-500">PROFILE</p>
              <h2 class="font-display text-xl font-bold text-charcoal">わたしについて</h2>
            </div>
          </div>
          <p class="text-sm leading-8 text-slate-600 sm:text-base">
            みかん（Mikan）として、個人でWebサイトや小さな企画・制作に取り組んでいます。
            デザインを考えることも、実際にコードを書いて動かしてみることも好きです。
          </p>
          <p class="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
            まだ試行錯誤しながら学んでいる途中です。新しい技術やアイデアに触れ、使いやすさと見た目のバランスを考えながら制作しています。
          </p>
        </article>

        <article class="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-card sm:p-9">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-mikan-50 text-mikan-500"><i data-lucide="sparkles" class="h-5 w-5"></i></span>
            <div>
              <p class="text-xs font-bold tracking-[.16em] text-mikan-500">INTERESTS</p>
              <h2 class="font-display text-xl font-bold text-charcoal">興味のあること</h2>
            </div>
          </div>
          <ul class="space-y-4">
            <li class="flex gap-3"><i data-lucide="panels-top-left" class="mt-1 h-5 w-5 shrink-0 text-mikan-500"></i><div><h3 class="text-sm font-bold text-charcoal">Web・UIデザイン</h3><p class="mt-1 text-sm leading-6 text-slate-500">見やすく、迷わず使える画面やWebサイト。</p></div></li>
            <li class="flex gap-3"><i data-lucide="smartphone" class="mt-1 h-5 w-5 shrink-0 text-mikan-500"></i><div><h3 class="text-sm font-bold text-charcoal">スマートフォン</h3><p class="mt-1 text-sm leading-6 text-slate-500">端末のデザインや機能、使い心地。</p></div></li>
            <li class="flex gap-3"><i data-lucide="code-2" class="mt-1 h-5 w-5 shrink-0 text-mikan-500"></i><div><h3 class="text-sm font-bold text-charcoal">個人制作</h3><p class="mt-1 text-sm leading-6 text-slate-500">アイデアをWebサイトやアプリとして形にすること。</p></div></li>
          </ul>
        </article>
      </section>

      <section class="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-card sm:p-9">
        <div class="mb-5 flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-mikan-50 text-mikan-500"><i data-lucide="monitor" class="h-5 w-5"></i></span>
          <div>
            <p class="text-xs font-bold tracking-[.16em] text-mikan-500">WHAT I DO</p>
            <h2 class="font-display text-xl font-bold text-charcoal">このサイトについて</h2>
          </div>
        </div>
        <p class="max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
          このサイトは、みかんの活動や制作物、お知らせをまとめる個人公式サイトです。
          制作物の紹介はプロダクト一覧から、最新情報はお知らせページからご覧いただけます。
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <a href="../products/" class="inline-flex items-center gap-2 rounded-full bg-mikan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-mikan-600">制作物を見る <i data-lucide="arrow-up-right" class="h-4 w-4"></i></a>
          <a href="../contact/" class="inline-flex items-center gap-2 rounded-full bg-mikan-50 px-5 py-3 text-sm font-bold text-mikan-500 transition hover:bg-mikan-100">お問い合わせ <i data-lucide="arrow-up-right" class="h-4 w-4"></i></a>
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