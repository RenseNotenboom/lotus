import { render } from "@testing-library/react-native";
import { TodayTimelineScreen } from "../../../src/features/timeline/TodayTimelineScreen";

test("renders timeline sessions in order", () => {
  const { getAllByTestId } = render(
    <TodayTimelineScreen
      sessions={[
        {
          id: "late",
          startAt: "2026-02-21T14:00:00.000Z",
          endAt: "2026-02-21T14:30:00.000Z",
          source: "manual",
          createdAt: "2026-02-21T14:30:00.000Z",
          updatedAt: "2026-02-21T14:30:00.000Z"
        },
        {
          id: "early",
          startAt: "2026-02-21T09:00:00.000Z",
          endAt: "2026-02-21T09:45:00.000Z",
          source: "timer",
          createdAt: "2026-02-21T09:45:00.000Z",
          updatedAt: "2026-02-21T09:45:00.000Z"
        }
      ]}
    />
  );

  const rows = getAllByTestId("timeline-row");
  expect(rows).toHaveLength(2);
  expect(rows[0].props.children[0].props.children).toContain("early");
});