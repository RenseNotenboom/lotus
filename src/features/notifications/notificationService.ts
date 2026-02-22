type NotificationAdapter = {
  schedule(id: string, atIso: string, body: string): Promise<void>;
  cancel(id: string): Promise<void>;
};

type NapReminderInput = {
  nowIso: string;
  recommendedNapStartInMin: number;
  overtiredRiskOffsetInMin: number;
};

export type NotificationService = {
  scheduleNapReminders(input: NapReminderInput): Promise<void>;
  schedulePredictionReminder(input: { recommendedNapStartAtIso: string }): Promise<void>;
};

function addMinutes(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60000).toISOString();
}

export function createNotificationService(adapter: NotificationAdapter): NotificationService {
  return {
    async scheduleNapReminders(input) {
      await adapter.cancel("nap-window-open");
      await adapter.cancel("overtired-risk");

      const napWindowAt = addMinutes(input.nowIso, Math.max(0, input.recommendedNapStartInMin));
      const overtiredAt = addMinutes(
        input.nowIso,
        Math.max(0, input.recommendedNapStartInMin + input.overtiredRiskOffsetInMin)
      );

      await adapter.schedule("nap-window-open", napWindowAt, "Nap window opening soon.");
      await adapter.schedule("overtired-risk", overtiredAt, "Overtired risk increasing.");
    },
    async schedulePredictionReminder(input) {
      await adapter.cancel("prediction-next-nap");
      await adapter.schedule("prediction-next-nap", input.recommendedNapStartAtIso, "Time to start the next nap.");
    }
  };
}
