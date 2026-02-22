import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SurfaceCard } from "../../ui/SurfaceCard";
import { theme } from "../../theme/tokens";

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

type ToggleRowProps = {
  label: string;
  value: boolean;
  onToggle(): void;
};

function ToggleRow({ label, value, onToggle }: ToggleRowProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onToggle} style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value ? "On" : "Off"}</Text>
    </Pressable>
  );
}

export function SettingsScreen() {
  const [napWindowReminder, setNapWindowReminder] = useState(true);
  const [overtiredReminder, setOvertiredReminder] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Settings</Text>

      <SectionTitle>Child profile</SectionTitle>
      <SurfaceCard>
        <View style={styles.group}>
          <Text style={styles.info}>Name: Baby</Text>
          <Text style={styles.info}>Age range: 0-12 months</Text>
        </View>
      </SurfaceCard>

      <SectionTitle>Reminders</SectionTitle>
      <SurfaceCard>
        <View style={styles.group}>
          <ToggleRow
            label="Nap window reminder"
            value={napWindowReminder}
            onToggle={() => setNapWindowReminder((current) => !current)}
          />
          <ToggleRow
            label="Overtired reminder"
            value={overtiredReminder}
            onToggle={() => setOvertiredReminder((current) => !current)}
          />
        </View>
      </SurfaceCard>

      <SectionTitle>App behavior</SectionTitle>
      <SurfaceCard>
        <Text style={styles.info}>Time format: 24-hour</Text>
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: theme.spacing.sm
  },
  title: {
    fontFamily: theme.type.family.display,
    fontSize: theme.type.size.h1,
    color: theme.colors.ink.strong
  },
  sectionTitle: {
    fontFamily: theme.type.family.ui,
    color: theme.colors.ink.muted,
    fontSize: theme.type.size.small,
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  group: {
    gap: theme.spacing.sm
  },
  info: {
    color: theme.colors.ink.default,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs
  },
  rowLabel: {
    color: theme.colors.ink.default,
    fontFamily: theme.type.family.body,
    fontSize: theme.type.size.body
  },
  rowValue: {
    color: theme.colors.state.action,
    fontFamily: theme.type.family.ui,
    fontWeight: theme.type.weight.semibold,
    fontSize: theme.type.size.body
  }
});