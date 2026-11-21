async function fetchDiscordLanyard() {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
          cache: 'no-store'
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        if (json && json.success && json.data) {
          const user = json.data.discord_user;
          STATE.discord.status = json.data.discord_status || 'offline';
          if (user) {
            STATE.discord.username = user.global_name || user.username || 'みかん';
            if (user.avatar) {
              const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
              STATE.discord.avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=512`;
            } else {
              // New Discord username system uses (user_id >> 22) % 6, legacy uses discriminator % 5
              const defaultIdx = (user.discriminator && user.discriminator !== '0')
                ? Number(user.discriminator) % 5
                : Number((BigInt(user.id) >> 22n) % 6n);
              STATE.discord.avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIdx}.png`;
            }
          }
        }
      } catch (e) {
        // Fallback to Discord default embed avatar computed from user ID
        const defaultIdx = Number((BigInt(DISCORD_USER_ID) >> 22n) % 6n);
        STATE.discord.avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIdx}.png`;
      }

      if (STATE.currentRoute === 'home' && typeof renderPage === 'function') renderPage();
    }

    async function fetchMicroCMSNews() {
      const { serviceDomain, apiKey, endpoint } = STATE.cmsConfig;
      STATE.cmsStatus = 'loading';

      const cleanDomain = serviceDomain.trim();
      const cleanEndpoint = endpoint.trim() || 'news';
      const url = `https://${cleanDomain}.microcms.io/api/v1/${cleanEndpoint}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-MICROCMS-API-KEY': apiKey.trim()
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const items = Array.isArray(data.contents) ? data.contents : (data.id ? [data] : []);
        STATE.cmsArticles = items;
        STATE.cmsStatus = 'success';
      } catch (err) {
        STATE.cmsStatus = 'error';
      }

      if ((STATE.currentRoute === 'news' || STATE.currentRoute === 'home') && typeof renderPage === 'function') renderPage();
    }

    async function fetchMicroCMSProducts() {
      const { serviceDomain, apiKey, endpoint } = STATE.productCmsConfig;
      STATE.productStatus = 'loading';

      try {
        const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-MICROCMS-API-KEY': apiKey.trim()
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const items = Array.isArray(data.contents) ? data.contents : (data.id ? [data] : []);
        STATE.productItems = items;
        STATE.productStatus = 'success';
      } catch (err) {
        STATE.productStatus = 'error';
      }

      if ((STATE.currentRoute === 'products' || STATE.currentRoute === 'home') && typeof renderPage === 'function') renderPage();
    }

