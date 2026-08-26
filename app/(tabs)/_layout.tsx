import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLORS = {
  primary: "#163A5F",
  accent: "#FFB800",
  muted: "#94A3B8",
  card: "#FFFFFF",
  border: "#E2E8F0",
};

function CustomTabBar({ state, descriptors, navigation }: any) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        if (route.name === "crear") {
          return (
            <Pressable
              key={route.key}
              onPress={() => router.push("/(tabs)/crear")}
              style={styles.fabWrapper}
            >
              <View style={styles.fab}>
                <Ionicons name="add" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.fabLabel}>Crear</Text>
            </Pressable>
          );
        }

        const icons: Record<string, [string, string]> = {
          home: ["home-outline", "home"],
          tramites: ["document-text-outline", "document-text"],
          mensajes: ["chatbubble-outline", "chatbubble"],
          perfil: ["person-outline", "person"],
        };
        const labels: Record<string, string> = {
          home: "Inicio",
          tramites: "Mis trámites",
          mensajes: "Mensajes",
          perfil: "Perfil",
        };
        const [outline, filled] = icons[route.name] ?? ["ellipse-outline", "ellipse"];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tabItem}>
            <Ionicons
              name={(isFocused ? filled : outline) as any}
              size={22}
              color={isFocused ? COLORS.primary : COLORS.muted}
            />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {labels[route.name]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="tramites" />
      <Tabs.Screen name="crear" />
      <Tabs.Screen name="mensajes" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.muted,
  },
  tabLabelActive: {
    color: COLORS.primary,
  },
  fabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  fabLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.primary,
  },
});
