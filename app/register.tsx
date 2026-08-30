import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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
  error: "#DC2626",
};

type FormData = {
  fullName: string;
  documentId: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function RegisterScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const [form, setForm] = useState<FormData>({
    fullName: "",
    documentId: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Ingresa tu nombre y apellido.";
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = "El nombre parece muy corto.";
    }

    if (!form.documentId.trim()) {
      newErrors.documentId = "Ingresa tu número de documento.";
    } else if (!/^\d{6,15}$/.test(form.documentId.trim())) {
      newErrors.documentId = "Ingresa solo números (6 a 15 dígitos).";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Ingresa tu número de teléfono.";
    } else if (!/^\d{7,10}$/.test(form.phone.trim())) {
      newErrors.phone = "Ingresa un teléfono válido.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Ingresa tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "El correo no tiene un formato válido.";
    }

    if (!form.password) {
      newErrors.password = "Crea una contraseña.";
    } else if (form.password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = () => {
    if (!validate()) {
      Alert.alert(
        "Revisa el formulario",
        "Hay campos con información incompleta o incorrecta."
      );
      return;
    }

    // Próximamente: POST /auth/register
    Alert.alert("Trámites City", "Cuenta creada correctamente.", [
      { text: "Continuar", onPress: () => router.push("/login") },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header compacto */}
          <View style={styles.banner}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </Pressable>
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={26} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>
              Regístrate para empezar a gestionar tus trámites
            </Text>
          </View>

          <View style={styles.roadLine}>
            {Array.from({ length: 14 }).map((_, i) => (
              <View key={i} style={styles.dash} />
            ))}
          </View>

          <View style={styles.card}>
            <FormField
              label="Nombre y apellido"
              icon="person-outline"
              placeholder="Ej. Jonnathan Reyes"
              value={form.fullName}
              onChangeText={(v) => updateField("fullName", v)}
              error={errors.fullName}
              autoCapitalize="words"
            />

            <FormField
              label="Documento de identidad"
              icon="card-outline"
              placeholder="Número de cédula"
              value={form.documentId}
              onChangeText={(v) => updateField("documentId", v)}
              error={errors.documentId}
              keyboardType="number-pad"
            />

            <FormField
              label="Teléfono"
              icon="call-outline"
              placeholder="Número de contacto"
              value={form.phone}
              onChangeText={(v) => updateField("phone", v)}
              error={errors.phone}
              keyboardType="phone-pad"
            />

            <FormField
              label="Correo electrónico"
              icon="mail-outline"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChangeText={(v) => updateField("email", v)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <FormField
              label="Contraseña"
              icon="lock-closed-outline"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChangeText={(v) => updateField("password", v)}
              error={errors.password}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            <FormField
              label="Confirmar contraseña"
              icon="lock-closed-outline"
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChangeText={(v) => updateField("confirmPassword", v)}
              error={errors.confirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <Pressable
              onPress={handleCreateAccount}
              style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
            >
              <Text style={styles.submitButtonText}>CREAR CUENTA</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
              <Pressable onPress={() => router.push("/login")}>
                <Text style={styles.loginLink}>Iniciar sesión</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type FormFieldProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "number-pad" | "phone-pad";
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
  autoCorrect?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
};

function FormField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
  rightIcon,
  onRightIconPress,
}: FormFieldProps) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputContainerError]}>
        <Ionicons name={icon} size={18} color={COLORS.muted} style={styles.inputIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          style={styles.input}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress} style={styles.rightIconButton}>
            <Ionicons name={rightIcon} size={20} color={COLORS.primary} />
          </Pressable>
        )}
      </View>
      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={14} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primary },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, backgroundColor: COLORS.bg },

  banner: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  subtitle: {
    color: "#C9D6E3",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
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
    marginTop: -20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    flex: 1,
  },

  fieldWrapper: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FBFCFD",
  },
  inputContainerError: {
    borderColor: COLORS.error,
    backgroundColor: "#FEF2F2",
  },
  inputIcon: { marginRight: 8 },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: COLORS.text,
  },
  rightIconButton: { padding: 4 },

  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 4,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
  },

  submitButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  pressed: { opacity: 0.85 },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  loginContainer: { alignItems: "center", marginTop: 24 },
  loginText: { fontSize: 13, color: COLORS.muted },
  loginLink: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
});
