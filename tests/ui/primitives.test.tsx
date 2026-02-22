import { fireEvent, render } from "@testing-library/react-native";
import { AppHeader } from "../../src/ui/AppHeader";
import { PrimaryAction } from "../../src/ui/PrimaryAction";
import { SurfaceCard } from "../../src/ui/SurfaceCard";
import { StatChip } from "../../src/ui/StatChip";
import { ListRow } from "../../src/ui/ListRow";

test("renders primitive labels", () => {
  const { getByText } = render(
    <SurfaceCard>
      <AppHeader title="Lotus" subtitle="Sleep flow" />
      <StatChip label="Total" value="4h 20m" />
      <ListRow title="Nap 1" subtitle="09:10-10:00" onPress={jest.fn()} />
    </SurfaceCard>
  );

  expect(getByText("Lotus")).toBeTruthy();
  expect(getByText("Sleep flow")).toBeTruthy();
  expect(getByText("Total")).toBeTruthy();
  expect(getByText("4h 20m")).toBeTruthy();
  expect(getByText("Nap 1")).toBeTruthy();
});

test("primary action supports disabled and active states", () => {
  const onPress = jest.fn();
  const { getByRole, rerender } = render(
    <PrimaryAction label="Start Nap" onPress={onPress} disabled />
  );

  fireEvent.press(getByRole("button", { name: "Start Nap" }));
  expect(onPress).toHaveBeenCalledTimes(0);

  rerender(<PrimaryAction label="Start Nap" onPress={onPress} />);
  fireEvent.press(getByRole("button", { name: "Start Nap" }));
  expect(onPress).toHaveBeenCalledTimes(1);
});

test("list row press callback fires", () => {
  const onPress = jest.fn();
  const { getByRole } = render(
    <ListRow title="Last nap" subtitle="ended 30m ago" onPress={onPress} />
  );

  fireEvent.press(getByRole("button", { name: "Last nap" }));
  expect(onPress).toHaveBeenCalledTimes(1);
});