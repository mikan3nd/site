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
      }
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
      }
    ];

    // ==========================================
    // 2. Discord Lanyard API & microCMS Fetch Logic
    // ==========================================
