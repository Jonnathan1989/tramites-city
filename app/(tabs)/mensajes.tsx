import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
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

type Conversacion = {
  id: string;
  gestor: string;
  tramite: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
};

const CONVERSACIONES: Conversacion[] = [
  {
    id: "TC-482913",
    gestor: "Carlos Ramírez",
    tramite: "SOAT - Renovación",
    ultimoMensaje: "Ya recibí tus documentos, te aviso cuando esté listo.",
    hora: "9:41 a.m.",
    noLeidos: 2,
  },
  {
    id: "TC-357210",
    gestor: "Ana Torres",
    tramite: "Licencia de conducción",
    ultimoMensaje: "Trámite finalizado con éxito. ¡Gracias por confiar en mí!",
    hora: "Ayer",
    noLeidos: 0,
  },
];

export default function MensajesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Mensajes</Text>
      </View>

      <FlatList
        data={CONVERSACIONES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-outline" size={40} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No tienes mensajes</Text>
            <Text style={styles.emptyText}>
              Cuando un gestor sea asignado a tu trámite, podrás conversar aquí.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/chat/[id]",
                params: { id: item.id, gestor: item.gestor, tramite: item.tramite },
              })
            }
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={22} color="#FFFFFF" />
            </View>
            <View style={styles.rowContent}>
              <View style={styles.rowHeader}>
                <Text style={styles.gestorName}>{item.gestor}</Text>
                <Text style={styles.hora}>{item.hora}</Text>
              </View>
              <Text style={styles.tramite}>{item.tramite}</Text>
              <Text
                style={[styles.ultimoMensaje, item.noLeidos > 0 && styles.ultimoMensajeUnread]}
                numberOfLines={1}
              >
                {item.ultimoMensaje}
              </Text>
            </View>
            {item.noLeidos > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.noLeidos}</Text>
              </View>
            )}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: "800", color: COLORS.text },

  listContent: { paddingHorizontal: 16, paddingBottom: 24, flexGrow: 1 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 10,
  },
  rowPressed: { opacity: 0.85 },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowContent: { flex: 1 },
  rowHeader: { flexDirection: "row", justifyContent: "space-between" },
  gestorName: { fontSize: 14, fontWeight: "800", color: COLORS.text },
  hora: { fontSize: 11, color: COLORS.muted },
  tramite: { fontSize: 11, color: COLORS.primary, fontWeight: "600", marginTop: 2 },
  ultimoMensaje: { fontSize: 12, color: COLORS.muted, marginTop: 4 },
  ultimoMensajeUnread: { color: COLORS.text, fontWeight: "700" },

  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 5,
  },
  badgeText: { fontSize: 11, fontWeight: "800", color: COLORS.primary },

  emptyState: { alignItems: "center", justifyContent: "center", paddingTop: 80, paddingHorizontal: 32 },
  emptyTitle: { fontSize: 15, fontWeight: "700", color: COLORS.text, marginTop: 12 },
  emptyText: { fontSize: 13, color: COLORS.muted, textAlign: "center", marginTop: 6, lineHeight: 19 },
});
