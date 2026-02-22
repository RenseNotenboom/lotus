import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function SettingsScreen() {
  const [napWindowReminder, setNapWindowReminder] = useState(true);
  const [overtiredReminder, setOvertiredReminder] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Settings</Text>

      <Pressable onPress={() => setNapWindowReminder((current) => !current)} style={styles.row}>
        <Text>Nap window reminder</Text>
        <Text>{napWindowReminder ? "On" : "Off"}</Text>
      </Pressable>

      <Pressable onPress={() => setOvertiredReminder((current) => !current)} style={styles.row}>
        <Text>Overtired reminder</Text>
        <Text>{overtiredReminder ? "On" : "Off"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a"
  },
  row: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
