import { Stack } from "expo-router";
import { Platform, View, StyleSheet } from "react-native";

export default function RootLayout() {
  const content = (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#163A5F" },
        animation: "fade",
      }}
    />
  );

  if (Platform.OS !== "web") {
    return content;
  }

  return (
    <View style={styles.webBackdrop}>
      <View style={styles.phoneFrame}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  webBackdrop: {
    flex: 1,
    minHeight: "100vh" as any,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneFrame: {
    width: 420,
    maxWidth: "100%",
    height: "100vh" as any,
    maxHeight: 900,
    overflow: "hidden",
    borderRadius: 24,
    boxShadow: "0 0 0 10px #0F172A, 0 20px 50px rgba(0,0,0,0.35)" as any,
  },
});
