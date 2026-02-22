import { createNotificationService } from "../../../src/features/notifications/notificationService";

test("schedules nap window opening soon and overtired risk reminders", async () => {
  const scheduled: { id: string; atIso: string; body: string }[] = [];
  const service = createNotificationService({
    async schedule(id, atIso, body) {
      scheduled.push({ id, atIso, body });
    },
    async cancel(id) {
      const index = scheduled.findIndex((entry) => entry.id === id);
      if (index >= 0) {
        scheduled.splice(index, 1);
      }
    }
  });

  await service.scheduleNapReminders({
    nowIso: "2026-02-21T12:00:00.000Z",
    recommendedNapStartInMin: 30,
    overtiredRiskOffsetInMin: 20
  });

  expect(scheduled).toHaveLength(2);
  expect(scheduled[0].body).toMatch(/nap window/i);
  expect(scheduled[1].body).toMatch(/overtired/i);
});

test("reschedule clears prior reminders", async () => {
  const scheduled = new Set<string>();
  const service = createNotificationService({
    async schedule(id) {
      scheduled.add(id);
    },
    async cancel(id) {
      scheduled.delete(id);
    }
  });

  await service.scheduleNapReminders({
    nowIso: "2026-02-21T12:00:00.000Z",
    recommendedNapStartInMin: 10,
    overtiredRiskOffsetInMin: 20
  });

  await service.scheduleNapReminders({
    nowIso: "2026-02-21T12:20:00.000Z",
    recommendedNapStartInMin: 15,
    overtiredRiskOffsetInMin: 20
  });

  expect(scheduled.has("nap-window-open")).toBe(true);
  expect(scheduled.has("overtired-risk")).toBe(true);
});