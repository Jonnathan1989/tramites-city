import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#163A5F",
  accent: "#FFB800",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#10182B",
  muted: "#64748B",
};

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.top}>
        <View style={styles.logoCircle}>
          <Ionicons name="car-sport" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.brand}>TRÁMITES CITY</Text>

        <Text style={styles.headline}>
          Realiza tus trámites sin desplazarte.{"\n"}Nosotros nos encargamos.
        </Text>

        <Text style={styles.description}>
          Conectamos tus trámites de tránsito con gestores certificados en la
          ciudad que necesites. Seguimiento en tiempo real, sin viajar.
        </Text>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.accent} />
            <Text style={styles.featureText}>Gestores{"\n"}verificados</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="time-outline" size={20} color={COLORS.accent} />
            <Text style={styles.featureText}>Seguimiento{"\n"}en tiempo real</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.accent} />
            <Text style={styles.featureText}>Pagos{"\n"}protegidos</Text>
          </View>
        </View>
      </View>

      {/* Línea vial punteada — firma visual de marca */}
      <View style={styles.roadLine}>
        {Array.from({ length: 14 }).map((_, i) => (
          <View key={i} style={styles.dash} />
        ))}
      </View>

      <View style={styles.card}>
        <Pressable
          onPress={() => router.push("/register")}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>CREAR CUENTA</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/login")}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>INICIAR SESIÓN</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primary },

  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 24,
  },

  headline: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 27,
    marginBottom: 14,
  },
  description: {
    color: "#C9D6E3",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 30,
  },

  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureText: {
    color: "#C9D6E3",
    fontSize: 11,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 15,
  },

  roadLine: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingBottom: 14,
  },
  dash: {
    width: 12,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
    marginHorizontal: 3,
  },

  card: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 36,
  },

  primaryButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  secondaryButton: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  pressed: { opacity: 0.85 },
});
