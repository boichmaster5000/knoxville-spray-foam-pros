# Knoxville Spray Foam Pros

Static lead-generation website for Knoxville, TN spray foam insulation services. Optimized for organic search, AI search (GPT, Claude, Perplexity), and phone-call conversion.

## Domain

`knoxvillesprayfoampros.com`

## Stack

- Plain HTML + CSS + minimal vanilla JS. No build step. No framework.
- Hosted on any static host (Cloudflare Pages, Netlify, Vercel, S3+CloudFront, GitHub Pages).
- `_headers` and `_redirects` files are Cloudflare/Netlify-style.

## Structure

```
/
├── index.html                  Homepage
├── about.html                  About
├── contact.html                Contact / lead form
├── faq.html                    FAQ
├── 404.html                    Not-found page
├── style.css                   Global styles
├── app.js                      FAQ toggle + mobile menu
├── favicon.svg                 Inline SVG favicon
├── robots.txt                  Crawler directives (allows GPTBot, Claude, Perplexity, etc.)
├── sitemap.xml                 Full URL list
├── _headers                    Security and cache headers
├── _redirects                  Host-level redirects
│
├── services/
│   ├── index.html              Services hub
│   ├── closed-cell-spray-foam.html
│   ├── open-cell-spray-foam.html
│   ├── attic-insulation.html
│   ├── crawl-space-insulation.html
│   ├── metal-building-spray-foam.html
│   ├── pole-barn-insulation.html
│   ├── rim-joist-insulation.html
│   └── spray-foam-removal.html
│
├── service-areas/
│   ├── index.html              Service areas hub
│   ├── farragut.html
│   ├── powell.html
│   ├── maryville.html
│   ├── oak-ridge.html
│   ├── west-knoxville.html
│   ├── bearden.html
│   ├── alcoa.html
│   └── karns.html
│
└── blog/
    ├── index.html              Blog hub
    ├── spray-foam-insulation-cost-knoxville-tn-2026.html
    ├── closed-cell-vs-open-cell-spray-foam-tennessee.html
    ├── tva-energyright-rebates-spray-foam-2026.html
    └── spray-foam-vs-fiberglass-knoxville-comparison.html
```

## Path Conventions

- Root pages reference assets as `style.css`, `app.js`, `favicon.svg`
- Pages in `/services/`, `/service-areas/`, `/blog/` reference assets as `../style.css`, `../app.js`, `../favicon.svg`
- All internal navigation uses absolute root-relative paths (`/services/foo.html`)

## Lead Capture

The contact form on every page POSTs to a Formspree endpoint. Before going live, replace every instance of `REPLACE_WITH_REAL_ENDPOINT` with the actual Formspree form ID:

```
grep -rn "REPLACE_WITH_REAL_ENDPOINT" .
```

Phone number `(865) 564-7823` is the single tracked call line, surfaced in:
- Header CTA on every page
- Hero CTAs
- Final CTA section on every page
- Sticky mobile call bar
- Footer

## SEO

- Per-page `<title>`, meta description, canonical, OpenGraph, Twitter Card
- JSON-LD: `LocalBusiness` on home and service-area pages, `Service` on service pages, `Article` on blog posts, `BreadcrumbList` everywhere, `FAQPage` on faq.html
- `sitemap.xml` lists every URL
- `robots.txt` explicitly allows GPTBot, Google-Extended, PerplexityBot, ClaudeBot, CCBot and disallows SemrushBot/AhrefsBot/MJ12bot/DotBot
- Images use `width`, `height`, `loading="lazy"` (except above-the-fold hero which uses `loading="eager"` + `fetchpriority="high"`)
- Images are real licensed photos from Pexels, stored locally under `images/` and served directly

## Local Development

No build step. Open files in a browser directly, or run any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit http://localhost:8000

## Deployment

Drop the entire folder onto any static host. The `_headers` and `_redirects` files apply automatically on Cloudflare Pages and Netlify; ignore on other hosts.

## Pre-Launch Checklist

- [ ] Replace `REPLACE_WITH_REAL_ENDPOINT` in every form with actual Formspree ID
- [x] Swap placeholder images for real photographs (done — Pexels-licensed photos in `images/`)
- [ ] Verify phone number is correct and routing to the right line
- [ ] Confirm domain DNS points to the static host
- [ ] Submit sitemap.xml to Google Search Console and Bing Webmaster Tools
- [ ] Verify `og:url` and canonical URLs match the live domain (currently `knoxvillesprayfoampros.com`)
- [ ] Add Google Analytics or alternative if desired (not currently included)
- [ ] Run Lighthouse audit on the homepage; expect 95+ on Performance, Accessibility, Best Practices, SEO

## Content Updates

All content is hand-written HTML. To add a new service page, copy `services/closed-cell-spray-foam.html` as a template and update:

- `<title>`, meta description, canonical, OpenGraph, Twitter Card
- Service-specific `serviceType` in the JSON-LD Service schema
- Breadcrumb JSON-LD third item
- H1 and body content
- Add the URL to `sitemap.xml`
- Add a card to `services/index.html`

To add a new service area page, copy `service-areas/farragut.html` as a template and update the city name everywhere it appears, the zip code in the `LocalBusiness` address schema, and the neighborhood-specific body content.

To add a new blog post, copy any existing post in `blog/` as a template and update the title, meta, breadcrumb, Article schema, and body content. Add to `blog/index.html` and `sitemap.xml`.

## License

All site content © 2026 Knoxville Spray Foam Pros.
