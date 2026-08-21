# Apex Signing & Biometric Group, LLC — Website

Marketing site for Apex Signing & Biometric Group, LLC.

**Live:** [apexsbg-demo.pages.dev](https://apexsbg-demo.pages.dev)
**Tagline:** Professional by Standard. Trusted by Choice.

## Stack

Static HTML/CSS/JS — no build step, no framework. Four files:

- `index.html` — single-page layout (hero, benefits, services, why, about, book, FAQ, contact, footer)
- `styles.css` — palette + type system + responsive grid
- `script.js` — data-driven services + FAQs, nav toggle, sticky mobile CTA
- `assets/` — favicon and any future images

## Brand

- **Navy** `#071F41` — primary
- **Gold** `#C49A4A` — accent
- **Ivory** `#F7F4EE` — alt section background
- **White** `#FFFFFF` — primary background
- **Charcoal** `#222222` — body text
- **Type** — Playfair Display (serif headlines) + Inter (sans body)

## Changing content without touching HTML

- **Service statuses** (available / coming_soon / by_appointment / temporarily_unavailable) — edit the `SERVICES` array in `script.js`
- **FAQs** — edit the `FAQS` array in `script.js`

## Deploy

Auto-deploys on `git push origin main` via Cloudflare Pages GitHub integration.

Every push to `main` updates `apexsbg-demo.pages.dev`.
Every push to a non-main branch gets its own preview URL.

## Content guardrails

Do NOT publish claims that have not been verified by the business owner:

- Phone numbers, service areas, hours
- Certifications, commissions, insurance, background-screening status
- Testimonials, years of experience, transaction counts
- Association memberships (NNA, government, industry-body logos)

Every service card must reflect a real, current status. When a service
launches, flip its `status` field to `'available'` in `script.js`.
