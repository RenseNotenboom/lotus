# Lotus MVP UX/UI Iteration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the MVP experience with a warm premium calm visual system and a stateful dashboard hero centered on live nap timing and recommended next nap time.

**Architecture:** Build a tokenized design foundation first, then migrate screens onto shared UI primitives. Introduce a dashboard presenter layer for readable time strings and hero state logic while preserving current domain/recommendation behavior.

**Tech Stack:** Expo SDK 54, React Native, TypeScript, Jest, React Native Testing Library

---

### Task 1: Expand Design Tokens

**Files:**
- Modify: `src/theme/tokens.ts`
- Test: `tests/ui/themeTokens.test.ts`

**Step 1: Write the failing test**

Create `tests/ui/themeTokens.test.ts` with assertions for:
- semantic color groups (`bg`, `ink`, `state`, `surface`)
- typography scale keys
- spacing/radius/elevation constants

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/ui/themeTokens.test.ts`  
Expected: FAIL with missing token keys.

**Step 3: Write minimal implementation**

Update `src/theme/tokens.ts` to include:
- structured semantic colors
- font scale definitions
- spacing/radius/elevation/motion constants

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/ui/themeTokens.test.ts`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/theme/tokens.ts tests/ui/themeTokens.test.ts
git commit -m "feat: expand design token system for ux iteration"
```

### Task 2: Build Shared UI Primitives

**Files:**
- Create: `src/ui/AppHeader.tsx`
- Create: `src/ui/PrimaryAction.tsx`
- Create: `src/ui/SurfaceCard.tsx`
- Create: `src/ui/StatChip.tsx`
- Create: `src/ui/ListRow.tsx`
- Test: `tests/ui/primitives.test.tsx`

**Step 1: Write the failing test**

Add `tests/ui/primitives.test.tsx` covering:
- rendering labels/text
- primary button disabled/active states
- list row press callback

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/ui/primitives.test.tsx`  
Expected: FAIL with missing component modules.

**Step 3: Write minimal implementation**

Implement primitives using only token values (no hardcoded screen styles).

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/ui/primitives.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/ui tests/ui/primitives.test.tsx
git commit -m "feat: add reusable ui primitives for premium theme"
```

### Task 3: Add Dashboard Presenter and Time Formatting

**Files:**
- Create: `src/features/dashboard/presenter.ts`
- Test: `tests/features/dashboard/presenter.test.ts`

**Step 1: Write the failing test**

Create `tests/features/dashboard/presenter.test.ts` for:
- active hero model (timer label + stop CTA)
- idle hero model (recommended next nap text + start CTA)
- readable relative labels (`in X min`, `ended X ago`)

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/dashboard/presenter.test.ts`  
Expected: FAIL with missing presenter helpers.

**Step 3: Write minimal implementation**

Implement pure functions:
- `buildDashboardHeroModel(...)`
- `formatRelativeMinutes(...)`
- `formatClockLabel(...)`

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/dashboard/presenter.test.ts`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/dashboard/presenter.ts tests/features/dashboard/presenter.test.ts
git commit -m "feat: add dashboard presenter for hero and time labels"
```

### Task 4: Redesign Dashboard Hero and Composition

**Files:**
- Create: `src/features/dashboard/HeroNapPanel.tsx`
- Create: `src/features/dashboard/TodayStatsChips.tsx`
- Create: `src/features/dashboard/RecentActivityPreview.tsx`
- Modify: `src/features/dashboard/DashboardScreen.tsx`
- Modify: `src/features/dashboard/RecommendationCard.tsx`
- Modify: `src/features/dashboard/QuickActions.tsx`
- Test: `tests/features/dashboard/dashboard.test.tsx`

**Step 1: Write the failing test**

Extend `tests/features/dashboard/dashboard.test.tsx` with expectations for:
- active timer hero text
- idle recommended-next-nap hero text
- three stat chips
- recent activity preview (3 rows)

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/dashboard/dashboard.test.tsx`  
Expected: FAIL due to missing new dashboard sections.

**Step 3: Write minimal implementation**

Refactor dashboard into composed sections using shared primitives and presenter outputs.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/dashboard/dashboard.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/dashboard tests/features/dashboard/dashboard.test.tsx
git commit -m "feat: redesign dashboard with stateful hero and stats preview"
```

### Task 5: Apply Visual Unification to Timeline and History

**Files:**
- Modify: `src/features/timeline/TodayTimelineScreen.tsx`
- Modify: `src/features/history/HistoryScreen.tsx`
- Modify: `src/features/history/summary.ts`
- Test: `tests/features/timeline/timeline.test.tsx`
- Test: `tests/features/history/summary.test.ts`

**Step 1: Write the failing test**

Add visual/structure assertions:
- timeline uses tokenized row component patterns
- history summary renders compact card-style data blocks

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/timeline/timeline.test.tsx tests/features/history/summary.test.ts`  
Expected: FAIL with outdated structure expectations.

**Step 3: Write minimal implementation**

Update timeline/history composition to shared primitives and spacing rhythm.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/timeline/timeline.test.tsx tests/features/history/summary.test.ts`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/timeline/TodayTimelineScreen.tsx src/features/history/HistoryScreen.tsx src/features/history/summary.ts tests/features/timeline/timeline.test.tsx tests/features/history/summary.test.ts
git commit -m "feat: unify timeline and history visual language"
```

### Task 6: Apply Visual Unification to Settings and Final QA

**Files:**
- Modify: `src/features/settings/SettingsScreen.tsx`
- Modify: `README.md`
- Test: `tests/features/settings/settings.test.tsx`
- Modify: `tests/app.smoke.test.tsx`

**Step 1: Write the failing test**

Create `tests/features/settings/settings.test.tsx` to verify:
- grouped settings sections
- premium row styling structure
- toggle interaction remains functional

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/settings/settings.test.tsx`  
Expected: FAIL with missing section structure.

**Step 3: Write minimal implementation**

Refactor settings to tokenized grouped sections and update README screenshots/description text.

**Step 4: Run full verification**

Run: `npm test -- --runInBand`  
Expected: PASS all suites.

**Step 5: Commit**

```bash
git add src/features/settings/SettingsScreen.tsx tests/features/settings/settings.test.tsx tests/app.smoke.test.tsx README.md
git commit -m "chore: finalize full app ux/ui iteration and verification"
```

### Task 7: Safe Area Migration Follow-Up

**Files:**
- Modify: `src/features/dashboard/DashboardScreen.tsx`
- Modify: `package.json`
- Test: `tests/features/dashboard/dashboard.test.tsx`

**Step 1: Write the failing test**

Add assertion that dashboard renders within a `SafeAreaProvider` wrapper in test setup.

**Step 2: Run test to verify it fails**

Run: `npm test -- --runInBand tests/features/dashboard/dashboard.test.tsx`  
Expected: FAIL with current deprecated safe area usage assumptions.

**Step 3: Write minimal implementation**

Replace `SafeAreaView` usage with `react-native-safe-area-context` components and provider wiring.

**Step 4: Run test to verify it passes**

Run: `npm test -- --runInBand tests/features/dashboard/dashboard.test.tsx`  
Expected: PASS and no deprecation warnings from this surface.

**Step 5: Commit**

```bash
git add src/features/dashboard/DashboardScreen.tsx package.json tests/features/dashboard/dashboard.test.tsx
git commit -m "fix: migrate safe area usage to safe-area-context"
```
