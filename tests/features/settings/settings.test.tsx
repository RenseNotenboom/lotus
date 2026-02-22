import { fireEvent, render } from "@testing-library/react-native";
import { SettingsScreen } from "../../../src/features/settings/SettingsScreen";

test("renders grouped settings sections", () => {
  const { getByText } = render(<SettingsScreen />);

  expect(getByText("Child profile")).toBeTruthy();
  expect(getByText("Reminders")).toBeTruthy();
  expect(getByText("App behavior")).toBeTruthy();
});

test("toggles reminder settings", () => {
  const { getByRole, getAllByText } = render(<SettingsScreen />);

  expect(getAllByText("On").length).toBeGreaterThanOrEqual(2);

  fireEvent.press(getByRole("button", { name: "Nap window reminder" }));
  expect(getAllByText("Off").length).toBeGreaterThanOrEqual(1);
});