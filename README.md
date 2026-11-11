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

## Phone / CTA

Default click-to-call: **1-888-473-2737** (`src/lib/greasetrap.ts`). Update there and re-run `generate-pages.py` if you change the script default CTA string.
