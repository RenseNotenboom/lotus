import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { DashboardScreen } from "../../../src/features/dashboard/DashboardScreen";

test("renders timer, recommendation card, and quick actions", () => {
  const { getByRole, getByText } = render(<DashboardScreen />);

  expect(getByRole("button", { name: "Start Sleep" })).toBeTruthy();
  expect(getByText(/Best nap start:/i)).toBeTruthy();
  expect(getByText(/Expected length:/i)).toBeTruthy();
  expect(getByRole("button", { name: "Add Manual Sleep" })).toBeTruthy();
  expect(getByRole("button", { name: "Edit Last Entry" })).toBeTruthy();
});

test("quick actions update helper message", () => {
  const { getByRole, getByText } = render(<DashboardScreen />);

  fireEvent.press(getByRole("button", { name: "Add Manual Sleep" }));
  expect(getByText(/Manual add opened/i)).toBeTruthy();

  fireEvent.press(getByRole("button", { name: "Edit Last Entry" }));
  expect(getByText(/Edit last entry opened/i)).toBeTruthy();
});

test("core log flow", async () => {
  const { getByRole, getByText } = render(<DashboardScreen />);

  fireEvent.press(getByRole("button", { name: "Start Sleep" }));
  await waitFor(() => {
    expect(getByRole("button", { name: "Stop Sleep" })).toBeTruthy();
  });

  fireEvent.press(getByRole("button", { name: "Stop Sleep" }));
  await waitFor(() => {
    expect(getByText(/Sleep session saved/i)).toBeTruthy();
  });
});
