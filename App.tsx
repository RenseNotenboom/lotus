import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { useSleepTimer } from "./src/features/sleepTimer/useSleepTimer";

export default function App() {
  const { state, rehydrate, start, stop } = useSleepTimer();

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  const onPressTimer = async () => {
    const nowIso = new Date().toISOString();
    if (state.isRunning) {
      await stop(nowIso);
      return;
    }
    await start(nowIso);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lotus</Text>
      <Pressable onPress={onPressTimer} style={styles.primaryAction}>
        <Text style={styles.primaryActionText}>{state.isRunning ? "Stop Sleep" : "Start Sleep"}</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7f1"
  },
  title: {
    fontSize: 24,
    fontWeight: "700"
  },
  primaryAction: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#1e293b"
  },
  primaryActionText: {
    color: "#ffffff",
    fontWeight: "600"
  }
});
