import { useEffect, useMemo, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

function BackIcon() {
  return <span style={{ fontSize: "22px", lineHeight: 1 }}>←</span>;
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6H20L14 13V19L10 21V13L4 6Z"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="3"
        stroke="#8C7CF2"
        strokeWidth="2"
      />
      <path d="M8 3V7" stroke="#8C7CF2" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16 3V7"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M3 10H21" stroke="#8C7CF2" strokeWidth="2" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 16L9 11L13 15L20 8"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8H16"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 8V12"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18H15"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 21H14"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 3C8.686 3 6 5.686 6 9C6 11.21 7.193 13.14 8.97 14.18C9.61 14.56 10 15.22 10 15.97V16H14V15.97C14 15.22 14.39 14.56 15.03 14.18C16.807 13.14 18 11.21 18 9C18 5.686 15.314 3 12 3Z"
        stroke="#8C7CF2"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AudioIcon() {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {[6, 12, 18, 12, 6].map((h, i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: "3px",
            height: `${h}px`,
            borderRadius: "999px",
            background: "#7D73E6",
          }}
        />
      ))}
    </div>
  );
}

function ActivityIcon({ color = "#43B39B" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21C16.971 21 21 16.971 21 12C21 7.029 16.971 3 12 3C7.029 3 3 7.029 3 12C3 16.971 7.029 21 12 21Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M12 7V12L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarBubbleIcon() {
  return (
    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "14px",
        background: "#EEE8FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8C7CF2",
        fontSize: "18px",
        flexShrink: 0,
      }}
    >
      ✦
    </div>
  );
}

function emotionMeta(rawEmotion) {
  const emotion = String(rawEmotion || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const map = {
    calma: {
      label: "Calma",
      emoji: "😌",
      color: "#43B39B",
      soft: "#E7F7F2",
      pillText: "#2F8A76",
      recommendation:
        "Excelente momento de bienestar. Aprovecha para reforzar hábitos positivos.",
    },
    neutral: {
      label: "Neutral",
      emoji: "😐",
      color: "#8E80F7",
      soft: "#F2EEFF",
      pillText: "#6D5DE0",
      recommendation:
        "Estado estable. Mantén la observación del contexto y la rutina habitual.",
    },
    neutro: {
      label: "Neutral",
      emoji: "😐",
      color: "#8E80F7",
      soft: "#F2EEFF",
      pillText: "#6D5DE0",
      recommendation:
        "Estado estable. Mantén la observación del contexto y la rutina habitual.",
    },
    estres: {
      label: "Estrés",
      emoji: "😣",
      color: "#F2C23E",
      soft: "#FFF6DE",
      pillText: "#B78800",
      recommendation:
        "Intenta pausas activas o ejercicios de respiración antes de tareas exigentes.",
    },
    "estrés": {
      label: "Estrés",
      emoji: "😣",
      color: "#F2C23E",
      soft: "#FFF6DE",
      pillText: "#B78800",
      recommendation:
        "Intenta pausas activas o ejercicios de respiración antes de tareas exigentes.",
    },
    malestar: {
      label: "Malestar",
      emoji: "😖",
      color: "#F57D73",
      soft: "#FFEAE8",
      pillText: "#D85A50",
      recommendation:
        "Revisa posibles fuentes de incomodidad física o ambiental y acompaña con calma.",
    },
    tristeza: {
      label: "Tristeza",
      emoji: "😟",
      color: "#A38AF7",
      soft: "#F0EBFF",
      pillText: "#7E66DF",
      recommendation:
        "Favorece la contención emocional y actividades tranquilas de acompañamiento.",
    },
    frustracion: {
      label: "Frustración",
      emoji: "😤",
      color: "#F5A95B",
      soft: "#FFF0E2",
      pillText: "#D88936",
      recommendation:
        "Reduce la exigencia momentánea y ofrece apoyo gradual para retomar la actividad.",
    },
    "frustración": {
      label: "Frustración",
      emoji: "😤",
      color: "#F5A95B",
      soft: "#FFF0E2",
      pillText: "#D88936",
      recommendation:
        "Reduce la exigencia momentánea y ofrece apoyo gradual para retomar la actividad.",
    },
    miedo: {
      label: "Miedo",
      emoji: "😰",
      color: "#8FB3FF",
      soft: "#EDF4FF",
      pillText: "#547FD9",
      recommendation:
        "Brinda seguridad, reduce estímulos intensos y valida la emoción percibida.",
    },
    molestia: {
      label: "Molestia",
      emoji: "😕",
      color: "#F57D73",
      soft: "#FFEAE8",
      pillText: "#D85A50",
      recommendation:
        "Explora si existe una causa específica de incomodidad y ajusta el entorno.",
    },
    sorpresa: {
      label: "Sorpresa",
      emoji: "😮",
      color: "#79B7FF",
      soft: "#EAF5FF",
      pillText: "#4F88D8",
      recommendation:
        "Observa si la respuesta se estabiliza sola y acompaña con indicaciones suaves.",
    },
  };

  return (
    map[emotion] || {
      label: rawEmotion ? String(rawEmotion) : "No identificada",
      emoji: "🫤",
      color: "#B9B9C8",
      soft: "#F3F3F8",
      pillText: "#7A7A89",
      recommendation:
        "Continúa observando el contexto y revisa más registros para interpretar el patrón.",
    }
  );
}

function formatConfidence(item) {
  const raw =
    item?.confianza ??
    item?.confidence ??
    item?.probabilidad ??
    item?.score ??
    item?.porcentaje;

  if (raw === undefined || raw === null || raw === "") return null;

  let value = Number(raw);

  if (Number.isNaN(value)) return null;

  if (value <= 1) value = value * 100;

  return `${Math.round(value)}% confianza`;
}

function formatDuration(item) {
  const raw = item?.duracion ?? item?.duration ?? item?.segundos;
  if (raw === undefined || raw === null || raw === "") return "—";
  return `${Math.round(Number(raw))}s`;
}

function formatFileName(item, index) {
  return (
    item?.nombreArchivo ||
    item?.filename ||
    item?.fileName ||
    item?.audioNombre ||
    `audio_${index + 1}.wav`
  );
}

function getDateLabel(date) {
  if (!date) return "";

  const today = new Date();
  const sameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (sameDay) return "Hoy";
  if (sameYesterday) return "Ayer";

  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
}

function getTimeLabel(fechaFirebase) {
  if (!fechaFirebase?.toDate) return "--:--";

  const date = fechaFirebase.toDate();

  return `${getDateLabel(date)}, ${date.toLocaleTimeString("es-CO", {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function isSameDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const [actividades, setActividades] = useState([]);

  const [filtro, setFiltro] = useState("todos");
  const [rangoResumen, setRangoResumen] = useState("7dias");
  const [fechaInicioCustom, setFechaInicioCustom] = useState("");
  const [fechaFinCustom, setFechaFinCustom] = useState("");

  useEffect(() => {
    const usuario = auth.currentUser;
    if (!usuario) return;

    const q = query(
      collection(db, "historialAudios"),
      where("uid", "==", usuario.uid),
      orderBy("fecha", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistorial(datos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const usuario = auth.currentUser;
    if (!usuario) return;

    const q = query(
      collection(db, "actividades"),
      where("uid", "==", usuario.uid),
      orderBy("fechaInicio", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActividades(datos);
    });

    return () => unsubscribe();
  }, []);

  const obtenerActividadParaAudio = (fechaAudioFirebase) => {
    if (!fechaAudioFirebase?.toDate) return null;

    const fechaAudio = fechaAudioFirebase.toDate();

    const actividadesPrevias = actividades
      .filter((actividad) => actividad?.fechaInicio?.toDate)
      .filter((actividad) => actividad.fechaInicio.toDate() <= fechaAudio)
      .sort((a, b) => b.fechaInicio.toDate() - a.fechaInicio.toDate());

    return actividadesPrevias[0] || null;
  };

  const aplicarFiltro = (items, filtroActual) => {
    const now = new Date();

    if (filtroActual === "todos") return items;

    if (filtroActual === "hoy") {
      return items.filter((item) => {
        if (!item?.fecha?.toDate) return false;
        return isSameDay(item.fecha.toDate(), now);
      });
    }

    if (filtroActual === "ayer") {
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);

      return items.filter((item) => {
        if (!item?.fecha?.toDate) return false;
        return isSameDay(item.fecha.toDate(), yesterday);
      });
    }

    if (filtroActual === "7dias") {
      const start = new Date();
      start.setDate(now.getDate() - 6);
      start.setHours(0, 0, 0, 0);

      return items.filter((item) => {
        if (!item?.fecha?.toDate) return false;
        return item.fecha.toDate() >= start;
      });
    }

    if (filtroActual === "30dias") {
      const start = new Date();
      start.setDate(now.getDate() - 29);
      start.setHours(0, 0, 0, 0);

      return items.filter((item) => {
        if (!item?.fecha?.toDate) return false;
        return item.fecha.toDate() >= start;
      });
    }

    if (filtroActual === "personalizado") {
      if (!fechaInicioCustom || !fechaFinCustom) return items;

      const start = new Date(`${fechaInicioCustom}T00:00:00`);
      const end = new Date(`${fechaFinCustom}T23:59:59`);

      return items.filter((item) => {
        if (!item?.fecha?.toDate) return false;
        const fecha = item.fecha.toDate();
        return fecha >= start && fecha <= end;
      });
    }

    return items;
  };

  const historialFiltrado = useMemo(() => {
    return aplicarFiltro(historial, filtro);
  }, [historial, filtro, fechaInicioCustom, fechaFinCustom]);

  const historialResumen = useMemo(() => {
    return aplicarFiltro(
      historial,
      rangoResumen === "7dias"
        ? "7dias"
        : rangoResumen === "30dias"
        ? "30dias"
        : rangoResumen === "hoy"
        ? "hoy"
        : "todos"
    );
  }, [historial, rangoResumen]);

  const resumenEmociones = useMemo(() => {
    const conteo = {};

    historialResumen.forEach((item) => {
      const meta = emotionMeta(item.emocion);
      if (!conteo[meta.label]) {
        conteo[meta.label] = {
          ...meta,
          count: 0,
        };
      }
      conteo[meta.label].count += 1;
    });

    const array = Object.values(conteo).sort((a, b) => b.count - a.count);
    const total = array.reduce((acc, item) => acc + item.count, 0);

    return {
      total,
      items: array.map((item) => ({
        ...item,
        percent: total > 0 ? Math.round((item.count / total) * 100) : 0,
      })),
    };
  }, [historialResumen]);

  const donutGradient = useMemo(() => {
    if (resumenEmociones.items.length === 0) {
      return "conic-gradient(#EDEAF8 0deg 360deg)";
    }

    let start = 0;
    const segments = resumenEmociones.items.map((item) => {
      const deg = (item.percent / 100) * 360;
      const end = start + deg;
      const segment = `${item.color} ${start}deg ${end}deg`;
      start = end;
      return segment;
    });

    if (start < 360) {
      segments.push(`#F3F2FA ${start}deg 360deg`);
    }

    return `conic-gradient(${segments.join(", ")})`;
  }, [resumenEmociones]);

  const tendenciaGeneral = resumenEmociones.items[0] || null;

  return (
    <div
      style={{
        padding: "18px 16px 24px",
        background: "linear-gradient(180deg, #FBF8FE 0%, #FFFFFF 100%)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <button
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "none",
            background: "#F2EEFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8C7CF2",
            cursor: "pointer",
          }}
        >
          <BackIcon />
        </button>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "900",
              color: "#24325C",
              marginBottom: "4px",
            }}
          >
            Historial
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#7C86A8",
              fontWeight: "500",
            }}
          >
            Revisa tus análisis anteriores
          </div>
        </div>

        <button
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "none",
            background: "#F2EEFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <FilterIcon />
        </button>
      </div>

      {/* FILTROS */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #EEE7FA",
          borderRadius: "20px",
          padding: "8px",
          display: "flex",
          gap: "6px",
          overflowX: "auto",
          marginBottom: "18px",
        }}
      >
        {[
          { key: "todos", label: "Todos" },
          { key: "hoy", label: "Hoy" },
          { key: "ayer", label: "Ayer" },
          { key: "7dias", label: "7 días" },
          { key: "30dias", label: "30 días" },
          { key: "personalizado", label: "Personalizado" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFiltro(item.key)}
            style={{
              border: "none",
              background: filtro === item.key ? "#F1ECFF" : "transparent",
              color: filtro === item.key ? "#7D73E6" : "#6F7897",
              fontWeight: filtro === item.key ? "800" : "600",
              borderRadius: "16px",
              padding: "11px 14px",
              whiteSpace: "nowrap",
              minWidth: item.key === "personalizado" ? "116px" : "78px",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtro === "personalizado" && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          <input
            type="date"
            value={fechaInicioCustom}
            onChange={(e) => setFechaInicioCustom(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid #E3D8F5",
              borderRadius: "14px",
              padding: "12px",
              fontSize: "13px",
            }}
          />
          <input
            type="date"
            value={fechaFinCustom}
            onChange={(e) => setFechaFinCustom(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid #E3D8F5",
              borderRadius: "14px",
              padding: "12px",
              fontSize: "13px",
            }}
          />
        </div>
      )}

      {/* RESUMEN */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #EEE7FA",
          borderRadius: "24px",
          padding: "18px",
          boxShadow: "0 8px 24px rgba(155, 132, 192, 0.08)",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "900",
                color: "#24325C",
              }}
            >
              Resumen emocional
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#7C86A8",
                marginTop: "2px",
              }}
            >
              Basado en tus análisis
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #ECE4FA",
              borderRadius: "14px",
              padding: "10px 12px",
              color: "#5E68A2",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            <CalendarIcon />
            <select
              value={rangoResumen}
              onChange={(e) => setRangoResumen(e.target.value)}
              style={{
                border: "none",
                background: "transparent",
                color: "#5E68A2",
                fontWeight: "700",
                fontSize: "13px",
                outline: "none",
              }}
            >
              <option value="7dias">Últimos 7 días</option>
              <option value="30dias">Últimos 30 días</option>
              <option value="hoy">Hoy</option>
              <option value="todos">Todo</option>
            </select>
          </div>
        </div>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "18px",
  }}
>

          {/* DONUT */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
                background: donutGradient,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "105px",
                  height: "105px",
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "inset 0 0 0 1px #F0EAF9",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "900",
                    color: "#24325C",
                    lineHeight: 1,
                  }}
                >
                  {resumenEmociones.total}
                </div>
                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "12px",
                    color: "#7C86A8",
                  }}
                >
                  análisis
                </div>
              </div>
            </div>
          </div>

          {/* LEYENDA */}
          <div>
            {resumenEmociones.items.length === 0 ? (
              <div
                style={{
                  fontSize: "13px",
                  color: "#8A8FA8",
                }}
              >
                Aún no hay datos para este periodo.
              </div>
            ) : (
              resumenEmociones.items.slice(0, 5).map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "28px 1fr 34px 42px",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <div style={{ fontSize: "23px" }}>{item.emoji}</div>

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#24325C",
                        marginBottom: "5px",
                      }}
                    >
                      {item.label}
                    </div>

                    <div
                      style={{
                        height: "6px",
                        borderRadius: "999px",
                        background: "#F0EEF7",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${item.percent}%`,
                          height: "100%",
                          background: item.color,
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#24325C",
                      textAlign: "right",
                    }}
                  >
                    {item.count}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      color: "#7C86A8",
                      textAlign: "right",
                    }}
                  >
                    {item.percent}%
                  </div>
                </div>
              ))
            )}
          </div>

          {/* TENDENCIA */}
          <div
            style={{
              background: "#F8F4FF",
              borderRadius: "20px",
              padding: "18px 14px",
              minHeight: "190px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#7D73E6",
                fontWeight: "800",
                fontSize: "14px",
              }}
            >
              <TrendIcon />
              Tendencia general
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "44px", marginBottom: "10px" }}>
                {tendenciaGeneral ? tendenciaGeneral.emoji : "🫧"}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "900",
                  color: "#24325C",
                  lineHeight: "1.3",
                }}
              >
                {tendenciaGeneral
                  ? `Mayormente en ${tendenciaGeneral.label.toLowerCase()}`
                  : "Sin datos suficientes"}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#7D73E6",
                  fontWeight: "700",
                }}
              >
                {tendenciaGeneral
                  ? tendenciaGeneral.label === "Calma"
                    ? "¡Buen trabajo!"
                    : "Sigue observando el contexto"
                  : "Analiza más audios"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LISTA HISTORIAL */}
      <div
        style={{
          fontSize: "15px",
          fontWeight: "900",
          color: "#24325C",
          marginBottom: "12px",
        }}
      >
        Historial de análisis
      </div>

      {historialFiltrado.length === 0 ? (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #EEE7FA",
            borderRadius: "22px",
            padding: "24px",
            textAlign: "center",
            color: "#7C86A8",
          }}
        >
          No hay registros para este filtro.
        </div>
      ) : (
        historialFiltrado.map((item, index) => {
          const meta = emotionMeta(item.emocion);
          const actividad = obtenerActividadParaAudio(item.fecha);
          const confidence = formatConfidence(item);
          const duration = formatDuration(item);
          const fileName = formatFileName(item, index);

          return (
            <div
              key={item.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #EEE7FA",
                borderRadius: "22px",
                padding: "16px",
                boxShadow: "0 8px 22px rgba(155, 132, 192, 0.06)",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1.4fr 1fr 18px",
                  gap: "14px",
                  alignItems: "center",
                }}
              >
                {/* IZQUIERDA */}
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#7C86A8",
                      marginBottom: "12px",
                    }}
                  >
                    {getTimeLabel(item.fecha)}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: meta.color,
                      }}
                    />

                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        background: meta.soft,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                      }}
                    >
                      {meta.emoji}
                    </div>
                  </div>
                </div>

                {/* CENTRO */}
                <div
                  style={{
                    minWidth: 0,
                    borderLeft: "1px solid #F0EBF8",
                    paddingLeft: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: "900",
                        color: "#24325C",
                      }}
                    >
                      {meta.label}
                    </div>

                    {confidence && (
                      <div
                        style={{
                          background: meta.soft,
                          color: meta.pillText,
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                          fontWeight: "800",
                        }}
                      >
                        {confidence}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#6F7897",
                      fontSize: "13px",
                      marginBottom: "10px",
                    }}
                  >
                    <AudioIcon />
                    <span>
                      {fileName} • {duration}
                    </span>
                  </div>

                  {actividad && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#F7FBF9",
                        border: "1px solid #E1F2EA",
                        borderRadius: "14px",
                        padding: "8px 10px",
                        maxWidth: "100%",
                      }}
                    >
                      <ActivityIcon color="#43B39B" />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#43B39B",
                            fontWeight: "800",
                            marginBottom: "2px",
                          }}
                        >
                          Actividad asociada
                        </div>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#24325C",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {actividad.actividad}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RECOMENDACIÓN */}
                <div
                  style={{
                    borderLeft: "1px solid #F0EBF8",
                    paddingLeft: "14px",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#7D73E6",
                      fontSize: "13px",
                      fontWeight: "800",
                      marginBottom: "10px",
                    }}
                  >
                    <LightbulbIcon />
                    Recomendación
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6F7897",
                      lineHeight: "1.55",
                    }}
                  >
                    {meta.recommendation}
                  </div>
                </div>

                {/* FLECHA */}
                <div
                  style={{
                    color: "#9A94BB",
                    fontSize: "22px",
                    textAlign: "center",
                  }}
                >
                  ›
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* CTA FINAL */}
      <div
        style={{
          marginTop: "8px",
          background: "linear-gradient(135deg, #F8F3FF 0%, #FFFFFF 100%)",
          border: "1px solid #EEE7FA",
          borderRadius: "22px",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <StarBubbleIcon />

          <div>
            <div
              style={{
                color: "#7D73E6",
                fontWeight: "900",
                fontSize: "15px",
                marginBottom: "3px",
              }}
            >
              ¿Quieres ver más detalles?
            </div>

            <div
              style={{
                color: "#7C86A8",
                fontSize: "13px",
              }}
            >
              Consulta el análisis completo de cada registro.
            </div>
          </div>
        </div>

        <button
          style={{
            border: "none",
            background: "linear-gradient(135deg, #B79CF7, #8EA5FF)",
            color: "#FFFFFF",
            fontWeight: "800",
            fontSize: "14px",
            borderRadius: "14px",
            padding: "12px 18px",
            whiteSpace: "nowrap",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(137, 132, 240, 0.25)",
          }}
        >
          Ver análisis completos ›
        </button>
      </div>
    </div>
  );
}