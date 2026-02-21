import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { SleepSession } from "../../domain/types";
import { validateManualSession } from "./sessionValidation";

type ManualSessionFormProps = {
  existingSessions: SleepSession[];
  onSave(session: SleepSession): void;
};

export function ManualSessionForm({ existingSessions, onSave }: ManualSessionFormProps) {
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    const nowIso = new Date().toISOString();
    const candidate: SleepSession = {
      id: `manual-${Date.now()}`,
      startAt,
      endAt,
      source: "manual",
      createdAt: nowIso,
      updatedAt: nowIso
    };

    const result = validateManualSession(candidate, existingSessions);
    if (!result.valid) {
      setError(result.error ?? "Invalid manual session.");
      return;
    }

    setError(null);
    onSave(candidate);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput placeholder="Start ISO" value={startAt} onChangeText={setStartAt} style={styles.input} />
      <TextInput placeholder="End ISO" value={endAt} onChangeText={setEndAt} style={styles.input} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable accessibilityRole="button" onPress={onSubmit} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Manual Sleep</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
    width: "100%"
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  errorText: {
    color: "#b91c1c"
  },
  saveButton: {
    backgroundColor: "#0f172a",
    borderRadius: 999,
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600"
  }
});
