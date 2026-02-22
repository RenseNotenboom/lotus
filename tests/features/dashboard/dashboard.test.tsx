import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { DashboardScreen } from "../../../src/features/dashboard/DashboardScreen";

test("renders idle hero with recommendation and dashboard modules", () => {
  const { getByRole, getByText, getAllByTestId, getAllByText } = render(<DashboardScreen />);

  expect(getByRole("button", { name: "Start Nap" })).toBeTruthy();
  expect(getAllByText(/Recommended next nap/i).length).toBeGreaterThan(0);
  expect(getByText("Total today")).toBeTruthy();
  expect(getByText("Naps")).toBeTruthy();
  expect(getByText("Last nap")).toBeTruthy();
  expect(getAllByTestId("recent-activity-row")).toHaveLength(3);
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

  fireEvent.press(getByRole("button", { name: "Start Nap" }));
  await waitFor(() => {
    expect(getByRole("button", { name: "Stop Nap" })).toBeTruthy();
    expect(getByText(/Current nap:/i)).toBeTruthy();
  });

  fireEvent.press(getByRole("button", { name: "Stop Nap" }));
  await waitFor(() => {
    expect(getByText(/Sleep session saved/i)).toBeTruthy();
  });
});
