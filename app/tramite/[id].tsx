import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ESTADOS_SEGUIMIENTO } from "../../data/mockData";

const COLORS = {
  primary: "#163A5F",
  accent: "#FFB800",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#10182B",
  muted: "#94A3B8",
  border: "#E2E8F0",
  success: "#16A34A",
};

// Índice mock del estado actual (0-based). En producción vendría del backend.
const ESTADO_ACTUAL = 3;

export default function SeguimientoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Seguimiento</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.tramiteNombre}>SOAT - Renovación</Text>
          <Text style={styles.tramiteId}>Solicitud {params.id ?? "TC-482913"}</Text>

          <View style={styles.summaryRow}>
            <Ionicons name="person-outline" size={14} color={COLORS.muted} />
            <Text style={styles.summaryText}>Gestor: Carlos Ramírez</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.muted} />
            <Text style={styles.summaryText}>Cali</Text>
          </View>

          <Pressable
            onPress={() => router.push("/(tabs)/mensajes")}
            style={styles.chatButton}
          >
            <Ionicons name="chatbubble-outline" size={16} color={COLORS.primary} />
            <Text style={styles.chatButtonText}>Escribir a mi gestor</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Línea de tiempo</Text>

        <View style={styles.timeline}>
          {ESTADOS_SEGUIMIENTO.map((estado, index) => {
            const isDone = index < ESTADO_ACTUAL;
            const isCurrent = index === ESTADO_ACTUAL;
            const isLast = index === ESTADOS_SEGUIMIENTO.length - 1;

            return (
              <View key={estado.key} style={styles.timelineRow}>
                <View style={styles.timelineIndicatorColumn}>
                  <View
                    style={[
                      styles.timelineDot,
                      isDone && styles.timelineDotDone,
                      isCurrent && styles.timelineDotCurrent,
                    ]}
                  >
                    {isDone && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                  {!isLast && (
                    <View style={[styles.timelineLine, isDone && styles.timelineLineDone]} />
                  )}
                </View>

                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineLabel,
                      (isDone || isCurrent) && styles.timelineLabelActive,
                    ]}
                  >
                    {estado.label}
                  </Text>
                  <Text style={styles.timelineDetalle}>{estado.detalle}</Text>
                  {estado.fecha && <Text style={styles.timelineFecha}>{estado.fecha}</Text>}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: { padding: 8, width: 38 },
  headerTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text },

  content: { padding: 20, paddingBottom: 40 },

  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 24,
  },
  tramiteNombre: { fontSize: 17, fontWeight: "800", color: COLORS.text },
  tramiteId: { fontSize: 12, color: COLORS.muted, marginTop: 2, marginBottom: 12 },
  summaryRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  summaryText: { fontSize: 13, color: COLORS.text },

  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 12,
  },
  chatButtonText: { fontSize: 13, fontWeight: "700", color: COLORS.primary },

  sectionTitle: { fontSize: 15, fontWeight: "800", color: COLORS.text, marginBottom: 16 },

  timeline: { paddingLeft: 4 },
  timelineRow: { flexDirection: "row" },
  timelineIndicatorColumn: { alignItems: "center", width: 28 },
  timelineDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineDotDone: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  timelineDotCurrent: { borderColor: COLORS.primary, borderWidth: 3 },
  timelineLine: { width: 2, flex: 1, minHeight: 32, backgroundColor: COLORS.border },
  timelineLineDone: { backgroundColor: COLORS.success },

  timelineContent: { flex: 1, paddingLeft: 12, paddingBottom: 24 },
  timelineLabel: { fontSize: 14, fontWeight: "700", color: COLORS.muted },
  timelineLabelActive: { color: COLORS.text },
  timelineDetalle: { fontSize: 12, color: COLORS.muted, marginTop: 2, lineHeight: 17 },
  timelineFecha: { fontSize: 11, color: COLORS.primary, marginTop: 4, fontWeight: "600" },
});
