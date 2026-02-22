# Lotus MVP UX/UI Iteration Design

**Date:** 2026-02-22  
**Scope:** MVP iteration focused on UX/UI quality (no backend or algorithm redesign)

## 1. Iteration Goal

Deliver a warm premium calm interface pass across the app, optimized for sleep-deprived one-hand use.  
Primary emphasis is visual quality and clarity while preserving current MVP behavior.

## 2. Visual Direction

Direction selected: **Warm premium calm**.

Principles:
- Quiet hierarchy with one dominant action at a time.
- Warm, low-stimulation palette suitable for night use.
- Editorial typography style with high practical legibility.
- Tactile layered surfaces, soft borders, and subtle depth.

## 3. Dashboard Composition (Approved)

Top-to-bottom:
1. Lightweight header/brand area.
2. Stateful hero panel:
   - Active nap: live timer (`HH:MM:SS`) and `Stop Nap` primary action.
   - Idle state: `Recommended next nap time` and `Start Nap` primary action.
3. `Today at a glance` with 3 compact chips:
   - Total today
   - Naps
   - Last nap
4. Recommendation rationale card (short explanation, not dense text).
5. Recent activity preview:
   - Last 3 sessions
   - Tap row to edit
6. Secondary quick actions, visually subordinate to hero.

UX constraints:
- Critical info and primary action visible immediately.
- Human-readable times (`in 25 min`, `11:40`), no raw timestamps.
- Minimal cognitive load under stress.

## 4. Cross-Screen UX/UI Pass

Apply visual language consistently to:
- Dashboard
- Timeline
- History
- Settings

Shared UI primitives and spacing system should replace screen-local styling drift.

## 5. Architecture Changes

- Expand token system in `src/theme/tokens.ts` for semantic color tiers, typography, spacing, elevation, and motion constants.
- Introduce reusable primitives in `src/ui/` (header, primary action, card surface, stat chip, list row).
- Add a dashboard presenter/view-model layer to compute hero state and readable time labels.
- Keep data model and suggestion logic stable; only presentation and UX flow evolve.

## 6. Testing Strategy

- Component tests for hero state variants (active timer vs idle recommendation).
- Formatting tests for relative/clock time labels.
- Interaction tests for start/stop flow and row-to-edit action.
- Regression test suite remains fully green.

## 7. Out of Scope

- Family sync and multi-device support.
- Prediction algorithm redesign.
- New backend or data entities.

## 8. Follow-Up

After implementation:
- Migrate deprecated `SafeAreaView` usage to `react-native-safe-area-context`.
- Re-run visual QA on common mobile sizes.
