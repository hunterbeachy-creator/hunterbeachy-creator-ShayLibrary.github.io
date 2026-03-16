# Shay's Library

A cozy personal home library web app built with Next.js and designed for ISBN barcode-scanner workflows.

## Highlights

- ISBN scan input (scanner-as-keyboard + Enter)
- Open Library metadata lookup API route
- Catalog with grid/list views, search, and quick edit/delete
- Personal library IDs in `HB-<CATEGORY>-###` format
- Loan tracking page with overdue highlighting
- Dashboard, reading stats, wishlist, special collection, library card, and rapid Scan Mode
- LocalStorage persistence (easy to swap to Supabase/Firebase)

## Run

```bash
scripts/install-deps.sh
npm run dev
```

## Troubleshooting `npm install` / registry 403

If your environment blocks `https://registry.npmjs.org`, use an allowed mirror or internal registry:

```bash
NPM_REGISTRY_URL=https://<your-company-registry> scripts/install-deps.sh
```

The installer script:

- checks registry reachability first,
- writes the project registry setting,
- provides actionable errors when blocked.

## Troubleshooting Playwright screenshot / `ERR_EMPTY_RESPONSE`

That error usually means the web server is not running yet. Validate startup first:

```bash
scripts/run-dev-and-check.sh
```

Then run your Playwright/mcp browser screenshot flow against `http://127.0.0.1:3000` (or your custom `PORT`).

## Deployment

Deploy directly to Vercel as a standard Next.js app.

## Backend Notes

This starter stores data in browser LocalStorage for zero-config demos. For production:

1. Replace `src/lib/storage.ts` with Supabase/Firebase CRUD calls.
2. Keep `src/lib/types.ts` as your schema contract.
3. Move scan insert/update/delete flows in `src/lib/useLibrary.ts` to your backend client.
