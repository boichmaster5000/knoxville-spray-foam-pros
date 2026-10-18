# Tracking Setup

Everything below is pre-wired but inert until you replace the placeholders.
Nothing third-party loads on page view today.

## What is tracked

Three events, all fired client-side by one commented `<script>` block at the
bottom of every `<head>`:

| Event | Fires when | Where to find it in GA4 |
| --- | --- | --- |
| `generate_lead` | A form that posts to Formspree is submitted | Reports -> Engagement -> Events |
| `phone_call_click` | Any `tel:` link is clicked (header, hero, CTA, mobile bar, footer, inline) | same |
| `generate_lead_confirmed` | The thank-you page loads (Formspree redirects here on success via `_next`) | same, promote to Key Event |

Both the generate_lead and generate_lead_confirmed events describe a lead; mark
`generate_lead_confirmed` as a Key Event (conversion) in GA4 so the thank-you
page view counts as the real conversion.

## Where the GA4 ID goes

The placeholder `G-XXXXXXXXXX` appears twice in the commented block on every
HTML page:

- `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
- `gtag('config', 'G-XXXXXXXXXX');`

Both must be replaced with the real GA4 Measurement ID.

## How to enable GA4

1. Create a GA4 Web data stream for `https://knoxvillesprayfoampros.com` and
   copy its Measurement ID (`G-...`).
2. Replace every occurrence of `G-XXXXXXXXXX` in the HTML files with that ID.
   A one-shot replacement from the repo root:
   ```
   find . -name "*.html" -not -path "./.git/*" \
     -exec sed -i '' 's/G-XXXXXXXXXX/G-YOURREALID/g' {} +
   ```
3. On every page remove the surrounding `<!-- ... -->` so the `<script>` block
   runs. The opening comment line is `<!-- GA4 tracking - replace G-XXXXXXXXXX ...`
   and the matching closing line is `-->` directly after `</script>`.
4. Visit the home page in a private window with GA4 DebugView open; confirm a
   `page_view` arrives.
5. Submit the quote form with a test email; confirm `generate_lead` arrives
   on the form page and `generate_lead_confirmed` arrives on `/thank-you`.
6. Click a `tel:` link; confirm `phone_call_click` arrives.

## How to mark thank-you as a conversion

1. In GA4: Admin -> Property -> Key events -> Create.
2. Event name: `generate_lead_confirmed`.
3. Save. Future hits count toward conversion metrics and Ads export.

The underlying `generate_lead` event (fired at form submit) stays available as
a leading indicator; the confirmed event (thank-you page view) is the one that
should be optimized against.

## Call tracking swap

Every `tel:` link on the site carries `data-call="main"`. To swap in a call
tracking number later from one place, drop this script just before `</body>`
on each page (or add it to `app.js`):

```html
<script>
  (function () {
    var tracked = 'TRACKED_PHONE_E164';         // e.g. +18005551234
    var trackedDisplay = 'TRACKED_PHONE_DISPLAY'; // e.g. (800) 555-1234
    document.querySelectorAll('a[data-call="main"]').forEach(function (a) {
      a.href = 'tel:' + tracked;
      // Only swap visible text when the link's text IS the phone number.
      if (/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(a.textContent.trim())) {
        a.textContent = trackedDisplay;
      }
    });
  })();
</script>
```

The script finds every tagged link in one pass. No HTML changes needed per
page when the number changes.

## Search Console and Bing

Two commented verification `<meta>` placeholders live in the `<head>` of
`index.html`:

```
<!-- Google Search Console verification: paste your token and uncomment
<meta name="google-site-verification" content="YOUR_GSC_TOKEN_HERE">
-->
<!-- Bing Webmaster verification: paste your token and uncomment
<meta name="msvalidate.01" content="YOUR_BING_TOKEN_HERE">
-->
```

Paste the token and remove the surrounding comment on each tool's dashboard
when you register the property. The sitemap URL is
`https://knoxvillesprayfoampros.com/sitemap.xml`.

## Rules

- No third-party script that runs on page view is on this site today.
- No paid tool is wired in.
- GA4 is the only analytics vendor the HTML is prepared for; swap in a
  different vendor only by editing the commented block.
- Keep the honeypot (`_gotcha`) on every Formspree form.
- Phone number: `(865) 564-7823` -> `tel:+18655647823`. The one source of
  truth for call-tracking swap is `[data-call="main"]`.
