import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { obtenerUltimaPrediccion } from "../services/modeloApi";

function SectionCard({ children, style }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EDE3F8",
        borderRadius: "24px",
        padding: "18px",
        boxShadow: "0 8px 24px rgba(155, 132, 192, 0.08)",
        marginBottom: "16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function WaveLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {[14, 24, 38, 24, 14].map((height, index) => (
        <span
          key={index}
          style={{
            width: "5px",
            height,
            borderRadius: "999px",
            background: "linear-gradient(180deg, #B79CF7, #7FA8F8)",
            display: "block",
          }}
        />
      ))}
    </div>
  );
}

function clasificarEmocion(emotion = "") {
  const e = emotion.toLowerCase();

  if (["happy", "feliz", "calm", "calma", "neutral"].includes(e)) {
    return {
      categoria: e === "neutral" ? "Neutro" : "Positivo",
      emoji: e === "neutral" ? "🌿" : "😊",
      mensaje: e === "neutral" ? "se encuentra estable" : "podría estar tranquilo",
      color: "#3FB6A8",
    };
  }

  if (["sad", "triste", "fear", "miedo", "angry", "enojo", "disgust"].includes(e)) {
    return {
      categoria: "Alerta",
      emoji: "⚠️",
      mensaje: "podría necesitar acompañamiento",
      color: "#F4C14E",
    };
  }

  return {
    categoria: "En análisis",
    emoji: "🎧",
    mensaje: "está siendo monitoreado",
    color: "#A48FD6",
  };
}

function EstadoActual({ nombreNino, prediccion, conectado }) {
  const info = clasificarEmocion(prediccion?.emotion);

  return (
    <SectionCard
      style={{
        background: "linear-gradient(135deg, #F8F4FF 0%, #EEF5FF 100%)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, color: "#6F7897", fontWeight: 700 }}>
            Estado actual
          </div>

          <h2
            style={{
              margin: "8px 0 6px",
              color: "#252B4F",
              fontSize: 24,
              lineHeight: 1.1,
            }}
          >
            {nombreNino} {info.mensaje}
          </h2>

          <p
            style={{
              margin: 0,
              color: "#6F7897",
              fontSize: 13,
              lineHeight: 1.45,
            }}
          >
            Resultado generado automáticamente desde el audio recibido por el modelo.
          </p>
        </div>

        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            boxShadow: "0 10px 25px rgba(120, 100, 170, 0.14)",
            flexShrink: 0,
          }}
        >
          {info.emoji}
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          color: conectado ? "#3FB6A8" : "#C47F2C",
          fontWeight: 800,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: conectado ? "#3FB6A8" : "#F4C14E",
          }}
        />
        {conectado ? "Modelo conectado" : "Esperando predicción del modelo"}
      </div>

      {prediccion?.emotion && (
        <div
          style={{
            marginTop: 14,
            background: "#FFFFFF",
            border: "1px solid #E9DFFC",
            borderRadius: 18,
            padding: 14,
          }}
        >
          <div style={{ fontSize: 12, color: "#7A819E", fontWeight: 700 }}>
            Última emoción detectada
          </div>

          <div
            style={{
              marginTop: 5,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
            }}
          >
            <strong style={{ color: "#252B4F", fontSize: 18 }}>
              {prediccion.emotion}
            </strong>

            {prediccion.confidence && (
              <span
                style={{
                  fontSize: 12,
                  color: "#7D73E6",
                  fontWeight: 800,
                  background: "#F1ECFF",
                  padding: "6px 10px",
                  borderRadius: 999,
                }}
              >
                {prediccion.confidence}
              </span>
            )}
          </div>
        </div>
      )}
    </SectionCard>
  );
}

function ActividadActual({
  nombreNino,
  actividadTexto,
  setActividadTexto,
  lugarActividad,
  setLugarActividad,
  actividadActual,
  onGuardar,
  guardando,
}) {
  return (
    <SectionCard>
      <h3 style={{ margin: "0 0 6px", color: "#252B4F", fontSize: 16 }}>
        Registrar actividad
      </h3>

      <p style={{ margin: "0 0 14px", color: "#6F7897", fontSize: 13 }}>
        Guarda qué está haciendo {nombreNino}. Así puedes relacionar el contexto
        con la emoción detectada.
      </p>

      {actividadActual && (
        <div
          style={{
            background: "#F1ECFF",
            border: "1px solid #E4D9FF",
            borderRadius: 16,
            padding: 12,
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 11, color: "#7D73E6", fontWeight: 900 }}>
            ACTIVIDAD ACTUAL
          </div>
          <div style={{ marginTop: 4, color: "#252B4F", fontWeight: 800 }}>
            {actividadActual.actividad}
          </div>
          {actividadActual.lugar && (
            <div style={{ fontSize: 12, color: "#7A819E", marginTop: 3 }}>
              Lugar: {actividadActual.lugar}
            </div>
          )}
        </div>
      )}

      <input
        value={actividadTexto}
        onChange={(e) => setActividadTexto(e.target.value)}
        placeholder={`Ej: ${nombreNino} está jugando`}
        style={inputStyle}
      />

      <input
        value={lugarActividad}
        onChange={(e) => setLugarActividad(e.target.value)}
        placeholder="Lugar: casa, colegio, parque..."
        style={inputStyle}
      />

      <button
        onClick={onGuardar}
        disabled={guardando}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 16,
          padding: "13px 14px",
          background: "#7D73E6",
          color: "#FFFFFF",
          fontWeight: 900,
          cursor: guardando ? "not-allowed" : "pointer",
          opacity: guardando ? 0.7 : 1,
        }}
      >
        {guardando ? "Guardando..." : "Guardar actividad"}
      </button>
    </SectionCard>
  );
}

function VocesRecientes({ registros }) {
  return (
    <SectionCard>
      <h3 style={{ margin: "0 0 12px", color: "#252B4F", fontSize: 16 }}>
        Voces recientes
      </h3>

      {registros.length === 0 ? (
        <p style={{ margin: 0, color: "#7A819E", fontSize: 13 }}>
          Todavía no hay predicciones registradas.
        </p>
      ) : (
        registros.map((item) => {
          const info = clasificarEmocion(item.emotion);

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid #EFEAF8",
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: info.color,
                  marginTop: 6,
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ color: "#252B4F", fontWeight: 850, fontSize: 14 }}>
                  {info.emoji} {info.categoria}
                </div>

                <div style={{ color: "#7A819E", fontSize: 12, marginTop: 2 }}>
                  Emoción detectada: {item.emotion}
                </div>

                {item.actividad && (
                  <div
                    style={{
                      marginTop: 6,
                      background: "#F5F0FF",
                      border: "1px solid #ECE3FF",
                      borderRadius: 12,
                      padding: "6px 8px",
                      color: "#5C4B8A",
                      fontSize: 12,
                    }}
                  >
                    📍 {item.actividad}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </SectionCard>
  );
}

const inputStyle = {
  width: "100%",
  border: "1px solid #E3D8F5",
  borderRadius: 16,
  padding: "13px 14px",
  fontSize: 14,
  color: "#252B4F",
  outline: "none",
  marginBottom: 10,
  background: "#FFFFFF",
  boxSizing: "border-box",
};

export default function Inicio() {
  const [nombreNino] = useState("Mateo");
  const [prediccionActual, setPrediccionActual] = useState(null);
  const [ultimaFirma, setUltimaFirma] = useState("");
  const [modeloConectado, setModeloConectado] = useState(false);

  const [registros, setRegistros] = useState([]);
  const [actividadTexto, setActividadTexto] = useState("");
  const [lugarActividad, setLugarActividad] = useState("");
  const [actividadActual, setActividadActual] = useState(null);
  const [guardandoActividad, setGuardandoActividad] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(async () => {
      try {
        const data = await obtenerUltimaPrediccion();

        if (!data || !data.emotion) {
          setModeloConectado(false);
          return;
        }

        setModeloConectado(true);
        setPrediccionActual(data);

        const firma = `${data.emotion}-${data.confidence}-${data.timestamp || ""}`;

        if (firma !== ultimaFirma) {
          setUltimaFirma(firma);

          await addDoc(collection(db, "predicciones"), {
            uid: auth.currentUser?.uid || null,
            emotion: data.emotion,
            confidence: data.confidence || null,
            categoria: clasificarEmocion(data.emotion).categoria,
            actividad: actividadActual?.actividad || "",
            lugar: actividadActual?.lugar || "",
            createdAt: serverTimestamp(),
          });
        }
      } catch (error) {
        setModeloConectado(false);
      }
    }, 3000);

    return () => clearInterval(intervalo);
  }, [ultimaFirma, actividadActual]);

  useEffect(() => {
    const q = query(
      collection(db, "predicciones"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRegistros(datos);
    });

    return () => unsubscribe();
  }, []);

  async function guardarActividad() {
    if (!actividadTexto.trim()) return;

    try {
      setGuardandoActividad(true);

      const nuevaActividad = {
        actividad: actividadTexto.trim(),
        lugar: lugarActividad.trim(),
      };

      setActividadActual(nuevaActividad);

      await addDoc(collection(db, "actividades"), {
        uid: auth.currentUser?.uid || null,
        ...nuevaActividad,
        createdAt: serverTimestamp(),
      });

      setActividadTexto("");
      setLugarActividad("");
    } finally {
      setGuardandoActividad(false);
    }
  }

  return (
    <div style={{ padding: "18px 16px 90px" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <WaveLogo />

        <div>
          <h1 style={{ margin: 0, color: "#252B4F", fontSize: 24 }}>
            VocaLink
          </h1>
          <p style={{ margin: 0, color: "#7A819E", fontSize: 13 }}>
            Monitoreo emocional en tiempo real
          </p>
        </div>
      </header>

      <EstadoActual
        nombreNino={nombreNino}
        prediccion={prediccionActual}
        conectado={modeloConectado}
      />

      <ActividadActual
        nombreNino={nombreNino}
        actividadTexto={actividadTexto}
        setActividadTexto={setActividadTexto}
        lugarActividad={lugarActividad}
        setLugarActividad={setLugarActividad}
        actividadActual={actividadActual}
        onGuardar={guardarActividad}
        guardando={guardandoActividad}
      />

      <VocesRecientes registros={registros} />
    </div>
  );
}