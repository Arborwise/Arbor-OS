# Arborwise Customer Communication Engine

## Purpose

Close customer communication loops without silently sending messages.

## Safety rules

- Gmail drafts only. No customer email is sent by this engine.
- Existing records are seeded on first run. Old records do not generate a flood of drafts.
- Every communication has a unique event key to prevent duplicates.
- Missing customer email creates a Missing Information item instead of a broken draft.
- Approval, acceptance, decline, rejection, hold, archive, expiration, cancellation, conversion, or scheduling stops an unsent three-day follow-up.
- A customer email reply stops an unsent three-day follow-up.
- Every Gmail draft is read back from Gmail and verified before the event is marked Draft.

## Trigger sequence

1. Estimate visit changes to Completed or Estimate Complete.
   - Create the Thank You for Having Arborwise Out Today draft.
   - Attach the approved welcome flyer.
   - Attach up to two approved service guides.
   - Pruning Guide is included for any limb, branch, deadwood, widowmaker, clearance, canopy, shaping, training, or structural work.

2. Written estimate changes to Estimate Sent, Sent, Emailed, or Delivered.
   - If the completed-visit trigger was missed, create the welcome draft as a safety net.
   - Start the three-full-day clock.

3. Three full days pass.
   - Recheck status, email replies, and customer email.
   - Create the Arborwise Way follow-up draft only when the estimate remains open with no reply.

4. Job changes to Done, Completed, Invoiced, or Paid.
   - Create a queued satisfaction follow-up item.
   - Hold it at Needs Asset until the final approved post-job customer letter is locked.

## Database tables

- `record_status_state`: latest observed status for each Arborwise record.
- `record_status_events`: permanent transition ledger.
- `communication_events`: planned, due, drafted, cancelled, missing-information, needs-asset, and error items.

## API

- `GET /api/communications`: list the communication queue for an authenticated owner.
- `POST /api/communications`: process transitions and due drafts for an authenticated owner or cron request.
- `/api/sync` also processes communication transitions after Sheets, QuickBooks, Gmail, and Calendar synchronization.

## Asset defaults

- Thank You for Having Arborwise Out Today flyer
- Pruning Guide
- Arborwise Way three-day follow-up master exported to PDF

Additional guide IDs can be supplied through Vercel environment variables.
