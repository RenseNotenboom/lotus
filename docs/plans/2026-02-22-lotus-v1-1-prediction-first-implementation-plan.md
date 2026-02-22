# Lotus v1.1 Prediction-First Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a prediction-first dashboard where next-nap recommendation is the dominant surface with a single primary action and compact supporting context.

**Architecture:** Extend dashboard presenter output into a dedicated prediction hero model (time, countdown, confidence, rationale, CTA state). Keep existing suggestion engine behavior but enrich UI mappings and shared components to support confidence/reason and reminder action controls.

**Tech Stack:** Expo SDK 54, React Native, TypeScript, Jest, React Native Testing Library

---

### Task 1: Extend Dashboard Presenter for Prediction-First Hero

**Files:**
- Modify: `src/features/dashboard/presenter.ts`
- Test: `tests/features/dashboard/presenter.test.ts`

**Step 1: Write the failing test**

Add tests for:
- idle hero output includes `recommendedTimeLabel`, `countdownLabel`, `confidenceLabel`, `reason`
- primary/secondary actions are `Start Nap Now` + `Set Reminder`
- active state suppresses secondary reminder action

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/dashboard/presenter.test.ts`  
Expected: FAIL due to missing fields/actions.

**Step 3: Write minimal implementation**

Implement presenter additions:
- confidence mapping (`high`, `medium`, `low`)
- humanized recommendation labels
- action state model

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/dashboard/presenter.test.ts`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/dashboard/presenter.ts tests/features/dashboard/presenter.test.ts
git commit -m "feat: extend dashboard presenter for prediction-first hero"
```

### Task 2: Build Prediction Hero Component

**Files:**
- Create: `src/features/dashboard/PredictionHero.tsx`
- Modify: `src/ui/PrimaryAction.tsx`
- Test: `tests/features/dashboard/predictionHero.test.tsx`

**Step 1: Write the failing test**

Create `tests/features/dashboard/predictionHero.test.tsx` for:
- hero renders recommendation title/time/countdown
- confidence chip + rationale line visible
- primary CTA (`Start Nap Now`) works
- secondary CTA (`Set Reminder`) works in idle mode only

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/dashboard/predictionHero.test.tsx`  
Expected: FAIL with missing component behavior.

**Step 3: Write minimal implementation**

Implement `PredictionHero` with:
- warm premium layout
- confidence chip
- primary + secondary CTA slots

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/dashboard/predictionHero.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/dashboard/PredictionHero.tsx src/ui/PrimaryAction.tsx tests/features/dashboard/predictionHero.test.tsx
git commit -m "feat: add prediction-first hero component"
```

### Task 3: Wire Dashboard to Prediction-First Composition

**Files:**
- Modify: `src/features/dashboard/DashboardScreen.tsx`
- Modify: `src/features/dashboard/TodayStatsChips.tsx`
- Modify: `src/features/dashboard/RecentActivityPreview.tsx`
- Test: `tests/features/dashboard/dashboard.test.tsx`

**Step 1: Write the failing test**

Update dashboard tests to require:
- hero title `Recommended next nap`
- primary CTA `Start Nap Now`
- secondary CTA `Set Reminder`
- confidence chip + reason line visible

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/dashboard/dashboard.test.tsx`  
Expected: FAIL with old hero labels/actions.

**Step 3: Write minimal implementation**

Refactor dashboard:
- replace previous hero with `PredictionHero`
- wire new presenter model
- keep stats chips + recent activity below hero

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/dashboard/dashboard.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/dashboard/DashboardScreen.tsx src/features/dashboard/TodayStatsChips.tsx src/features/dashboard/RecentActivityPreview.tsx tests/features/dashboard/dashboard.test.tsx
git commit -m "feat: make dashboard prediction-first with start-now flow"
```

### Task 4: Add Reminder CTA Behavior Contract

**Files:**
- Modify: `src/features/notifications/notificationService.ts`
- Test: `tests/features/notifications/notificationService.test.ts`

**Step 1: Write the failing test**

Add test for dashboard-driven reminder scheduling:
- `Set Reminder` schedules nap-window reminder at recommended time
- repeat action replaces previous reminder (idempotent behavior)

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/notifications/notificationService.test.ts`  
Expected: FAIL with missing specific reminder contract.

**Step 3: Write minimal implementation**

Expose explicit service method for prediction-hero reminder action.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/notifications/notificationService.test.ts`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/notifications/notificationService.ts tests/features/notifications/notificationService.test.ts
git commit -m "feat: add prediction-hero reminder scheduling contract"
```

### Task 5: Visual Polish and Full Regression

**Files:**
- Modify: `src/theme/tokens.ts`
- Modify: `README.md`
- Modify: `tests/app.smoke.test.tsx`

**Step 1: Write the failing test**

Add/adjust smoke assertion to ensure hero prediction title + primary CTA text are present.

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/app.smoke.test.tsx`  
Expected: FAIL before updated copy/structure.

**Step 3: Write minimal implementation**

Finalize token/copy adjustments for consistent prediction-first wording.

**Step 4: Run full verification**

Run: `npm test -- --runInBand`  
Expected: PASS all tests.

**Step 5: Commit**

```bash
git add src/theme/tokens.ts README.md tests/app.smoke.test.tsx
git commit -m "chore: finalize prediction-first dashboard polish and docs"
```
