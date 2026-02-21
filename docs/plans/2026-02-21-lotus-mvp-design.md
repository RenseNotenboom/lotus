# Lotus MVP Design

**Date:** 2026-02-21  
**Product:** Lotus  
**Scope:** MVP (local-first, single-device, newborn/infant sleep tracking)

## 1. Product Direction

Lotus is a phone-first sleep tracker for newborns and babies (0-12 months), focused on speed and reliability during high-stress caregiving moments. The app must make logging effortless and provide evidence-based nap timing suggestions adapted to the baby's own history.

## 2. Platform Decision

Selected approach: **Expo React Native + react-native-web**.

Why:
- Best fit for phone-first workflow and app-store path.
- Strong native capabilities for reminders and lifecycle handling.
- Web support remains available through shared UI primitives.

Explicitly out of MVP:
- Electron desktop shell.
- Family sync / multi-device collaboration.

## 3. MVP Scope

Included:
- One-tap sleep timer (start/stop).
- Manual sleep entry add/edit for missed logs.
- Today timeline and recent history.
- Nap suggestion card with:
  - Suggested nap start time.
  - Estimated nap duration.
  - Short rationale (age baseline + recent patterns).
- Basic local reminders:
  - Nap window opening soon.
  - Overtired risk warning.

Excluded:
- Cloud account system.
- Multi-child households.
- AI model training/serving in production.
- Family sync.

## 4. Core Architecture

Modules:
- `Sleep Logging` (timer + manual edits).
- `Suggestion Engine` (rule-based baseline with bounded adaptation).
- `Timeline & History`.
- `Local Notifications`.
- `Settings` (child profile, reminder toggles).

Storage:
- Local persistent database only (device-first, offline-capable).

## 5. Data Model (MVP)

Entities:
- `ChildProfile`
  - `id`, `name`, `dateOfBirth`, `createdAt`, `updatedAt`
- `SleepSession`
  - `id`, `startAt`, `endAt`, `source` (`timer` | `manual`), `createdAt`, `updatedAt`
- `SuggestionSnapshot`
  - `id`, `generatedAt`, `recommendedNapStartAt`, `estimatedDurationMin`, `rationale`, `inputsVersion`

## 6. Suggestion Logic

Approach selected: **Rule-based baseline with lightweight personalization**.

Flow:
1. Compute current age band from `dateOfBirth` (0-12 months).
2. Load age-based wake window and baseline nap duration.
3. Apply bounded adjustments from recent naps (last 7-14 days).
4. Reject outliers and cap adaptation magnitude.
5. Return recommendation:
   - `Start nap in ~X min`
   - `Expected duration ~Y min`
   - Concise rationale

Safety constraints:
- Keep recommendations within age-appropriate bounds.
- Fall back to baseline when data is sparse.

## 7. UX Principles

- Core action visible immediately: start/stop timer.
- One-hand operation for fast interaction.
- Log in <= 2 taps for primary flows.
- Night-safe presentation (low stimulation).
- Minimal cognitive load; recommendations are plain-language.

Primary dashboard:
- Large stateful timer CTA.
- Live timer while active.
- Recommendation card directly below.
- Quick actions: manual add/edit last entry.

Secondary screens:
- Today timeline.
- History summaries.
- Settings.

## 8. Error Handling

- Recover active timer state after app restart.
- Validate manual ranges (`endAt > startAt`, realistic duration).
- Prevent overlapping sessions by default.
- Graceful recommendation fallback when data is insufficient.

## 9. Testing Strategy

- Unit tests for age mapping and adaptation bounds.
- Unit tests for recommendation text and safe fallback.
- Integration tests for timer lifecycle and recovery.
- Integration tests for manual edits and timeline updates.
- Notification scheduling tests.

## 10. Extensibility Plan

Prepared, but out of MVP:
- Family sync and shared caregivers.
- Multi-child profiles.
- Heuristic/ML predictor behind stable `SuggestionEngine` interface.
- Rich analytics and wearable integrations.

Implementation handoff follows in:
- `docs/plans/2026-02-21-lotus-mvp-implementation-plan.md`
