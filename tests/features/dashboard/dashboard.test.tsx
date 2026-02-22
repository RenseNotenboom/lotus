import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DashboardScreen } from "../../../src/features/dashboard/DashboardScreen";

function renderDashboard() {
  return render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 44, left: 0, right: 0, bottom: 34 }
      }}
    >
      <DashboardScreen />
    </SafeAreaProvider>
  );
}

test("renders idle hero with recommendation and dashboard modules", () => {
  const { getByRole, getByText, getAllByTestId, getAllByText } = renderDashboard();

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
  const { getByRole, getByText } = renderDashboard();

  fireEvent.press(getByRole("button", { name: "Add Manual Sleep" }));
  expect(getByText(/Manual add opened/i)).toBeTruthy();

  fireEvent.press(getByRole("button", { name: "Edit Last Entry" }));
  expect(getByText(/Edit last entry opened/i)).toBeTruthy();
});

test("core log flow", async () => {
  const { getByRole, getByText } = renderDashboard();

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

test("does not emit SafeAreaView deprecation warning", () => {
  const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);

  renderDashboard();

  expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining("SafeAreaView has been deprecated"));
  warnSpy.mockRestore();
});
