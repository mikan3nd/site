# Mikan Official Website

## Pages
- `index.html`: Home
- `about/index.html`: About
- `products/index.html`: Products
- `news/index.html`: News
- `updates/index.html`: GitHub commit-based update history
- `sns/index.html`: Social links
- `contact/index.html`: Contact
- `404.html`: Not found page

## Shared components
- `components/header.html`: shared header and navigation
- `components/footer.html`: shared footer and page links
- `components/overlays.html`: detail modal and toast

## Assets
- `assets/css/styles.css`: shared styles
- `assets/js/config.js`: site configuration and fallback data
- `assets/js/api.js`: read-only microCMS and Discord Lanyard requests
- `assets/js/utils.js`: shared formatting and data helpers
- `assets/js/common.js`: shared layout loader and common UI behavior
- `assets/js/modals.js`: detail modal
- `assets/js/pages/`: page-specific rendering logic

Each page has its own HTML document and loads only its own page renderer. Navigation uses ordinary links between documents. Shared header/footer are loaded from `components/` so they can be maintained once.
