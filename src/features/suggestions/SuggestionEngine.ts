import { buildBaselineSuggestion } from "./baselineEngine";
import { applyPersonalization } from "./personalization";

type RecommendationInput = {
  dateOfBirth: string;
  nowIso: string;
  lastWakeAtIso?: string;
  recentWakeToNapMinutes: number[];
  recentNapDurationMinutes: number[];
};

type RecommendationOutput = {
  recommendedNapStartInMin: number;
  estimatedDurationMin: number;
  overtiredRiskOffsetInMin: number;
  rationale: string;
};

export type SuggestionEngine = {
  getRecommendation(input: RecommendationInput): RecommendationOutput;
};

export function createSuggestionEngine(): SuggestionEngine {
  return {
    getRecommendation(input) {
      const baseline = buildBaselineSuggestion({
        dateOfBirth: input.dateOfBirth,
        nowIso: input.nowIso,
        lastWakeAtIso: input.lastWakeAtIso
      });

      const adjusted = applyPersonalization(
        {
          recommendedNapStartInMin: baseline.recommendedNapStartInMin,
          estimatedDurationMin: baseline.estimatedDurationMin
        },
        {
          recentWakeToNapMinutes: input.recentWakeToNapMinutes,
          recentNapDurationMinutes: input.recentNapDurationMinutes
        }
      );

      return {
        ...adjusted,
        overtiredRiskOffsetInMin: 20,
        rationale: `${baseline.rationale} Personalized using recent naps.`
      };
    }
  };
}
