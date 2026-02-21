import { render } from "@testing-library/react-native";
import App from "../App";

test("renders lotus shell", () => {
  const { getByText } = render(<App />);
  expect(getByText("Lotus")).toBeTruthy();
});