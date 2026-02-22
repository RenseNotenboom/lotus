import { fireEvent, render } from "@testing-library/react-native";
import { PredictionHero } from "../../../src/features/dashboard/PredictionHero";
import type { DashboardHeroModel } from "../../../src/features/dashboard/presenter";

function buildIdleModel(): DashboardHeroModel {
  return {
    mode: "idle",
    primaryLabel: "Start Nap Now",
    secondaryLabel: "Set Reminder",
    mainText: "Recommended next nap in 22 min",
    subText: "Suggested time 12:22",
    recommendedTimeLabel: "12:22",
    countdownLabel: "in 22 min",
    confidenceLabel: "High confidence",
    reason: "Based on age baseline and your recent naps."
  };
}

test("renders recommendation title, time and countdown", () => {
  const { getByText } = render(
    <PredictionHero model={buildIdleModel()} onPrimaryAction={jest.fn()} onSecondaryAction={jest.fn()} />
  );

  expect(getByText("Recommended next nap")).toBeTruthy();
  expect(getByText("12:22")).toBeTruthy();
  expect(getByText("in 22 min")).toBeTruthy();
});

test("shows confidence chip and rationale", () => {
  const { getByText } = render(
    <PredictionHero model={buildIdleModel()} onPrimaryAction={jest.fn()} onSecondaryAction={jest.fn()} />
  );

  expect(getByText("High confidence")).toBeTruthy();
  expect(getByText("Based on age baseline and your recent naps.")).toBeTruthy();
});

test("primary and secondary actions fire in idle mode", () => {
  const onPrimaryAction = jest.fn();
  const onSecondaryAction = jest.fn();
  const { getByRole } = render(
    <PredictionHero
      model={buildIdleModel()}
      onPrimaryAction={onPrimaryAction}
      onSecondaryAction={onSecondaryAction}
    />
  );

  fireEvent.press(getByRole("button", { name: "Start Nap Now" }));
  fireEvent.press(getByRole("button", { name: "Set Reminder" }));

  expect(onPrimaryAction).toHaveBeenCalledTimes(1);
  expect(onSecondaryAction).toHaveBeenCalledTimes(1);
});

test("hides secondary action in active mode", () => {
  const { queryByRole } = render(
    <PredictionHero
      model={{
        mode: "active",
        primaryLabel: "Stop Nap",
        mainText: "Current nap: 00:15:00",
        subText: "Started at 10:00"
      }}
      onPrimaryAction={jest.fn()}
      onSecondaryAction={jest.fn()}
    />
  );

  expect(queryByRole("button", { name: "Set Reminder" })).toBeNull();
});
