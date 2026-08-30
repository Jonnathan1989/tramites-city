import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MIS_SOLICITUDES, Solicitud, EstadoSolicitud } from "../../data/mockData";

const COLORS = {
  primary: "#163A5F",
  accent: "#FFB800",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#10182B",
  muted: "#64748B",
  border: "#E2E8F0",
  success: "#16A34A",
  successBg: "#DCFCE7",
  warning: "#B45309",
  warningBg: "#FEF3C7",
  error: "#DC2626",
  errorBg: "#FEE2E2",
};

const TABS: { key: EstadoSolicitud; label: string }[] = [
  { key: "activo", label: "Activos" },
  { key: "finalizado", label: "Finalizados" },
  { key: "cancelado", label: "Cancelados" },
];

function statusStyle(status: EstadoSolicitud) {
  if (status === "activo") return { color: COLORS.warning, bg: COLORS.warningBg };
  if (status === "finalizado") return { color: COLORS.success, bg: COLORS.successBg };
  return { color: COLORS.error, bg: COLORS.errorBg };
}

export default function TramitesScreen() {
  const [activeTab, setActiveTab] = useState<EstadoSolicitud>("activo");
  const router = useRouter();

  const filtered = MIS_SOLICITUDES.filter((t) => t.status === activeTab);

  const handleOpenDetail = (solicitud: Solicitud) => {
    router.push(`/tramite/${solicitud.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis trámites</Text>
      </View>

      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tabPill, isActive && styles.tabPillActive]}
            >
              <Text style={[styles.tabPillText, isActive && styles.tabPillTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={40} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>
              No tienes trámites {TABS.find((t) => t.key === activeTab)?.label.toLowerCase()}
            </Text>
            <Text style={styles.emptyText}>
              Cuando crees un trámite nuevo, aparecerá listado aquí.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const s = statusStyle(item.status);
          return (
            <Pressable
              onPress={() => handleOpenDetail(item)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.tipo}</Text>
                <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
              </View>

              <View style={[styles.badge, { backgroundColor: s.bg }]}>
                <Text style={[styles.badgeText, { color: s.color }]}>{item.estado}</Text>
              </View>

              <View style={styles.cardRow}>
                <Ionicons name="location-outline" size={14} color={COLORS.muted} />
                <Text style={styles.cardRowText}>{item.ciudad}</Text>
                <Ionicons name="calendar-outline" size={14} color={COLORS.muted} style={styles.cardRowIconSpacer} />
                <Text style={styles.cardRowText}>{item.fecha}</Text>
              </View>

              <View style={styles.cardRow}>
                <Ionicons name="person-outline" size={14} color={COLORS.muted} />
                <Text style={styles.cardRowText}>{item.gestor}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: "800", color: COLORS.text },

  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabPillActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabPillText: { fontSize: 13, fontWeight: "700", color: COLORS.muted },
  tabPillTextActive: { color: "#FFFFFF" },

  listContent: { paddingHorizontal: 20, paddingBottom: 40, flexGrow: 1 },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  cardPressed: { opacity: 0.85 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: { fontSize: 15, fontWeight: "800", color: COLORS.text, flex: 1 },

  badge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  badgeText: { fontSize: 11, fontWeight: "700" },

  cardRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 },
  cardRowText: { fontSize: 12, color: COLORS.muted },
  cardRowIconSpacer: { marginLeft: 12 },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: { fontSize: 15, fontWeight: "700", color: COLORS.text, marginTop: 12, textAlign: "center" },
  emptyText: { fontSize: 13, color: COLORS.muted, textAlign: "center", marginTop: 6, lineHeight: 19 },
});
