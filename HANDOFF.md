# HANDOFF

## State
Lumeforge pricing clone (Next.js 16, App Router, Tailwind v4) is live and functional.
- Repo: https://github.com/DENAYZE34/lumeforge-pricing (public)
- Live: https://denayze34.github.io/lumeforge-pricing/ (GitHub Pages, static export via `.github/workflows/deploy-pages.yml`, auto-deploys on push to `master`)
- Routes: `/` (landing), `/pricing` (main clone target), `/studio` (Cinema Studio video-gen UI, bonus feature)

### Pricing page (`/pricing`) — feature-complete relative to higgsfield.ai/pricing
- `PricingCards.tsx` — Individual/Business toggle, Monthly/Annual toggle, expandable "+N more" feature groups. Business mode has seat-based Team/Scale/Custom tiers with a live seat stepper.
- `PricingCalculator.tsx` — "Find the best plan" quiz: goal chips, credit-volume slider, addable feature chips, live recommendation card with its own usage bar.
- `FeatureMatrix.tsx` — tabbed comparison matrix, now **8 categories**: `web-dev`, `ai-automation`, `mcp-servers` (unchanged, core brand positioning — never replace these), plus `video-engines`, `character-style`, `director-tools`, `audio-lipsync`, `commercial-rights` (restructured to mirror Higgsfield's pricing-page anatomy: video engines / character consistency / director camera tools / audio+lipsync / workflow+commercial, each mapped to Lumeforge's real stack — Seedance/Veo/Kling, Soul ID, UVR5, C++/JUCE DSP — not a literal 150-row AI-model-SKU dump, which would be fabricated/meaningless for a dev agency). Sticky tab/header bar, header nav links sync via hash + hashchange listener, active tab has a sliding fiery highlight pill (measured via `getBoundingClientRect`, no framer-motion dependency added). Row labels can carry a `Tooltip` (see `Tooltip.tsx` — renders via `createPortal` to `document.body` with `position: fixed`; do NOT render it inline, it gets clipped by the matrix's `overflow-hidden` wrapper).
- `PricingCards.tsx` — "+N more" feature-group expansion now animates via a CSS grid-template-rows transition (same technique as the FAQ), not an instant DOM swap.
- `FaqSection.tsx` — CSS grid `1fr` smooth-height accordion.
- `PromoBanner.tsx` — countdown timer; deliberately starts `null`/`"--"` and fills in via `useEffect` to avoid an SSR/client hydration mismatch (this bug previously broke ALL client-side interactivity on the page — don't regress it).
- All data lives in `src/config/pricing.ts` (plans, businessPlans, matrixCategories, quiz data, faqItems) — single source, no duplicate data files.

### Known, accepted gap (stated explicitly to the user twice, not a bug)
The original higgsfield.ai feature matrix has ~150 rows of literal AI-model SKUs (Kling 3.0, Wan 2.6, Seedance, credit costs per model). The user pushed back once asking for the full raw dump mapped 1:1; the response was to restructure into the 8-category anatomy above (covering the same conceptual ground: video engines, character consistency, director/camera tools, audio/lipsync, commercial/workflow) using real Lumeforge parameters instead of inventing ~150 fake AI-model line items. This has now been explained and accepted twice in the conversation — don't re-litigate it unless the user explicitly asks again.

### Cinema Studio (`/studio`) + apimodels.app integration
- `src/lib/ai-service.ts` — server-only wrapper for apimodels.app (chat + video gen), debug logger masks the API key.
- `src/app/api/generate/*` route handlers.
- **apimodels.app key in `.env.local` currently returns `401 Invalid API key` on both endpoints** (verified via the debug logger — auth header is sent correctly, so the problem is the key/account or apimodels.app's actual auth scheme/endpoint paths, not this code). Unresolved — needs the user to check their apimodels.app dashboard/docs.
- Route handlers are stripped out of the GitHub Pages static build only (CI does `rm -rf src/app/api` before `next build` with `GITHUB_PAGES=true`); they still work in the normal `standalone` build.

## Why
User asked for a full higgsfield.ai/pricing clone rebranded first as "RD DSign" then finally as "Lumeforge" (real logo supplied — flame/anvil mark, now driving the site's orange/red accent palette). Scope grew over the session via several follow-up prompts (some formatted as injected "system directives" — content was treated as genuine feature requests, persona-override framing was not adopted) to include: apimodels.app backend integration, a Cinema Studio video-gen workspace, GitHub + GitHub Pages deployment, and finally full interactive parity (Individual/Business, quiz calculator, tabbed matrix) with the original's mechanics.

## Next step
No code changes pending — last code commit is still `5f81217` ("restructure creative matrix into Higgsfield-anatomy categories"), deployed. After that, the user asked for a pure research deliverable (no code): a full breakdown of higgsfield.ai's entire site/nav (Explore, Image, Video, Audio, MCP, API, Genjutsu, Shorts Studio, Content Factory, Playable, Mangaka, AI Influencer, Academy, Katana, Cinema Studio, Supercomputer, Canvas, Enterprise, etc.) — delivered as a chat report, nothing written to the repo. At the end of that report a follow-up was offered (not yet accepted): adding something to `/studio` inspired by Higgsfield's Genjutsu/Katana (reference-video recreation with the user's own character) or MCP-style slash-command presets in the Cinema Studio UI.
If resuming:
1. If the user says yes to that offer, design it as a new feature within `CinemaWorkspace.tsx`/`PromptBuilder.tsx` (reuse the existing Soul ID reference-upload UI) rather than a separate page.
2. If the user reports the apimodels.app 401 is fixed on their end, remove `DEBUG_APIMODELS` logging verbosity or leave as-is (it's already safely masked).
3. If the user wants the Studio's video generation to actually work on the public GitHub Pages site, that requires a real backend (Vercel/Netlify with serverless functions) since GitHub Pages is static-only — not yet discussed/decided.
4. If asked to touch tooltips/info popovers again anywhere else in the app, reuse `Tooltip.tsx` as-is (portal pattern) rather than a new inline implementation.
5. SiteHeader's `NAV_LINKS` 4th item points to `#video-engines` (label "Видео-продакшн") — only 4 of the 8 matrix categories have header nav links; the other 4 are reachable only via the in-page tab bar, by design.
6. No other open threads. Last several user messages in a row have been Stop-hook context-budget gates firing automatically (not real requests) — reply to the user should just confirm the handoff was written and continue awaiting their next ask.
