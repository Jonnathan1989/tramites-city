import React from "react";
import {
  Alert,
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
  error: "#DC2626",
};

type MenuOption = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description: string;
  onPress: () => void;
  danger?: boolean;
};

export default function PerfilScreen() {
  const router = useRouter();

  const notify = (title: string) =>
    Alert.alert(title, "Esta sección se construirá en un siguiente paso.");

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que quieres cerrar tu sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  const options: MenuOption[] = [
    {
      icon: "person-outline",
      label: "Mis datos",
      description: "Consultar y editar tu información personal",
      onPress: () => notify("Mis datos"),
    },
    {
      icon: "shield-checkmark-outline",
      label: "Seguridad de la cuenta",
      description: "Contraseña y verificación en dos pasos",
      onPress: () => notify("Seguridad de la cuenta"),
    },
    {
      icon: "card-outline",
      label: "Métodos de pago",
      description: "Tarjetas y medios de pago guardados",
      onPress: () => notify("Métodos de pago"),
    },
    {
      icon: "document-text-outline",
      label: "Términos y políticas",
      description: "Condiciones de uso y privacidad",
      onPress: () => notify("Términos y políticas"),
    },
    {
      icon: "help-circle-outline",
      label: "Ayuda",
      description: "Centro de soporte y preguntas frecuentes",
      onPress: () => notify("Ayuda"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.name}>Jonnathan Reyes</Text>
          <Text style={styles.email}>jonnathan@ejemplo.com</Text>
        </View>

        <View style={styles.menuCard}>
          {options.map((opt, i) => (
            <Pressable
              key={opt.label}
              onPress={opt.onPress}
              style={({ pressed }) => [
                styles.menuItem,
                i === options.length - 1 && styles.menuItemLast,
                pressed && styles.menuItemPressed,
              ]}
            >
              <View style={styles.menuIconWrapper}>
                <Ionicons name={opt.icon} size={20} color={COLORS.primary} />
              </View>
              <View style={styles.menuTextWrapper}>
                <Text style={styles.menuLabel}>{opt.label}</Text>
                <Text style={styles.menuDescription}>{opt.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.menuItemPressed]}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>

        <Text style={styles.version}>Trámites City · v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scrollContent: { padding: 20, paddingBottom: 40 },

  header: { alignItems: "center", marginBottom: 24, marginTop: 8 },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  email: { fontSize: 13, color: COLORS.muted, marginTop: 2 },

  menuCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuItemPressed: { backgroundColor: "#F8FAFC" },
  menuIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8EEF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuTextWrapper: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  menuDescription: { fontSize: 12, color: COLORS.muted, marginTop: 2 },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    padding: 16,
    marginBottom: 20,
  },
  logoutText: { fontSize: 14, fontWeight: "700", color: COLORS.error },

  version: { textAlign: "center", fontSize: 12, color: COLORS.muted },
});
