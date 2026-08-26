import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#163A5F",
  accent: "#FFB800",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#10182B",
  muted: "#64748B",
  border: "#E2E8F0",
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola 👋</Text>
            <Text style={styles.name}>Bienvenido de nuevo</Text>
          </View>
          <View style={styles.avatar}>
            <Ionicons name="person" size={22} color="#FFFFFF" />
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/(tabs)/crear")}
          style={({ pressed }) => [styles.ctaCard, pressed && styles.pressed]}
        >
          <View style={styles.ctaIcon}>
            <Ionicons name="add-circle" size={26} color="#FFFFFF" />
          </View>
          <View style={styles.ctaTextWrapper}>
            <Text style={styles.ctaTitle}>Crear un nuevo trámite</Text>
            <Text style={styles.ctaSubtitle}>
              Conecta con un gestor certificado en minutos
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.sectionTitle}>Tus trámites activos</Text>

        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={40} color={COLORS.muted} />
          <Text style={styles.emptyTitle}>Aún no tienes trámites</Text>
          <Text style={styles.emptyText}>
            Cuando crees uno, podrás seguir su estado aquí en tiempo real.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Trámites populares</Text>

        <View style={styles.chipsRow}>
          {["SOAT", "Licencia", "Traspaso", "Comparendos"].map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { padding: 20, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: { fontSize: 14, color: COLORS.muted },
  name: { fontSize: 20, fontWeight: "800", color: COLORS.text, marginTop: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  ctaCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  pressed: { opacity: 0.9 },
  ctaIcon: { marginRight: 12 },
  ctaTextWrapper: { flex: 1 },
  ctaTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  ctaSubtitle: { color: "#C9D6E3", fontSize: 12, marginTop: 2 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
  },

  emptyState: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    padding: 28,
    marginBottom: 28,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 10,
  },
  emptyText: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 18,
  },

  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipText: { fontSize: 12, fontWeight: "700", color: COLORS.primary },
});
