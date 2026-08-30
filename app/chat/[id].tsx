import React, { useState, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLORS = {
  primary: "#163A5F",
  accent: "#FFB800",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#10182B",
  muted: "#64748B",
  border: "#E2E8F0",
  bubbleOther: "#FFFFFF",
  bubbleMine: "#163A5F",
};

type Mensaje = {
  id: string;
  texto: string;
  propio: boolean;
  hora: string;
};

const MENSAJES_INICIALES: Mensaje[] = [
  { id: "1", texto: "¡Hola! Soy tu gestor certificado para este trámite.", propio: false, hora: "9:30 a.m." },
  { id: "2", texto: "Hola, muchas gracias. ¿Qué documentos necesitas?", propio: true, hora: "9:32 a.m." },
  { id: "3", texto: "Necesito la tarjeta de propiedad y tu cédula. Ya los veo cargados en la solicitud.", propio: false, hora: "9:35 a.m." },
  { id: "4", texto: "Ya recibí tus documentos, te aviso cuando esté listo.", propio: false, hora: "9:41 a.m." },
];

export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string; gestor?: string; tramite?: string }>();
  const [mensajes, setMensajes] = useState<Mensaje[]>(MENSAJES_INICIALES);
  const [texto, setTexto] = useState("");
  const listRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!texto.trim()) return;

    const nuevo: Mensaje = {
      id: Date.now().toString(),
      texto: texto.trim(),
      propio: true,
      hora: new Date().toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" }),
    };
    setMensajes((prev) => [...prev, nuevo]);
    setTexto("");

    setTimeout(() => {
      setMensajes((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          texto: "Recibido, quedo pendiente.",
          propio: false,
          hora: new Date().toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </Pressable>
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={18} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerName}>{params.gestor ?? "Gestor"}</Text>
          <Text style={styles.headerTramite}>{params.tramite ?? "Trámite"}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={mensajes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View style={[styles.bubbleRow, item.propio && styles.bubbleRowMine]}>
              <View style={[styles.bubble, item.propio ? styles.bubbleMine : styles.bubbleOther]}>
                <Text style={[styles.bubbleText, item.propio && styles.bubbleTextMine]}>
                  {item.texto}
                </Text>
                <Text style={[styles.bubbleHora, item.propio && styles.bubbleHoraMine]}>
                  {item.hora}
                </Text>
              </View>
            </View>
          )}
        />

        <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TextInput
            value={texto}
            onChangeText={setTexto}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#A0AEC0"
            style={styles.input}
            multiline
          />
          <Pressable onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  flex: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 10,
  },
  backButton: { padding: 6 },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerName: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  headerTramite: { color: "#C9D6E3", fontSize: 11, marginTop: 1 },

  messagesList: { padding: 16, gap: 10 },

  bubbleRow: { flexDirection: "row" },
  bubbleRowMine: { justifyContent: "flex-end" },
  bubble: {
    maxWidth: "78%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleOther: {
    backgroundColor: COLORS.bubbleOther,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderTopLeftRadius: 4,
  },
  bubbleMine: {
    backgroundColor: COLORS.bubbleMine,
    borderTopRightRadius: 4,
  },
  bubbleText: { fontSize: 14, color: COLORS.text, lineHeight: 19 },
  bubbleTextMine: { color: "#FFFFFF" },
  bubbleHora: { fontSize: 10, color: COLORS.muted, marginTop: 4, textAlign: "right" },
  bubbleHoraMine: { color: "#C9D6E3" },

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    padding: 12,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.bg,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
