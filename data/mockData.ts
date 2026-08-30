// Datos de ejemplo (mock) centralizados.
// Cuando exista backend real, estas funciones/arreglos se reemplazan
// por llamadas a la API, sin tener que tocar las pantallas que los usan.

export type TramiteCatalogo = {
  id: string;
  nombre: string;
  descripcion: string;
  requisitos: string;
  tiempo: string;
  documentos: string[];
};

export const CATALOGO_TRAMITES: TramiteCatalogo[] = [
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

export const NECESIDADES_SERVICIO = [
  "Realizar trámite presencial",
  "Recoger documentos",
  "Entregar documentos",
  "Recoger improntas",
  "Gestionar firmas",
  "Gestionar poder o autorización",
  "Otra necesidad relacionada",
];

export const COMISION_PLATAFORMA = 8000;

export type Gestor = {
  id: string;
  nombre: string;
  calificacion: number;
  servicios: number;
  experiencia: string;
  zona: string;
  precio: number;
  verificado: boolean;
};

export const GESTORES: Gestor[] = [
  { id: "g1", nombre: "Carlos Ramírez", calificacion: 4.9, servicios: 214, experiencia: "5 años", zona: "Cali - Sur", precio: 45000, verificado: true },
  { id: "g2", nombre: "Ana Torres", calificacion: 4.8, servicios: 168, experiencia: "3 años", zona: "Cali - Norte", precio: 40000, verificado: true },
  { id: "g3", nombre: "Julián Pérez", calificacion: 4.6, servicios: 92, experiencia: "2 años", zona: "Jamundí", precio: 38000, verificado: false },
];

export type EstadoSolicitud = "activo" | "finalizado" | "cancelado";

export type Solicitud = {
  id: string;
  tipo: string;
  ciudad: string;
  estado: string;
  fecha: string;
  gestor: string;
  status: EstadoSolicitud;
};

export const MIS_SOLICITUDES: Solicitud[] = [
  {
    id: "TC-482913",
    tipo: "SOAT - Renovación",
    ciudad: "Cali",
    estado: "Gestor asignado",
    fecha: "18 ago 2026",
    gestor: "Carlos Ramírez",
    status: "activo",
  },
  {
    id: "TC-509821",
    tipo: "Traspaso de vehículo",
    ciudad: "Jamundí",
    estado: "En revisión de documentos",
    fecha: "20 ago 2026",
    gestor: "Por asignar",
    status: "activo",
  },
  {
    id: "TC-357210",
    tipo: "Licencia de conducción",
    ciudad: "Cali",
    estado: "Finalizado",
    fecha: "02 ago 2026",
    gestor: "Ana Torres",
    status: "finalizado",
  },
];

export type Conversacion = {
  id: string;
  gestor: string;
  tramite: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
};

export const CONVERSACIONES: Conversacion[] = [
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

export type EstadoTimeline = {
  key: string;
  label: string;
  fecha: string | null;
  detalle: string;
};

export const ESTADOS_SEGUIMIENTO: EstadoTimeline[] = [
  { key: "creada", label: "Solicitud creada", fecha: "18 ago 2026 · 9:02 a.m.", detalle: "Recibimos tu solicitud correctamente." },
  { key: "gestor", label: "Gestor seleccionado", fecha: "18 ago 2026 · 9:05 a.m.", detalle: "Carlos Ramírez fue asignado a tu trámite." },
  { key: "pago", label: "Pago confirmado", fecha: "18 ago 2026 · 9:06 a.m.", detalle: "Tu pago fue procesado exitosamente." },
  { key: "documentos", label: "Documentos recibidos", fecha: "18 ago 2026 · 11:40 a.m.", detalle: "Tu gestor recibió los documentos cargados." },
  { key: "proceso", label: "En proceso", fecha: "19 ago 2026 · 8:15 a.m.", detalle: "Tu gestor está realizando el trámite." },
  { key: "organismo", label: "En organismo de tránsito", fecha: null, detalle: "Se radicará ante el organismo correspondiente." },
  { key: "revision", label: "En revisión", fecha: null, detalle: "El organismo revisará la documentación." },
  { key: "evidencias", label: "Evidencias cargadas", fecha: null, detalle: "Tu gestor cargará el soporte final." },
  { key: "finalizado", label: "Finalizado", fecha: null, detalle: "Tu trámite habrá concluido con éxito." },
];