# Lotus

Lotus is a mobile-first sleep tracker for newborns and babies (0-12 months), designed for fast one-hand logging and calm nighttime readability.

## MVP Features

- Stateful nap hero on dashboard:
  - Active nap shows live duration and `Stop Nap`
  - Idle state shows `Recommended next nap` and `Start Nap`
- Today at-a-glance chips (`Total today`, `Naps`, `Last nap`)
- Recent activity preview with quick edit entry points
- Manual sleep entry with validation and overlap guard
- Age-based nap recommendation with bounded personalization
- Timeline and history summaries
- Local reminder scheduling service

## UX/UI Iteration Status

- Warm premium calm visual system with shared tokens and primitives
- Unified dashboard/timeline/history/settings styling direction
- Full Jest regression coverage for core interactions

## Tech

- Expo SDK 54
- React Native + TypeScript
- Jest + React Native Testing Library

## Scripts

- `npm install`
- `npm test -- --runInBand`
- `npm run start`
- `npm run web`