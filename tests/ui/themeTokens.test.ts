import { theme } from "../../src/theme/tokens";

test("exposes semantic color groups for premium calm ui", () => {
  expect(theme.colors).toHaveProperty("bg");
  expect(theme.colors).toHaveProperty("ink");
  expect(theme.colors).toHaveProperty("surface");
  expect(theme.colors).toHaveProperty("state");
});

test("exposes typography scale", () => {
  expect(theme.type).toHaveProperty("family");
  expect(theme.type).toHaveProperty("size");
  expect(theme.type.size).toHaveProperty("hero");
  expect(theme.type.size).toHaveProperty("body");
});

test("exposes spacing radius and elevation", () => {
  expect(theme.spacing).toHaveProperty("xs");
  expect(theme.spacing).toHaveProperty("xl");
  expect(theme.radius).toHaveProperty("pill");
  expect(theme.elevation).toHaveProperty("card");
  expect(theme.motion).toHaveProperty("normal");
});