# Lotus MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a phone-first, local-only sleep tracker for babies (0-12 months) with nap timing and duration suggestions based on age and recent logged naps.

**Architecture:** Expo React Native app (with react-native-web compatibility) using a local data layer and a rule-based suggestion engine with bounded personalization. Keep suggestion logic behind a stable interface so post-MVP heuristic/AI models can replace internals without UI rewrites.

**Tech Stack:** Expo, React Native, TypeScript, React Navigation, local database (SQLite via Expo), local notifications, Jest, React Native Testing Library

---

### Task 1: Bootstrap Project and Tooling

**Files:**
- Create: `package.json`
- Create: `app.json`
- Create: `tsconfig.json`
- Create: `babel.config.js`
- Create: `App.tsx`
- Create: `src/`
- Create: `tests/`

**Step 1: Write the failing test**

Create `tests/app.smoke.test.tsx`:

```tsx
import { render } from "@testing-library/react-native";
import App from "../App";

test("renders lotus shell", () => {
  const { getByText } = render(<App />);
  expect(getByText("Lotus")).toBeTruthy();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/app.smoke.test.tsx`
Expected: FAIL with module/app setup missing.

**Step 3: Write minimal implementation**

Create minimal `App.tsx` that renders `Lotus`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/app.smoke.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add package.json app.json tsconfig.json babel.config.js App.tsx tests/app.smoke.test.tsx
git commit -m "chore: bootstrap lotus expo typescript project"
```

### Task 2: Define Domain Types and Local Data Schema

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/data/db.ts`
- Create: `src/data/repositories/childProfileRepo.ts`
- Create: `src/data/repositories/sleepSessionRepo.ts`
- Create: `src/data/repositories/suggestionRepo.ts`
- Test: `tests/data/schema.test.ts`

**Step 1: Write the failing test**

Create `tests/data/schema.test.ts` with schema expectations for:
- `child_profiles`
- `sleep_sessions`
- `suggestion_snapshots`

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/data/schema.test.ts`
Expected: FAIL due to missing schema init and repo methods.

**Step 3: Write minimal implementation**

Implement DB initialization and table creation SQL with typed repository interfaces.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/data/schema.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/domain/types.ts src/data/db.ts src/data/repositories/*.ts tests/data/schema.test.ts
git commit -m "feat: add local schema and repositories for mvp entities"
```

### Task 3: Implement Sleep Timer Lifecycle with Recovery

**Files:**
- Create: `src/features/sleepTimer/sleepTimerStore.ts`
- Create: `src/features/sleepTimer/useSleepTimer.ts`
- Modify: `App.tsx`
- Test: `tests/features/sleepTimer.lifecycle.test.ts`

**Step 1: Write the failing test**

Create tests for:
- start timer creates active session state
- stop timer persists complete sleep session
- rehydrate restores running timer after simulated app restart

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/sleepTimer.lifecycle.test.ts`
Expected: FAIL with missing hooks/store/recovery logic.

**Step 3: Write minimal implementation**

Implement timer state machine and persistence contract.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/features/sleepTimer.lifecycle.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/sleepTimer App.tsx tests/features/sleepTimer.lifecycle.test.ts
git commit -m "feat: implement sleep timer start stop and recovery"
```

### Task 4: Add Manual Sleep Entry and Edit Validation

**Files:**
- Create: `src/features/sessions/sessionValidation.ts`
- Create: `src/features/sessions/ManualSessionForm.tsx`
- Modify: `src/data/repositories/sleepSessionRepo.ts`
- Test: `tests/features/sessionValidation.test.ts`
- Test: `tests/features/manualSessionForm.test.tsx`

**Step 1: Write the failing test**

Add tests for:
- reject `endAt <= startAt`
- reject unrealistic durations
- reject overlaps unless explicit override flag is passed

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/sessionValidation.test.ts`
Expected: FAIL with missing validation functions.

**Step 3: Write minimal implementation**

Implement validation utilities and form-level error states.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/features/sessionValidation.test.ts tests/features/manualSessionForm.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/sessions src/data/repositories/sleepSessionRepo.ts tests/features/sessionValidation.test.ts tests/features/manualSessionForm.test.tsx
git commit -m "feat: add manual session entry with validation and overlap protection"
```

### Task 5: Build Age-Based Recommendation Baseline

**Files:**
- Create: `src/features/suggestions/ageBands.ts`
- Create: `src/features/suggestions/baselineEngine.ts`
- Create: `src/features/suggestions/types.ts`
- Test: `tests/features/suggestions/baselineEngine.test.ts`

**Step 1: Write the failing test**

Write test cases for representative ages in 0-12 months and expected:
- wake window range
- baseline duration range
- fallback behavior

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/suggestions/baselineEngine.test.ts`
Expected: FAIL with missing age mapping logic.

**Step 3: Write minimal implementation**

Implement deterministic age-band mapping and baseline recommendation output.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/features/suggestions/baselineEngine.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/suggestions/ageBands.ts src/features/suggestions/baselineEngine.ts src/features/suggestions/types.ts tests/features/suggestions/baselineEngine.test.ts
git commit -m "feat: implement age-based baseline suggestion engine"
```

### Task 6: Add Bounded Personalization from Recent Naps

**Files:**
- Create: `src/features/suggestions/personalization.ts`
- Create: `src/features/suggestions/SuggestionEngine.ts`
- Modify: `src/features/suggestions/baselineEngine.ts`
- Test: `tests/features/suggestions/personalization.test.ts`

**Step 1: Write the failing test**

Add tests for:
- adaptation based on last 7-14 days
- outlier rejection
- hard cap on adjustment magnitude (for example `<= +/-20%`)

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/suggestions/personalization.test.ts`
Expected: FAIL with missing adjustment algorithm.

**Step 3: Write minimal implementation**

Implement bounded adjustment layer and expose stable `SuggestionEngine` interface.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/features/suggestions/personalization.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/suggestions/personalization.ts src/features/suggestions/SuggestionEngine.ts src/features/suggestions/baselineEngine.ts tests/features/suggestions/personalization.test.ts
git commit -m "feat: add bounded personalization layer for recommendations"
```

### Task 7: Integrate Dashboard UX (Timer + Suggestion Card + Quick Actions)

**Files:**
- Create: `src/features/dashboard/DashboardScreen.tsx`
- Create: `src/features/dashboard/RecommendationCard.tsx`
- Create: `src/features/dashboard/QuickActions.tsx`
- Create: `src/navigation/AppNavigator.tsx`
- Modify: `App.tsx`
- Test: `tests/features/dashboard/dashboard.test.tsx`

**Step 1: Write the failing test**

Test that dashboard shows:
- start/stop primary CTA
- live timer state
- recommendation card with start/duration/rationale
- manual add/edit quick action buttons

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/dashboard/dashboard.test.tsx`
Expected: FAIL with missing screen/components.

**Step 3: Write minimal implementation**

Build mobile-first dashboard and wire engine + repositories.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/features/dashboard/dashboard.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/dashboard src/navigation/AppNavigator.tsx App.tsx tests/features/dashboard/dashboard.test.tsx
git commit -m "feat: add dashboard with timer recommendation and quick actions"
```

### Task 8: Add Timeline, History, and Daily Summaries

**Files:**
- Create: `src/features/timeline/TodayTimelineScreen.tsx`
- Create: `src/features/history/HistoryScreen.tsx`
- Create: `src/features/history/summary.ts`
- Test: `tests/features/history/summary.test.ts`
- Test: `tests/features/timeline/timeline.test.tsx`

**Step 1: Write the failing test**

Add tests for:
- chronological ordering
- day total sleep calculation
- rendering session blocks for current day

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/history/summary.test.ts tests/features/timeline/timeline.test.tsx`
Expected: FAIL with missing summary/screen logic.

**Step 3: Write minimal implementation**

Implement summary helpers and timeline/history screens.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/features/history/summary.test.ts tests/features/timeline/timeline.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/timeline src/features/history tests/features/history/summary.test.ts tests/features/timeline/timeline.test.tsx
git commit -m "feat: add today timeline and history summaries"
```

### Task 9: Add Local Reminder Notifications

**Files:**
- Create: `src/features/notifications/notificationService.ts`
- Create: `src/features/settings/SettingsScreen.tsx`
- Modify: `src/features/suggestions/SuggestionEngine.ts`
- Test: `tests/features/notifications/notificationService.test.ts`

**Step 1: Write the failing test**

Add tests for:
- schedule "nap window opening soon"
- schedule "overtired risk"
- cancellation/reschedule behavior when new session is logged

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/notifications/notificationService.test.ts`
Expected: FAIL with missing scheduling service.

**Step 3: Write minimal implementation**

Integrate local notification API and simple settings toggles.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/features/notifications/notificationService.test.ts`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/notifications src/features/settings src/features/suggestions/SuggestionEngine.ts tests/features/notifications/notificationService.test.ts
git commit -m "feat: add local reminder scheduling and notification settings"
```

### Task 10: Polish Mobile UX + Verification + Docs

**Files:**
- Create: `src/theme/tokens.ts`
- Modify: `src/features/dashboard/DashboardScreen.tsx`
- Modify: `README.md`
- Create: `docs/plans/2026-02-21-lotus-post-mvp-options.md`

**Step 1: Write the failing test**

Create UI test for core flow completion in <=2 taps from dashboard start state.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/features/dashboard/dashboard.test.tsx -t "core log flow"`
Expected: FAIL before final UX adjustments.

**Step 3: Write minimal implementation**

Apply final theme tokens and reduce friction in primary logging flow.

**Step 4: Run full verification**

Run: `npm test`
Expected: PASS all tests.

**Step 5: Commit**

```bash
git add src/theme/tokens.ts src/features/dashboard/DashboardScreen.tsx README.md docs/plans/2026-02-21-lotus-post-mvp-options.md
git commit -m "chore: polish mvp ux and document post-mvp roadmap"
```

## Post-MVP Expansion Tracks (Design Room Reserved)

Track A:
- Optional family sync and caregiver sharing.

Track B:
- Multi-child support with profile switcher.

Track C:
- Advanced analytics and trend insights.

Track D:
- Heuristic/ML suggestion engine upgrade using stored prediction-vs-actual metrics.
