# Grease Trap Crew (greasetrapcrew.com)

Programmatic SEO site for **Canada grease trap and interceptor** services, generated from the pSEO master workbook.

## Stack

- Next.js 16 (App Router)
- Static generation for all plan pages
- Tailwind CSS 4 (global design tokens in `src/app/globals.css`)

## Data

Regenerate page JSON from Excel:

```bash
python3 scripts/generate-pages.py
```

Source workbook: `~/Downloads/pSEO - Canada Grease Trap.xlsx` (sheet **pSEO Page Plan**).

Outputs:

- `src/data/greasetrap-pages.json` — 624 routes
- `src/data/greasetrap-sections.json` — section groupings for navigation

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` for canonical URLs in production.

## Lead intake (Bitrix — same as proofresponse-mainsite)

Forms POST to `/api/service-request`, map to `canada_urban_callback_v1` when a page slug is present, and forward to:

`{BITRIX_MIDDLEWARE_URL}/webhooks/inbound/website/form`

Copy `BITRIX_MIDDLEWARE_URL` and `WEBSITE_INTAKE_SECRET` from proofresponse-mainsite (or your telnyx-driver deployment). See `.env.example`.

`GET /api/service-request` returns `{ enabled: true }` when intake is configured.

**Asset baseline (T02):** `https://greasetrapcrew.com` — 624 static pSEO routes; pillars include `/grease-trap-cleaning` and `/emergency-grease-trap-cleaning`.

## Phone / CTA

Default click-to-call: **1-888-914-2367** (`src/lib/greasetrap.ts`). Retreaver DNI (`61bb5feaf11dced8a51529c3fa06c6ff`) and GTM `GTM-KWWBLPP2` load from `src/app/layout.tsx`. Update phone there and re-run `generate-pages.py` if you change the workbook CTA string.
