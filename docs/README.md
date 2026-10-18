# docs/

Internal repo notes. Not part of the published site.

Cloudflare Pages has no built-in `.assetsignore` for Git-based deploys, so this
folder is excluded from the serving surface by force-404 rules in the root
[`_redirects`](../_redirects) file:

```
/docs/*       /404.html 404!
/TRACKING.md  /404.html 404!
```

The `!` makes the rule take precedence over any file that would otherwise
match, so even if Cloudflare Pages uploads `/docs/TRACKING.md` the URL still
returns a real 404 and never serves the file.

Nothing in the site (nav, footer, sitemap, JSON-LD, internal links) points
into `docs/`.
