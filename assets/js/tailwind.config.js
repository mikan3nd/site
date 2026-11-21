tailwind.config = {
      theme: {
        extend: {
          colors: {
            mikan: {
              50: '#F4F6FC',
              100: '#E5E9F8',
              200: '#C7D2FE',
              300: '#A5B4FC',
              400: '#6376B8',
              500: '#1E2B58',
              600: '#162044',
              700: '#0F1733',
            },
            accent: {
              blue: '#B4C3F5',
              lavender: '#C7B8EA',
            },
            cream: '#FFFFFF',
            charcoal: '#1A202C',
          },
          fontFamily: {
            sans: ['"Zen Kaku Gothic New"', '"Noto Sans JP"', 'sans-serif'],
            display: ['"Zen Kaku Gothic New"', '"Noto Sans JP"', 'sans-serif'],
            script: ['"Caveat"', 'cursive'],
          },
          boxShadow: {
            'soft': '0 16px 40px -12px rgba(30, 43, 88, 0.12)',
            'card': '0 6px 24px -4px rgba(30, 43, 88, 0.06)',
          }
        }
      }
    }
