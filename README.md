# Arborwise OS production repair

Arborwise OS is a mobile-first operations board for Arborwise Tree Care.

## What this revision fixes

- Repairs the Vercel root route that was returning `500 FUNCTION_INVOCATION_FAILED`.
- Deploys exactly three functions: the main API router, OAuth router, and sync endpoint.
- Always opens with populated starter data instead of an empty or broken board.
- Restores a large, visible **SYNC** button and connection-status screen.
- Attempts a live refresh every hour while the app is open and whenever it returns online.
- Adds an hourly GitHub Actions sync for background operation.
- Keeps the board usable in **LOCAL MODE** when the database is unavailable.
- Expires the stale `arborwise-os-v4` service-worker cache.
- Corrects QuickBooks estimates 2010–2019 to **Estimate Sent**, assigned to Greg, with follow-up due July 24, 2026.
- Removes the incorrect seed work orders `WO-2010` through `WO-2019`.
- Saves mileage, hours, notes, and records to the server whenever live mode is available.

## Required Vercel environment variables

For login and secure provider tokens:

- `APP_PIN`
- `SESSION_SECRET`
- `ENCRYPTION_KEY`

For live database mode:

- `DATABASE_URL`

For QuickBooks:

- `QBO_CLIENT_ID`
- `QBO_CLIENT_SECRET`
- `QBO_ENVIRONMENT` (`production` for the real company)

For Google:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

For automated sync:

- `CRON_SECRET`

The QuickBooks callback remains:

`https://arborwise-os.vercel.app/api/oauth/quickbooks/callback`

The Google callback remains:

`https://arborwise-os.vercel.app/api/oauth/google/callback`

## Hourly background sync

Vercel Hobby cron jobs cannot run hourly. The repository therefore includes `.github/workflows/hourly-sync.yml`. Add a GitHub Actions repository secret named `CRON_SECRET` with the same value used in Vercel. The workflow calls the protected sync endpoint once per hour.

## Validation

Run:

```bash
npm run check
```

This checks the consolidated API, OAuth and sync functions, database repair, provider integrations, client application, and service worker.
