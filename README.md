# Bryan Brzycki personal site

This site is a Vite + React + Tailwind app. Jekyll has been removed; content lives in `src/data/content.js`, the interface lives in `src/main.jsx`, and the visual system lives in `src/styles.css`.

## Local development

```bash
npm run dev
```

Then open `http://localhost:5173`.

## Validation

```bash
npm run check
npm run build
```

The checker validates slugs, referenced media, and core content counts. The build emits `dist/` and creates a `dist/404.html` SPA fallback.

## Deployment

Deploy `dist/` to Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static host. Netlify and Vercel rewrites are included; GitHub Pages uses the generated `404.html` fallback.
