import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
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
  border: "#E2E8F0",
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Información incompleta", "Ingresa tu correo y contraseña.");
      return;
    }
    // Próximamente: POST /auth/login
    router.replace("/(tabs)/home");
  };

  const handleForgotPassword = () => {
    Alert.alert("Recuperar contraseña", "Aquí construiremos el proceso de recuperación.");
  };

  const handleCreateAccount = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.scrollContent}>
          <View style={styles.banner}>
            <View style={styles.logoCircle}>
              <Ionicons name="car-sport" size={30} color={COLORS.primary} />
            </View>
            <Text style={styles.logoText}>TRÁMITES CITY</Text>
            <Text style={styles.bannerSubtitle}>
              Tus trámites de tránsito, más fáciles
            </Text>
          </View>

          <View style={styles.roadLine}>
            {Array.from({ length: 14 }).map((_, i) => (
              <View key={i} style={styles.dash} />
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Correo electrónico</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color={COLORS.muted} style={styles.inputIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.muted} style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={styles.input}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.showButton}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={COLORS.primary}
                />
              </Pressable>
            </View>

            <Pressable onPress={handleForgotPassword} style={styles.forgotButton}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [styles.loginButton, pressed && styles.buttonPressed]}
            >
              <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
              <Pressable onPress={handleCreateAccount}>
                <Text style={styles.registerLink}>Crear cuenta</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primary },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, backgroundColor: COLORS.bg },

  banner: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  logoText: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", letterSpacing: 1.5 },
  bannerSubtitle: { color: "#C9D6E3", fontSize: 13, marginTop: 6 },

  roadLine: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingBottom: 14,
  },
  dash: { width: 12, height: 3, borderRadius: 2, backgroundColor: COLORS.accent, marginHorizontal: 3 },

  card: {
    backgroundColor: COLORS.card,
    marginTop: -20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    flex: 1,
  },

  label: { fontSize: 13, fontWeight: "700", color: COLORS.text, marginBottom: 8, marginTop: 4 },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
    backgroundColor: "#FBFCFD",
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, height: "100%", fontSize: 15, color: COLORS.text },
  showButton: { padding: 4 },

  forgotButton: { alignSelf: "flex-end", marginBottom: 24 },
  forgotText: { fontSize: 13, fontWeight: "600", color: COLORS.primary },

  loginButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonPressed: { opacity: 0.85 },
  loginButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", letterSpacing: 0.5 },

  registerContainer: { alignItems: "center", marginTop: 28 },
  registerText: { fontSize: 13, color: COLORS.muted },
  registerLink: { marginTop: 6, fontSize: 14, fontWeight: "700", color: COLORS.primary },
});
