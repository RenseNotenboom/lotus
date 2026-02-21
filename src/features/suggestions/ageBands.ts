import type { AgeBand } from "./types";

const AGE_BANDS: AgeBand[] = [
  { label: "0-6 weeks", minWeeks: 0, maxWeeks: 6, wakeWindowMin: [45, 75], napDurationMin: [60, 150] },
  { label: "6-12 weeks", minWeeks: 6, maxWeeks: 12, wakeWindowMin: [60, 90], napDurationMin: [50, 130] },
  { label: "3-4 months", minWeeks: 12, maxWeeks: 20, wakeWindowMin: [75, 110], napDurationMin: [45, 120] },
  { label: "4-6 months", minWeeks: 20, maxWeeks: 28, wakeWindowMin: [90, 150], napDurationMin: [45, 110] },
  { label: "6-9 months", minWeeks: 28, maxWeeks: 40, wakeWindowMin: [120, 180], napDurationMin: [40, 105] },
  { label: "9-12 months", minWeeks: 40, maxWeeks: 52, wakeWindowMin: [150, 240], napDurationMin: [35, 95] }
];

export function getAgeBandForWeeks(ageWeeks: number): AgeBand {
  const found = AGE_BANDS.find((band) => ageWeeks >= band.minWeeks && ageWeeks < band.maxWeeks);
  return found ?? AGE_BANDS[AGE_BANDS.length - 1];
}
