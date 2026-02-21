import { render, waitFor } from "@testing-library/react-native";
import App from "../App";

test("renders lotus shell", async () => {
  const { getByText } = render(<App />);
  await waitFor(() => {
    expect(getByText("Lotus")).toBeTruthy();
  });
});
