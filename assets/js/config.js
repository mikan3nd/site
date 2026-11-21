// 1. State & Configuration
    // ==========================================
    const DISCORD_USER_ID = '1498667817481011301';

    const STATE = {
      currentRoute: 'home',
      cmsConfig: {
        serviceDomain: 'swe2db8jva',
        apiKey: 'ksq03pQ5FRz9yDM47YPDyxlqhzlQir5TGStQ',
        endpoint: 'news'
      },
      productCmsConfig: {
        serviceDomain: 'mikan-product',
        apiKey: '0zDNjpizK50XUrNzpSB4eVhwyXDB8QQeI0p5',
        endpoint: 'blogs'
      },
      cmsStatus: 'idle', // 'idle' | 'loading' | 'success' | 'error'
      cmsArticles: [],
      productStatus: 'idle',
      productItems: [],
      selectedProductCategory: 'すべて',
      discord: {
        avatarUrl: null,
        status: 'offline', // 'online' | 'idle' | 'dnd' | 'offline'
        username: 'みかん'
      },
      githubUpdates: [],
      githubUpdateStatus: 'idle'
    };

    // Fallback Products (Displayed if microCMS endpoint has no entries or is unreachable)
    const FALLBACK_PRODUCTS = [
      {
        id: 'prod-1',
        title: 'みかん公式ホームページ',
        category: { name: 'Web' },
        description: '洗練されたホワイト＆ネイビーの配色を採用した公式ポートフォリオ＆お知らせサイト。microCMSやLanyard APIと連携しています。',
        thumbnail: { url: 'https://placehold.co/800x450/E5E9F8/1E2B58?text=Mikan+Website' },
        url: '#home'
      },
      {
        id: 'prod-2',
        title: 'シンプルタスクタイマー',
        category: { name: 'アプリ' },
        description: '集中と休憩のリズムをやさしくサポートするポモドーロタイマーWebアプリ。直感的な操作と落ち着いたUIが特徴です。',
        thumbnail: { url: 'https://placehold.co/800x450/F4F6FC/1E2B58?text=Focus+Timer' }
      },
      {
        id: 'prod-3',
        title: 'ミニマルUIアイコンセット',
        category: { name: 'デザイン' },
        description: '丸みのある角と均一なストロークで設計された、個人開発・Webサイト向けのカスタムSVGアイコンコレクション。',
        thumbnail: { url: 'https://placehold.co/800x450/C7D2FE/1E2B58?text=Minimal+UI+Icons' }
      }
    ];

    // Fallback News Articles (Displayed silently if microCMS endpoint has no entries or is unreachable)
    const FALLBACK_NEWS = [
      {
        id: 'sample-1',
        title: '「みかん」公式ホームページをリニューアル公開しました！',
        publishedAt: '2026-11-15T10:00:00.000Z',
        category: { name: 'お知らせ' },
        content: '<p>いつも応援ありがとうございます。「みかん」の公式ホームページを新しくオープンいたしました！</p><p>新しいサイトでは、日々の活動のお知らせやSNSでの発信情報をまとめてお届けしていきます。</p><h2>今後の予定</h2><ul><li>新作Web企画の公開</li><li>デザイン制作の裏話や技術メモの更新</li><li>SNSでの活動発信強化</li></ul><p>今後ともどうぞよろしくお願いいたします。</p>'
      },
      {
        id: 'sample-2',
        title: '冬のクリエイターイベントに出展・参加します',
        publishedAt: '2026-10-20T09:00:00.000Z',
        category: { name: 'イベント' },
        content: '<p>来月開催されるオンライン＆オフライン合同のクリエイター展示会に参加することが決定しました。</p><p>当日はオリジナルグッズやUIデザイン資料の展示を予定しています。詳細はSNSでも順次お知らせいたします。</p>'
      },
      {
        id: 'sample-3',
        title: 'Discordコミュニティ「みかん箱」を開設しました',
        publishedAt: '2026-10-05T18:00:00.000Z',
        category: { name: 'コミュニティ' },
        content: '<p>クリエイター同士の雑談やアイデア交換ができるDiscordサーバーを開設しました。SNSページからぜひご参加ください。</p>'
      }
    ];

    // Social Links Data
    const SNS_DATA = [
      {
        name: 'X (Twitter)',
        handle: '@mikan3nd',
        description: '日々の制作進捗やお知らせは、こちらのXアカウントで発信しています。',
        url: 'https://x.com/mikan3nd',
        badge: 'メインアカウント',
        bgClass: 'bg-neutral-900 text-white',
        accentClass: 'border-neutral-200 hover:border-neutral-900',
        iconSvg: `<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
      },
      {
        name: 'Spotify',
        handle: '314xtjp77fac3ruiuqy7kggrh7xu',
        description: 'Spotifyで公開しているプロフィールです。フォローして音楽の好みやプレイリストをチェックできます。',
        url: 'https://open.spotify.com/user/314xtjp77fac3ruiuqy7kggrh7xu',
        badge: '音楽',
        bgClass: 'bg-[#1DB954] text-white',
        accentClass: 'border-emerald-200 hover:border-emerald-500',
        iconSvg: `<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.42a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.58-1.05 8.51-.6 11.66 1.34.35.22.46.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.99-8.16-2.57-11.98-1.41a.94.94 0 1 1-.55-1.8c4.37-1.32 9.8-.68 13.51 1.61.44.27.58.85.31 1.29Zm.13-3.4c-3.87-2.3-10.26-2.51-13.96-1.39a1.13 1.13 0 1 1-.65-2.16c4.25-1.29 11.32-1.04 15.78 1.61a1.13 1.13 0 0 1-1.17 1.94Z"/></svg>`
      },
      {
        name: 'Discord',
        handle: '1498667817481011301',
        description: 'Discordのプロフィールを開きます。フレンド申請はこちらから送信できます。',
        url: 'https://discord.com/users/1498667817481011301',
        badge: 'フレンド申請',
        bgClass: 'bg-[#5865F2] text-white',
        accentClass: 'border-indigo-200 hover:border-indigo-500',
        iconSvg: `<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19.73 5.15A18.2 18.2 0 0 0 15.24 3.8l-.22.45a16.9 16.9 0 0 0-6.04 0l-.23-.45a18.1 18.1 0 0 0-4.48 1.35C1.43 9.33.66 13.4 1.04 17.42a18.2 18.2 0 0 0 5.5 2.78l1.18-1.92a11.8 11.8 0 0 1-1.86-.9l.46-.36c3.58 1.66 7.46 1.66 11 0l.47.36c-.6.35-1.22.65-1.87.9l1.18 1.92a18.1 18.1 0 0 0 5.5-2.78c.45-4.66-.77-8.69-2.87-12.27ZM8.54 14.8c-1.07 0-1.95-.98-1.95-2.18s.86-2.18 1.95-2.18 1.97.99 1.95 2.18c0 1.2-.86 2.18-1.95 2.18Zm6.92 0c-1.07 0-1.95-.98-1.95-2.18s.86-2.18 1.95-2.18 1.97.99 1.95 2.18c0 1.2-.86 2.18-1.95 2.18Z"/></svg>`
      }
    ];

    // ==========================================
    // 2. Discord Lanyard API & microCMS Fetch Logic
    // ==========================================
