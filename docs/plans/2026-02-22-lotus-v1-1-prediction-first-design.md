# Lotus v1.1 Prediction-First UX Design

**Date:** 2026-02-22  
**Scope:** UI/UX upgrade focused on prediction-first dashboard behavior

## 1. Objective

Refocus the Lotus dashboard around one decision: **when to start the next nap**.  
Prediction becomes the primary surface, while logging remains fast and subordinate.

## 2. Dashboard Hierarchy

Top-to-bottom:
1. Full-width hero prediction card (dominant)
2. Compact support stats (3 chips)
3. Recent activity preview (3 rows)

## 3. Hero Specification

Idle state hero content:
- Title: `Recommended next nap`
- Primary time: exact next nap time (`11:40`)
- Secondary time: relative countdown (`in 25 min`)
- Primary CTA: `Start Nap Now`
- Secondary CTA: `Set Reminder`

Active nap state hero content:
- Live timer display
- Primary CTA: `Stop Nap`
- Secondary CTA: contextual reminder controls suppressed

## 4. Trust Layer

Hero includes:
- Confidence chip (`High`, `Medium`, `Low`)
- One-line rationale (`Based on age + last 7 naps`)

No deep algorithm breakdown in this pass.

## 5. Support Modules

### Today at a Glance
- `Total today`
- `Naps`
- `Last nap`

### Recent Activity Preview
- Last 3 entries
- Tap row to edit
- No inline delete in this pass

## 6. Interaction Rules

- Single dominant action in hero at all times.
- Secondary action (`Set Reminder`) is visible but visually subordinate.
- CTA placement optimized for one-hand thumb zone.
- Critical decision info visible without scroll on common phone heights.

## 7. Out of Scope

- Prediction algorithm redesign
- Cloud sync and caregiver collaboration
- Expanded analytics beyond current summary chips

## 8. Success Criteria

- User can identify next nap recommendation in under 2 seconds.
- User can start a nap in one tap from idle hero.
- Dashboard first viewport communicates recommendation + confidence + reason clearly.
