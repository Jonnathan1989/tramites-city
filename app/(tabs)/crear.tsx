import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  success: "#16A34A",
  successBg: "#DCFCE7",
};

type Tramite = {
  id: string;
  nombre: string;
  descripcion: string;
  requisitos: string;
  tiempo: string;
  documentos: string[];
};

const TRAMITES: Tramite[] = [
  {
    id: "soat",
    nombre: "SOAT - Renovación",
    descripcion: "Renueva tu Seguro Obligatorio de Accidentes de Tránsito.",
    requisitos: "Tarjeta de propiedad, cédula",
    tiempo: "1 - 2 días hábiles",
    documentos: ["Tarjeta de propiedad", "Cédula de ciudadanía"],
  },
  {
    id: "licencia",
    nombre: "Licencia de conducción",
    descripcion: "Trámite o renovación de tu licencia de conducción.",
    requisitos: "Cédula, certificado médico",
    tiempo: "3 - 5 días hábiles",
    documentos: ["Cédula de ciudadanía", "Certificado médico", "Licencia anterior (si aplica)"],
  },
  {
    id: "traspaso",
    nombre: "Traspaso de vehículo",
    descripcion: "Cambio de propietario de un vehículo.",
    requisitos: "Tarjeta de propiedad, cédulas de ambas partes",
    tiempo: "3 - 7 días hábiles",
    documentos: ["Tarjeta de propiedad", "Cédula comprador", "Cédula vendedor", "Contrato de compraventa"],
  },
  {
    id: "comparendos",
    nombre: "Comparendos",
    descripcion: "Consulta y gestión de comparendos de tránsito.",
    requisitos: "Cédula, número de comparendo",
    tiempo: "1 - 3 días hábiles",
    documentos: ["Cédula de ciudadanía"],
  },
];

const NECESIDADES = [
  "Realizar trámite presencial",
  "Recoger documentos",
  "Entregar documentos",
  "Recoger improntas",
  "Gestionar firmas",
  "Gestionar poder o autorización",
  "Otra necesidad relacionada",
];

type Gestor = {
  id: string;
  nombre: string;
  calificacion: number;
  servicios: number;
  experiencia: string;
  zona: string;
  precio: number;
  verificado: boolean;
};

const GESTORES: Gestor[] = [
  { id: "g1", nombre: "Carlos Ramírez", calificacion: 4.9, servicios: 214, experiencia: "5 años", zona: "Cali - Sur", precio: 45000, verificado: true },
  { id: "g2", nombre: "Ana Torres", calificacion: 4.8, servicios: 168, experiencia: "3 años", zona: "Cali - Norte", precio: 40000, verificado: true },
  { id: "g3", nombre: "Julián Pérez", calificacion: 4.6, servicios: 92, experiencia: "2 años", zona: "Jamundí", precio: 38000, verificado: false },
];

const COMISION = 8000;

const STEP_TITLES = [
  "Selecciona tu trámite",
  "Ciudad y modalidad",
  "Ubicación",
  "¿Qué necesitas?",
  "Requisitos y documentos",
  "Improntas y firmas",
  "Elige tu gestor",
  "Resumen y precio",
  "Pago",
];

export default function CrearTramiteScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [confirmado, setConfirmado] = useState(false);

  const [tramite, setTramite] = useState<Tramite | null>(null);
  const [modalidad, setModalidad] = useState<"misma" | "otra" | null>(null);
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [necesidades, setNecesidades] = useState<string[]>([]);
  const [documentosCargados, setDocumentosCargados] = useState<string[]>([]);
  const [gestor, setGestor] = useState<Gestor | null>(null);
  const [metodoPago, setMetodoPago] = useState<"tarjeta" | "pse" | "efectivo" | null>(null);
  const [numeroSolicitud] = useState(() => `TC-${Math.floor(100000 + Math.random() * 900000)}`);

  const requiereImprontas = necesidades.includes("Recoger improntas") || necesidades.includes("Gestionar firmas");
  const total = (gestor?.precio ?? 0) + COMISION;

  const toggleNecesidad = (item: string) => {
    setNecesidades((prev) =>
      prev.includes(item) ? prev.filter((n) => n !== item) : [...prev, item]
    );
  };

  const toggleDocumento = (doc: string) => {
    setDocumentosCargados((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0: return !!tramite;
      case 1: return !!modalidad && ciudad.trim().length > 0;
      case 2: return modalidad === "misma" ? true : direccion.trim().length > 0;
      case 3: return necesidades.length > 0;
      case 4: return true;
      case 5: return true;
      case 6: return !!gestor;
      case 7: return true;
      case 8: return !!metodoPago;
      default: return true;
    }
  }, [step, tramite, modalidad, ciudad, direccion, necesidades, gestor, metodoPago]);

  const goNext = () => {
    if (!canAdvance) {
      Alert.alert("Falta información", "Completa este paso para continuar.");
      return;
    }
    if (step === 5 && !requiereImprontas) {
      setStep((s) => s + 2);
      return;
    }
    if (step === STEP_TITLES.length - 1) {
      setConfirmado(true);
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) {
      router.back();
      return;
    }
    if (step === 6 && !requiereImprontas) {
      setStep((s) => s - 2);
      return;
    }
    setStep((s) => s - 1);
  };

  if (confirmado) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.confirmContainer}>
          <View style={styles.confirmIcon}>
            <Ionicons name="checkmark" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.confirmTitle}>¡Solicitud creada!</Text>
          <Text style={styles.confirmSubtitle}>
            Tu trámite quedó registrado y en breve tu gestor se pondrá en contacto.
          </Text>

          <View style={styles.confirmCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>N° de solicitud</Text>
              <Text style={styles.summaryValue}>{numeroSolicitud}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Trámite</Text>
              <Text style={styles.summaryValue}>{tramite?.nombre}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Gestor</Text>
              <Text style={styles.summaryValue}>{gestor?.nombre}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Próximo paso</Text>
              <Text style={styles.summaryValue}>Tu gestor confirmará la cita</Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.replace(`/tramite/${numeroSolicitud}`)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>VER SEGUIMIENTO</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{STEP_TITLES[step]}</Text>
        <Text style={styles.headerStep}>{step + 1}/{STEP_TITLES.length}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((step + 1) / STEP_TITLES.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Paso 0 - Seleccionar trámite */}
        {step === 0 && (
          <>
            <Text style={styles.helper}>Para el MVP priorizamos trámites vehiculares.</Text>
            {TRAMITES.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => setTramite(t)}
                style={[styles.optionCard, tramite?.id === t.id && styles.optionCardActive]}
              >
                <Text style={styles.optionTitle}>{t.nombre}</Text>
                <Text style={styles.optionDescription}>{t.descripcion}</Text>
                <View style={styles.optionMetaRow}>
                  <Ionicons name="time-outline" size={13} color={COLORS.muted} />
                  <Text style={styles.optionMeta}>{t.tiempo}</Text>
                </View>
              </Pressable>
            ))}
          </>
        )}

        {/* Paso 1 - Ciudad y modalidad */}
        {step === 1 && (
          <>
            <Text style={styles.label}>Ciudad donde se realizará el trámite</Text>
            <TextInput
              value={ciudad}
              onChangeText={setCiudad}
              placeholder="Ej. Cali"
              placeholderTextColor="#A0AEC0"
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: 20 }]}>Modalidad</Text>
            <Pressable
              onPress={() => setModalidad("misma")}
              style={[styles.optionCard, modalidad === "misma" && styles.optionCardActive]}
            >
              <Text style={styles.optionTitle}>Estoy en la misma ciudad</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalidad("otra")}
              style={[styles.optionCard, modalidad === "otra" && styles.optionCardActive]}
            >
              <Text style={styles.optionTitle}>Estoy en otra ciudad</Text>
            </Pressable>
          </>
        )}

        {/* Paso 2 - Ubicación */}
        {step === 2 && (
          <>
            {modalidad === "misma" ? (
              <View style={styles.infoBox}>
                <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>
                  Como estás en la misma ciudad, tu gestor coordinará contigo el punto de encuentro directamente por chat.
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.helper}>
                  Necesitamos tu ubicación para coordinar el desplazamiento del gestor.
                </Text>
                <Text style={styles.label}>Dirección o punto de encuentro</Text>
                <TextInput
                  value={direccion}
                  onChangeText={setDireccion}
                  placeholder="Ej. Calle 5 # 23-10"
                  placeholderTextColor="#A0AEC0"
                  style={styles.input}
                />
              </>
            )}
          </>
        )}

        {/* Paso 3 - Necesidades */}
        {step === 3 && (
          <>
            <Text style={styles.helper}>Selecciona todo lo que necesites (puedes elegir varias).</Text>
            {NECESIDADES.map((n) => {
              const selected = necesidades.includes(n);
              return (
                <Pressable
                  key={n}
                  onPress={() => toggleNecesidad(n)}
                  style={[styles.checkRow, selected && styles.optionCardActive]}
                >
                  <Ionicons
                    name={selected ? "checkbox" : "square-outline"}
                    size={20}
                    color={selected ? COLORS.primary : COLORS.muted}
                  />
                  <Text style={styles.checkLabel}>{n}</Text>
                </Pressable>
              );
            })}
          </>
        )}

        {/* Paso 4 - Requisitos y documentos */}
        {step === 4 && tramite && (
          <>
            <Text style={styles.helper}>Documentos requeridos para {tramite.nombre}.</Text>
            {tramite.documentos.map((doc) => {
              const cargado = documentosCargados.includes(doc);
              return (
                <Pressable key={doc} onPress={() => toggleDocumento(doc)} style={styles.docRow}>
                  <View style={styles.docInfo}>
                    <Ionicons name="document-attach-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.docName}>{doc}</Text>
                  </View>
                  <View style={[styles.docBadge, cargado ? styles.docBadgeDone : styles.docBadgePending]}>
                    <Text style={[styles.docBadgeText, { color: cargado ? COLORS.success : "#B45309" }]}>
                      {cargado ? "Cargado" : "Pendiente"}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
            <Text style={styles.hintSmall}>Toca cada documento para simular la carga.</Text>
          </>
        )}

        {/* Paso 5 - Improntas y firmas */}
        {step === 5 && (
          <View style={styles.infoBox}>
            <Ionicons name="finger-print-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              {necesidades.includes("Recoger improntas") && "Necesitamos recoger las improntas del vehículo.\n"}
              {necesidades.includes("Gestionar firmas") && "Necesitamos recoger una firma.\n"}
              Tu gestor certificado se encargará de esto durante la visita.
            </Text>
          </View>
        )}

        {/* Paso 6 - Selección de gestor */}
        {step === 6 && (
          <>
            <Text style={styles.helper}>Gestores disponibles en tu zona.</Text>
            {GESTORES.map((g) => (
              <Pressable
                key={g.id}
                onPress={() => setGestor(g)}
                style={[styles.optionCard, gestor?.id === g.id && styles.optionCardActive]}
              >
                <View style={styles.gestorHeader}>
                  <View style={styles.gestorAvatar}>
                    <Ionicons name="person" size={20} color="#FFFFFF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.gestorNameRow}>
                      <Text style={styles.optionTitle}>{g.nombre}</Text>
                      {g.verificado && <Ionicons name="checkmark-circle" size={15} color={COLORS.success} />}
                    </View>
                    <Text style={styles.optionMeta}>{g.zona} · {g.experiencia}</Text>
                  </View>
                </View>
                <View style={styles.gestorFooter}>
                  <View style={styles.optionMetaRow}>
                    <Ionicons name="star" size={13} color={COLORS.accent} />
                    <Text style={styles.optionMeta}>{g.calificacion} ({g.servicios} servicios)</Text>
                  </View>
                  <Text style={styles.gestorPrecio}>${g.precio.toLocaleString("es-CO")}</Text>
                </View>
              </Pressable>
            ))}
          </>
        )}

        {/* Paso 7 - Resumen y precio */}
        {step === 7 && (
          <View style={styles.summaryCard}>
            <SummaryRow label="Trámite" value={tramite?.nombre ?? "-"} />
            <SummaryRow label="Ciudad" value={ciudad || "-"} />
            <SummaryRow label="Ubicación" value={modalidad === "otra" ? direccion : "Misma ciudad"} />
            <SummaryRow label="Gestor" value={gestor?.nombre ?? "-"} />
            <SummaryRow label="Actividades" value={necesidades.join(", ") || "-"} />
            <View style={styles.divider} />
            <SummaryRow label="Costo del servicio" value={`$${(gestor?.precio ?? 0).toLocaleString("es-CO")}`} />
            <SummaryRow label="Comisión Trámites City" value={`$${COMISION.toLocaleString("es-CO")}`} />
            <View style={styles.divider} />
            <SummaryRow label="Total" value={`$${total.toLocaleString("es-CO")}`} bold />
            <Text style={styles.cancelPolicy}>
              Cancelación gratuita hasta 2 horas antes de la visita programada.
            </Text>
          </View>
        )}

        {/* Paso 8 - Pago */}
        {step === 8 && (
          <>
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValue}>${total.toLocaleString("es-CO")}</Text>
            </View>
            <Text style={styles.label}>Método de pago</Text>
            {[
              { key: "tarjeta", label: "Tarjeta de crédito/débito", icon: "card-outline" },
              { key: "pse", label: "PSE", icon: "swap-horizontal-outline" },
              { key: "efectivo", label: "Efectivo al gestor", icon: "cash-outline" },
            ].map((m) => (
              <Pressable
                key={m.key}
                onPress={() => setMetodoPago(m.key as any)}
                style={[styles.checkRow, metodoPago === m.key && styles.optionCardActive]}
              >
                <Ionicons name={m.icon as any} size={20} color={COLORS.primary} />
                <Text style={styles.checkLabel}>{m.label}</Text>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={goNext}
          style={({ pressed }) => [
            styles.primaryButton,
            !canAdvance && styles.primaryButtonDisabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {step === STEP_TITLES.length - 1 ? "CONFIRMAR Y PAGAR" : "CONTINUAR"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, bold && styles.summaryValueBold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: { padding: 8 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: "800", color: COLORS.text, marginLeft: 4 },
  headerStep: { fontSize: 12, color: COLORS.muted, fontWeight: "600" },

  progressBar: { height: 4, backgroundColor: COLORS.border, marginHorizontal: 20, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },

  content: { padding: 20, paddingBottom: 20 },

  helper: { fontSize: 13, color: COLORS.muted, marginBottom: 16, lineHeight: 19 },
  hintSmall: { fontSize: 12, color: COLORS.muted, marginTop: 8, fontStyle: "italic" },

  label: { fontSize: 13, fontWeight: "700", color: COLORS.text, marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.card,
  },

  optionCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  optionCardActive: { borderColor: COLORS.primary, backgroundColor: "#EEF3F8" },
  optionTitle: { fontSize: 14, fontWeight: "800", color: COLORS.text },
  optionDescription: { fontSize: 12, color: COLORS.muted, marginTop: 4, lineHeight: 17 },
  optionMetaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
  optionMeta: { fontSize: 11, color: COLORS.muted },

  infoBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#EEF3F8",
    borderRadius: 14,
    padding: 16,
  },
  infoText: { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 19 },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  checkLabel: { fontSize: 13, fontWeight: "600", color: COLORS.text, flex: 1 },

  docRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  docInfo: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  docName: { fontSize: 13, fontWeight: "600", color: COLORS.text, flex: 1 },
  docBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  docBadgePending: { backgroundColor: "#FEF3C7" },
  docBadgeDone: { backgroundColor: COLORS.successBg },
  docBadgeText: { fontSize: 11, fontWeight: "700" },

  gestorHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  gestorAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center",
  },
  gestorNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  gestorFooter: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10,
  },
  gestorPrecio: { fontSize: 14, fontWeight: "800", color: COLORS.primary },

  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12, gap: 12 },
  summaryLabel: { fontSize: 12, color: COLORS.muted, flexShrink: 0 },
  summaryValue: { fontSize: 12, color: COLORS.text, fontWeight: "700", flex: 1, textAlign: "right" },
  summaryValueBold: { fontSize: 15, color: COLORS.primary },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 6 },
  cancelPolicy: { fontSize: 11, color: COLORS.muted, marginTop: 8, lineHeight: 16, fontStyle: "italic" },

  totalBox: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: { color: "#C9D6E3", fontSize: 12 },
  totalValue: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", marginTop: 4 },

  footer: { padding: 20, paddingTop: 12 },
  primaryButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: { opacity: 0.4 },
  pressed: { opacity: 0.85 },
  primaryButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", letterSpacing: 0.5 },

  confirmContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  confirmIcon: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  confirmTitle: { fontSize: 20, fontWeight: "800", color: COLORS.text },
  confirmSubtitle: { fontSize: 13, color: COLORS.muted, textAlign: "center", marginTop: 8, marginBottom: 24, lineHeight: 19 },
  confirmCard: {
    backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border,
    padding: 18, width: "100%", marginBottom: 24,
  },
});
