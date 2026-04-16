# Architecture Decisions & Known Shortcuts

## V2.1 — April 2026

### Scoring engine
- **Weights are approximate on /methodology** — exact role base scores, stack multipliers, and geo adjustments are server-side only in `lib/agents/scoring/`. The methodology page shows ~rounded percentages to protect proprietary scoring.
- **No ML model yet** — scoring is rule-based lookups. When job data accumulates (PostingSnapshot + WeeklyDemandIndex), weights can be calibrated against real demand signals.

### Data pipelines (stubs)
Both job and filing pipelines are **stub implementations** — the code structure, DB models, and cron plumbing are wired up but actual scraping is gated behind env vars:
- `PROXY_URL` → activates JobSpy job scraping (Bright Data / ScraperAPI residential proxy)
- `ANTHROPIC_API_KEY` → activates SEC EDGAR + BSE India filing parsing via Claude Haiku

This means the app ships with 0 postings and 0 filing insights until keys are configured. The admin pipeline page shows this state clearly.

### Job scraper
- Uses JobSpy (Python OSS scraper). Current approach: call as subprocess or Railway sidecar. Not yet wired — the `callJobSpy()` call is TODO'd.
- Alternative: use JobSpy's HTTP API wrapper (separate Railway service) — cleaner for Node.js app.

### WARN events
- Manually curated in `public/warn-events.json` — redeploy to update. Not scraped automatically.
- The WARN Act data is public but parsing is complex; manual curation is the pragmatic choice for MVP.

### Free tier
- Top 3 drivers only, pivot path names only (no salary/timeline/skills) for free users.
- Founding era (first 100 readings): email capture unlocks full reading without payment.
- `hasFullAccess` unifies: founding member | one-time | standard | founding-era email-captured.

### Deployment
- **Railway** (Docker) is the target. `Dockerfile` + `railway.toml` included.
- Currently also deployed to Vercel (from earlier iteration) — Railway supersedes this.
- Neon PostgreSQL for DB (shared between Railway and Vercel during transition).

### Drip emails
- Day 2/5/10 drip is queued (status='queued') but `sendDripEmail()` is TODO'd — Resend template design pending.
- The cron job runs every 6h and creates EmailEvent records; actual send is a one-line addition once templates are ready.

### India geography
- Detected from user's self-reported geography in intake form.
- Salary display: INR lakhs for india, USD thousands for all others.
- No IP geolocation — avoids privacy concerns and is more accurate for remote workers.
