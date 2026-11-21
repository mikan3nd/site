# Mikan Official Website

## Directory structure

- `index.html`: shared page shell, navigation, footer, modal and toast markup
- `assets/css/styles.css`: shared custom styles
- `assets/js/tailwind.config.js`: Tailwind theme configuration
- `assets/js/config.js`: app state and configuration
- `assets/js/api.js`: microCMS and Discord Lanyard requests
- `assets/js/utils.js`: shared data and formatting helpers
- `assets/js/router.js`: navigation and route rendering
- `assets/js/pages/`: page-specific rendering functions
- `assets/js/modals.js`: product and news detail modals
- `assets/js/app.js`: application startup

## Adding a page

Create a file under `assets/js/pages/`, add its renderer and route handling, then include it in `index.html` in dependency order. Scripts currently use classic script loading to preserve the existing global function/state dependencies.

## Editing

- Styles: `assets/css/styles.css`
- API integration: `assets/js/api.js`
- Shared UI logic: `assets/js/utils.js` and `assets/js/router.js`
