import AnalisisAudio from "./AnalisisAudio";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";

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

function SmallStatCard({ icon, title, value, subtitle }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "0",
        background: "#FFFFFF",
        border: "1px solid #EDE3F8",
        borderRadius: "20px",
        padding: "14px",
        boxShadow: "0 8px 22px rgba(155, 132, 192, 0.07)",
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: "#F1ECFF",
          color: "#7E6FE8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "17px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "#59607C",
          fontWeight: "600",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "24px",
          color: "#252B4F",
          fontWeight: "800",
          lineHeight: "1",
        }}
      >
        {value}
      </div>

      {subtitle && (
        <div style={{ fontSize: "11px", color: "#7C839F", marginTop: "5px" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function CategoryCard({ emoji, title, percent, color, textColor }) {
  return (
    <div
      style={{
        flex: 1,
        background: color,
        borderRadius: "18px",
        padding: "14px 8px",
        textAlign: "center",
        minHeight: "112px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.8)",
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{emoji}</div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: "800",
          color: textColor,
          marginBottom: "6px",
        }}
      >
        {title}
      </div>

      <div style={{ fontSize: "15px", fontWeight: "800", color: textColor }}>
        {percent}%
      </div>
    </div>
  );
}

function DistributionBar({ label, percent, color }) {
  return (
    <div style={{ marginBottom: "13px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
          fontSize: "12px",
          color: "#59607C",
          fontWeight: "600",
        }}
      >
        <span>{label}</span>
        <span>{percent}%</span>
      </div>

      <div
        style={{
          height: "10px",
          background: "#F1F1FA",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color,
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  );
}

function RecentItem({ time, categoria, emocion, emoji, actividad }) {
  const color =
    categoria === "Positivo"
      ? "#3FB6A8"
      : categoria === "Neutro"
      ? "#A48FD6"
      : "#F4C14E";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px 0",
        borderBottom: "1px solid #EFEAF8",
      }}
    >
      <div
        style={{
          width: "9px",
          height: "9px",
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
          marginTop: "5px",
        }}
      />

      <div
        style={{
          fontSize: "13px",
          color: "#7A819E",
          width: "58px",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {time}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "14px",
            color: "#252B4F",
            fontWeight: "800",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {emoji} {categoria}
        </div>

        <div style={{ fontSize: "12px", color: "#7A819E", marginTop: "2px" }}>
          Emoción detectada: {emocion}
        </div>

        {actividad && (
          <div
            style={{
              fontSize: "12px",
              color: "#5C4B8A",
              marginTop: "5px",
              background: "#F5F0FF",
              border: "1px solid #ECE3FF",
              padding: "6px 8px",
              borderRadius: "12px",
              lineHeight: "1.35",
            }}
          >
            📍 Actividad registrada: {actividad}
          </div>
        )}
      </div>
    </div>
  );
}

function AnalysisBox() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FBF8FE 0%, #F7F1FC 100%)",
        border: "1px solid #EEE3F8",
        borderRadius: "20px",
        padding: "18px",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          color: "#7D7990",
          marginBottom: "14px",
          lineHeight: "1.5",
        }}
      >
        Sube un audio para analizar la categoría emocional detectada por el modelo.
      </div>

      <AnalisisAudio />
    </div>
  );
}

function RegistroActividad({
  nombreNino,
  actividadTexto,
  setActividadTexto,
  lugarActividad,
  setLugarActividad,
  guardandoActividad,
  onGuardar,
  actividadActual,
  formatearHora,
}) {
  return (
    <SectionCard
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #F8F4FF 100%)",
      }}
    >
      <div
        style={{
          fontSize: "15px",
          color: "#252B4F",
          fontWeight: "900",
          marginBottom: "6px",
        }}
      >
        Registrar actividad
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "#6F7897",
          lineHeight: "1.45",
          marginBottom: "14px",
        }}
      >
        Guarda qué está haciendo {nombreNino}. Así, si luego aparece una alerta
        emocional, podrás revisar si la actividad pudo influir en el resultado.
      </div>

      {actividadActual && (
        <div
          style={{
            background: "#F1ECFF",
            border: "1px solid #E4D9FF",
            borderRadius: "16px",
            padding: "12px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#7D73E6",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "4px",
            }}
          >
            Actividad actual
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#252B4F",
              fontWeight: "800",
              lineHeight: "1.4",
            }}
          >
            {actividadActual.actividad}
          </div>

          <div style={{ fontSize: "12px", color: "#7A819E", marginTop: "4px" }}>
            {actividadActual.lugar && `Lugar: ${actividadActual.lugar} · `}
            Desde las {formatearHora(actividadActual.fechaInicio)}
          </div>
        </div>
      )}

      <input
        value={actividadTexto}
        onChange={(e) => setActividadTexto(e.target.value)}
        placeholder={`Ej: ${nombreNino} está jugando en el parque`}
        style={{
          width: "100%",
          border: "1px solid #E3D8F5",
          borderRadius: "16px",
          padding: "13px 14px",
          fontSize: "14px",
          color: "#252B4F",
          outline: "none",
          marginBottom: "10px",
          background: "#FFFFFF",
        }}
      />

      <input
        value={lugarActividad}
        onChange={(e) => setLugarActividad(e.target.value)}
        placeholder="Lugar o contexto: parque, casa, colegio..."
        style={{
          width: "100%",
          border: "1px solid #E3D8F5",
          borderRadius: "16px",
          padding: "13px 14px",
          fontSize: "14px",
          color: "#252B4F",
          outline: "none",
          marginBottom: "12px",
          background: "#FFFFFF",
        }}
      />

      <button
        onClick={onGuardar}
        disabled={guardandoActividad || actividadTexto.trim() === ""}
        style={{
          width: "100%",
          border: "none",
          borderRadius: "16px",
          padding: "13px 14px",
          background:
            guardandoActividad || actividadTexto.trim() === ""
              ? "#D8D4EA"
              : "linear-gradient(135deg, #B79CF7, #7FA8F8)",
          color: "#FFFFFF",
          fontWeight: "900",
          fontSize: "14px",
          cursor:
            guardandoActividad || actividadTexto.trim() === ""
              ? "not-allowed"
              : "pointer",
          boxShadow:
            guardandoActividad || actividadTexto.trim() === ""
              ? "none"
              : "0 10px 22px rgba(126, 126, 230, 0.25)",
        }}
      >
        {guardandoActividad ? "Guardando..." : "Guardar actividad con hora actual"}
      </button>
    </SectionCard>
  );
}

export default function Inicio() {
  const [historial, setHistorial] = useState([]);
  const [actividades, setActividades] = useState([]);

  const [nombreNino, setNombreNino] = useState("Niño 1");
  const [nombreCuidador, setNombreCuidador] = useState("");
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  const [actividadTexto, setActividadTexto] = useState("");
  const [lugarActividad, setLugarActividad] = useState("");
  const [guardandoActividad, setGuardandoActividad] = useState(false);

  useEffect(() => {
    async function cargarPerfil() {
      try {
        const usuario = auth.currentUser;

        if (!usuario) {
          setCargandoPerfil(false);
          return;
        }

        const docRef = doc(db, "usuarios", usuario.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const datos = docSnap.data();
          if (datos.nombreNino) setNombreNino(datos.nombreNino);
          if (datos.nombreCuidador) setNombreCuidador(datos.nombreCuidador);
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setCargandoPerfil(false);
      }
    }

    cargarPerfil();
  }, []);

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

  async function guardarActividad() {
    const usuario = auth.currentUser;

    if (!usuario || actividadTexto.trim() === "") return;

    try {
      setGuardandoActividad(true);

      await addDoc(collection(db, "actividades"), {
        uid: usuario.uid,
        nombreNino,
        actividad: actividadTexto.trim(),
        lugar: lugarActividad.trim(),
        fechaInicio: serverTimestamp(),
        activa: true,
      });

      setActividadTexto("");
      setLugarActividad("");
    } catch (error) {
      console.error("Error guardando actividad:", error);
      alert("No se pudo guardar la actividad. Intenta de nuevo.");
    } finally {
      setGuardandoActividad(false);
    }
  }

  const hoy = new Date();

  const historialHoy = historial.filter((item) => {
    if (!item.fecha) return false;

    const fechaItem = item.fecha.toDate();

    return (
      fechaItem.getDate() === hoy.getDate() &&
      fechaItem.getMonth() === hoy.getMonth() &&
      fechaItem.getFullYear() === hoy.getFullYear()
    );
  });

  const totalHoy = historialHoy.length;

  const actividadesHoy = actividades.filter((item) => {
    if (!item.fechaInicio) return false;

    const fechaItem = item.fechaInicio.toDate();

    return (
      fechaItem.getDate() === hoy.getDate() &&
      fechaItem.getMonth() === hoy.getMonth() &&
      fechaItem.getFullYear() === hoy.getFullYear()
    );
  });

  const actividadActual = actividadesHoy.length > 0 ? actividadesHoy[0] : null;

  const normalizarEmocion = (emocion) => {
    return String(emocion || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const obtenerCategoria = (emocion) => {
    const e = normalizarEmocion(emocion);

    if (["felicidad", "alegria", "happy", "calma", "calm"].includes(e)) {
      return "Positivo";
    }

    if (["neutral", "neutro", "calmado"].includes(e)) {
      return "Neutro";
    }

    if (
      [
        "tristeza",
        "sad",
        "enojo",
        "ira",
        "angry",
        "miedo",
        "fear",
        "estres",
        "stress",
        "molestia",
        "disgust",
        "frustracion",
        "frustration",
      ].includes(e)
    ) {
      return "Alerta emocional";
    }

    return "Neutro";
  };

  const emojiPorCategoria = (categoria) => {
    const mapa = {
      Positivo: "😊",
      Neutro: "😐",
      "Alerta emocional": "😟",
    };

    return mapa[categoria] || "😐";
  };

  const mensajePorCategoria = (categoria) => {
    const nombre = cargandoPerfil ? "El niño" : nombreNino;

    if (categoria === "Positivo") {
      return `${nombre} podría estar en un estado positivo. Buen momento para interacción tranquila, juego o acompañamiento.`;
    }

    if (categoria === "Alerta emocional") {
      return `${nombre} podría requerir más atención. Observa el contexto, su postura y la actividad registrada en ese momento.`;
    }

    return `${nombre} podría estar en un estado neutro o estable. Continúa observando el contexto antes de tomar decisiones.`;
  };

  const contarPorCategoria = (categoria) => {
    if (totalHoy === 0) return 0;

    const cantidad = historialHoy.filter(
      (item) => obtenerCategoria(item.emocion) === categoria
    ).length;

    return Math.round((cantidad / totalHoy) * 100);
  };

  const obtenerActividadParaAudio = (fechaAudioFirebase) => {
    if (!fechaAudioFirebase) return null;

    const fechaAudio = fechaAudioFirebase.toDate();

    const actividadesAntes = actividades
      .filter((actividad) => {
        if (!actividad.fechaInicio) return false;
        return actividad.fechaInicio.toDate() <= fechaAudio;
      })
      .sort((a, b) => b.fechaInicio.toDate() - a.fechaInicio.toDate());

    return actividadesAntes.length > 0 ? actividadesAntes[0] : null;
  };

  const porcentajePositivo = contarPorCategoria("Positivo");
  const porcentajeNeutro = contarPorCategoria("Neutro");
  const porcentajeAlerta = contarPorCategoria("Alerta emocional");

  const ultimoRegistro = historialHoy.length > 0 ? historialHoy[0] : null;

  const categoriaActual = ultimoRegistro
    ? obtenerCategoria(ultimoRegistro.emocion)
    : "Sin registros";

  const emocionActual = ultimoRegistro?.emocion || "Aún no hay registros";

  const emojiActual =
    categoriaActual === "Sin registros"
      ? "🫧"
      : emojiPorCategoria(categoriaActual);

  const actividadUltimoRegistro = ultimoRegistro
    ? obtenerActividadParaAudio(ultimoRegistro.fecha)
    : null;

  const categoriaFrecuente = (() => {
    if (totalHoy === 0) return "Sin registros";

    const categorias = [
      { nombre: "Positivo", valor: porcentajePositivo },
      { nombre: "Neutro", valor: porcentajeNeutro },
      { nombre: "Alerta emocional", valor: porcentajeAlerta },
    ];

    return categorias.sort((a, b) => b.valor - a.valor)[0].nombre;
  })();

  const formatearHora = (fechaFirebase) => {
    if (!fechaFirebase) return "--:--";

    const fecha = fechaFirebase.toDate();

    return fecha.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(180deg, #FBF8FE 0%, #FFFFFF 100%)",
      }}
    >
      {/* ENCABEZADO */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
          paddingTop: "4px",
        }}
      >
        <WaveLogo />

        <div
          style={{
            fontSize: "26px",
            fontWeight: "800",
            color: "#7D73E6",
            letterSpacing: "0.5px",
          }}
        >
          VocaLink
        </div>
      </div>

      {/* SALUDO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "25px",
              color: "#252B4F",
              margin: "0 0 6px",
              fontWeight: "900",
            }}
          >
            ¡Hola, {cargandoPerfil ? "cuidador" : nombreCuidador || "cuidador"}! 👋
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6F7897",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            Tu voz cuenta. Estamos aquí para ayudarte.
          </p>
        </div>

        <div
          style={{
            background: "#EAF7EC",
            color: "#2E8A43",
            padding: "10px 12px",
            borderRadius: "18px",
            fontSize: "12px",
            fontWeight: "800",
            whiteSpace: "nowrap",
          }}
        >
          ✓ Activo
        </div>
      </div>

      {/* MONITOREANDO */}
      <SectionCard>
        <div
          style={{
            fontSize: "11px",
            color: "#8B8B98",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "8px",
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          Monitoreando
        </div>

        <div
          style={{
            fontSize: "20px",
            fontWeight: "900",
            color: "#252B4F",
            textAlign: "center",
          }}
        >
          {cargandoPerfil ? "Cargando..." : nombreNino}
        </div>

        {nombreCuidador && !cargandoPerfil && (
          <div
            style={{
              fontSize: "12px",
              color: "#6F6F7B",
              marginTop: "5px",
              textAlign: "center",
            }}
          >
            Cuidador: {nombreCuidador}
          </div>
        )}
      </SectionCard>

      {/* REGISTRAR ACTIVIDAD */}
      <RegistroActividad
        nombreNino={cargandoPerfil ? "el niño" : nombreNino}
        actividadTexto={actividadTexto}
        setActividadTexto={setActividadTexto}
        lugarActividad={lugarActividad}
        setLugarActividad={setLugarActividad}
        guardandoActividad={guardandoActividad}
        onGuardar={guardarActividad}
        actividadActual={actividadActual}
        formatearHora={formatearHora}
      />

      {/* RESULTADO PRINCIPAL */}
      <SectionCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
            gap: "10px",
          }}
        >
          <div
            style={{
              color: "#7D73E6",
              fontWeight: "900",
              fontSize: "15px",
            }}
          >
            ▌ Categoría detectada
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "#8B8B98",
              background: "#F8F5FF",
              border: "1px solid #EFE8FF",
              padding: "6px 10px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
            }}
          >
            Último registro
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <div
            style={{
              width: "112px",
              height: "112px",
              borderRadius: "50%",
              background: "#F1ECFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "56px",
              flexShrink: 0,
            }}
          >
            {emojiActual}
          </div>

          <div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#252B4F",
                marginBottom: "8px",
              }}
            >
              {categoriaActual}
            </div>

            <div
              style={{
                display: "inline-block",
                background:
                  categoriaActual === "Alerta emocional"
                    ? "#FFF2CF"
                    : categoriaActual === "Positivo"
                    ? "#E4F6EF"
                    : "#F1ECFF",
                color:
                  categoriaActual === "Alerta emocional"
                    ? "#9A6A00"
                    : categoriaActual === "Positivo"
                    ? "#2E8A43"
                    : "#6F62C9",
                padding: "5px 10px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              {emocionActual}
            </div>

            <p
              style={{
                margin: 0,
                color: "#4F5775",
                fontSize: "14px",
                lineHeight: "1.45",
              }}
            >
              {categoriaActual === "Sin registros"
                ? "Cuando analices un audio, aquí aparecerá la categoría emocional detectada."
                : mensajePorCategoria(categoriaActual)}
            </p>
          </div>
        </div>

        {actividadUltimoRegistro && (
          <div
            style={{
              marginTop: "16px",
              background: "#F5F0FF",
              border: "1px solid #E6DCFF",
              color: "#5C4B8A",
              borderRadius: "16px",
              padding: "12px",
              fontSize: "13px",
              lineHeight: "1.45",
              fontWeight: "700",
            }}
          >
            📍 Contexto registrado: {actividadUltimoRegistro.actividad}
            {actividadUltimoRegistro.lugar
              ? ` · ${actividadUltimoRegistro.lugar}`
              : ""}
          </div>
        )}

        <div
          style={{
            marginTop: "18px",
            background: "#FFF9E8",
            border: "1px solid #F6DFA3",
            color: "#7B5A12",
            borderRadius: "16px",
            padding: "13px",
            fontSize: "13px",
            lineHeight: "1.45",
            fontWeight: "600",
          }}
        >
          💡 Este resultado es una orientación para apoyar la respuesta del
          cuidador, no un diagnóstico médico.
        </div>
      </SectionCard>

      {/* TARJETAS RESUMEN */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <SmallStatCard icon="📈" title="Análisis hoy" value={totalHoy} />

        <SmallStatCard
          icon="😊"
          title="Categoría frecuente"
          value={
            categoriaFrecuente === "Sin registros"
              ? "--"
              : emojiPorCategoria(categoriaFrecuente)
          }
          subtitle={categoriaFrecuente}
        />

        <SmallStatCard
          icon="🕘"
          title="Último registro"
          value={ultimoRegistro ? formatearHora(ultimoRegistro.fecha) : "--:--"}
        />
      </div>

      {/* CATEGORÍAS */}
      <SectionCard>
        <div
          style={{
            fontSize: "15px",
            color: "#252B4F",
            fontWeight: "900",
            marginBottom: "14px",
          }}
        >
          Análisis emocional de hoy
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
          <CategoryCard
            emoji="😊"
            title="Positivo"
            percent={porcentajePositivo}
            color="#E4F6EF"
            textColor="#2E8A43"
          />

          <CategoryCard
            emoji="😐"
            title="Neutro"
            percent={porcentajeNeutro}
            color="#F1ECFF"
            textColor="#6F62C9"
          />

          <CategoryCard
            emoji="😟"
            title="Alerta"
            percent={porcentajeAlerta}
            color="#FFF2CF"
            textColor="#9A6A00"
          />
        </div>

        <DistributionBar
          label="Positivo"
          percent={porcentajePositivo}
          color="#3FB6A8"
        />

        <DistributionBar
          label="Neutro"
          percent={porcentajeNeutro}
          color="#A48FD6"
        />

        <DistributionBar
          label="Alerta emocional"
          percent={porcentajeAlerta}
          color="#F4C14E"
        />

        <div style={{ color: "#8B8B98", fontSize: "12px", marginTop: "12px" }}>
          Calculado con {totalHoy} registros del día.
        </div>
      </SectionCard>

      {/* VOCES RECIENTES */}
      <SectionCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              color: "#252B4F",
              fontWeight: "900",
            }}
          >
            Voces recientes
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#7D73E6",
              fontWeight: "800",
            }}
          >
            Ver todo →
          </div>
        </div>

        {historial.length === 0 ? (
          <div
            style={{
              fontSize: "14px",
              color: "#7C7890",
              textAlign: "center",
              padding: "18px",
            }}
          >
            Aún no hay voces registradas.
          </div>
        ) : (
          historial.slice(0, 4).map((item) => {
            const categoria = obtenerCategoria(item.emocion);
            const actividadAsociada = obtenerActividadParaAudio(item.fecha);

            return (
              <RecentItem
                key={item.id}
                time={formatearHora(item.fecha)}
                categoria={categoria}
                emocion={item.emocion}
                emoji={emojiPorCategoria(categoria)}
                actividad={
                  actividadAsociada
                    ? `${actividadAsociada.actividad}${
                        actividadAsociada.lugar
                          ? ` · ${actividadAsociada.lugar}`
                          : ""
                      }`
                    : ""
                }
              />
            );
          })
        )}
      </SectionCard>

      {/* CONSEJO */}
      <SectionCard
        style={{
          background: "linear-gradient(135deg, #F7F1FF 0%, #FFFFFF 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#F1ECFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "25px",
              flexShrink: 0,
            }}
          >
            ✨
          </div>

          <div>
            <div
              style={{
                color: "#7D73E6",
                fontWeight: "900",
                fontSize: "15px",
                marginBottom: "5px",
              }}
            >
              Consejo del día
            </div>

            <div
              style={{
                color: "#6F7897",
                fontSize: "14px",
                lineHeight: "1.45",
              }}
            >
              Pequeños momentos de calma pueden hacer una gran diferencia. 🌿
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ANALIZAR AUDIO */}
      <SectionCard>
        <div
          style={{
            fontSize: "15px",
            color: "#252B4F",
            fontWeight: "900",
            marginBottom: "12px",
          }}
        >
          Analizar audio
        </div>

        <AnalysisBox />
      </SectionCard>
    </div>
  );
}