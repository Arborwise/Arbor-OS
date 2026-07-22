# Arborwise OS connected backend, revision 2

## Corrected in this revision

- Restored the exact uploaded Arborwise tree-and-hands logo instead of the altered generated version.
- Removed the checkerboard background and cropped the logo so NURTURE YOUR NATURE stays readable.
- Removed the yellow circle around Annie and enlarged the owl as a free-standing helper.
- Added an in-app Connections panel with honest QuickBooks and Google status.
- The Sync button now opens Connections when QuickBooks is not authorized instead of silently failing.
- QuickBooks and Google synchronize independently, so one missing provider no longer breaks the other.
- Added clear QuickBooks configuration errors and production/sandbox API selection.
- Seeds the 10 known July 21 approved QuickBooks estimates, including the four KW records, plus matching work orders into an empty database.
- Restored the full equipment inventory during first-time setup.

## QuickBooks one-time connection

Add QBO_CLIENT_ID and QBO_CLIENT_SECRET to Vercel, redeploy, then open Arborwise OS and tap the sync status or Sync button. Tap Connect QuickBooks and approve the Arborwise company. The redirect URI to register in Intuit is:

https://arborwise-os.vercel.app/api/oauth/quickbooks/callback

The ChatGPT QuickBooks connector is separate and cannot donate its OAuth token to the hosted app.

## v3 connection-status correction

The refresh button now treats QuickBooks and Google independently, explains that ChatGPT's QuickBooks connector is separate from Arborwise OS, and no longer reports a generic QuickBooks failure when another authorized source can sync. Live QuickBooks synchronization still requires QBO_CLIENT_ID, QBO_CLIENT_SECRET, and one in-app Intuit approval.


## v4 hours, voice estimate, and home-screen app

- Added a separate HOURS tab with employee, job/customer, start, end, break, calculated hours, status, weekly totals, and server persistence.
- Added a microphone button that works from any screen in Chrome. Dictation is converted into a reviewable estimate draft; pruning language automatically selects Tree Pruning and inserts Arborwise's full standard pruning scope. Nothing is emailed or sent to QuickBooks without review.
- Added a Progressive Web App manifest, service worker, and Annie home-screen icons. After v4 is deployed, remove the old shortcut and install Arborwise OS again to get Annie as the app icon.
- Live URL remains https://arborwise-os.vercel.app after deployment to the existing Vercel project.
