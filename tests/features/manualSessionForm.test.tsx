import { fireEvent, render } from "@testing-library/react-native";
import { ManualSessionForm } from "../../src/features/sessions/ManualSessionForm";

test("shows validation error for invalid range", async () => {
  const { getByPlaceholderText, getByRole, findByText } = render(
    <ManualSessionForm existingSessions={[]} onSave={jest.fn()} />
  );

  fireEvent.changeText(getByPlaceholderText("Start ISO"), "2026-02-21T12:00:00.000Z");
  fireEvent.changeText(getByPlaceholderText("End ISO"), "2026-02-21T11:00:00.000Z");
  fireEvent.press(getByRole("button", { name: "Save Manual Sleep" }));

  expect(await findByText(/after start/i)).toBeTruthy();
});

test("calls onSave when entry is valid", async () => {
  const onSave = jest.fn();
  const { getByPlaceholderText, getByRole } = render(
    <ManualSessionForm existingSessions={[]} onSave={onSave} />
  );

  fireEvent.changeText(getByPlaceholderText("Start ISO"), "2026-02-21T10:00:00.000Z");
  fireEvent.changeText(getByPlaceholderText("End ISO"), "2026-02-21T10:45:00.000Z");
  fireEvent.press(getByRole("button", { name: "Save Manual Sleep" }));

  expect(onSave).toHaveBeenCalledTimes(1);
});