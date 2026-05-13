import { useState } from "react";

const destacados = [
  {
    tipo: "Consejo",
    icono: "💡",
    titulo: "5 técnicas que me han ayudado a mantener la calma",
    autor: "María C.",
    tiempo: "Hace 2 h",
    interacciones: 24,
    accion: "♡",
  },
  {
    tipo: "Pregunta",
    icono: "❔",
    titulo: "¿Cómo manejan las rabietas en la tarde?",
    autor: "Luis A.",
    tiempo: "Hace 4 h",
    interacciones: 18,
    accion: "💬",
  },
  {
    tipo: "Experiencia",
    icono: "⭐",
    titulo: "Nuestro progreso con las rutinas diarias",
    autor: "Ana P.",
    tiempo: "Hace 6 h",
    interacciones: 31,
    accion: "♡",
  },
];

const conversaciones = [
  {
    icono: "💬",
    titulo: "Actividades para reducir el estrés",
    subtitulo: "¿Qué actividades les han funcionado mejor?",
    respuestas: 12,
    ultima: "Última: Hace 30 min",
  },
  {
    icono: "☕",
    titulo: "Momentos de calma para mi hijo/a 🌿",
    subtitulo: "Compartamos lo que nos ayuda en casa",
    respuestas: 8,
    ultima: "Última: Hace 1 h",
  },
  {
    icono: "😊",
    titulo: "Logros que nos motivan ✨",
    subtitulo: "Pequeñas victorias que celebramos",
    respuestas: 15,
    ultima: "Última: Hace 2 h",
  },
];

function DestacadoCard({ item }) {
  return (
    <div
      style={{
        minWidth: "245px",
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: "22px",
        padding: "17px",
        boxShadow: "0 8px 24px rgba(155,132,192,0.06)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: "#F3EEFF",
          color: "#7D73E6",
          borderRadius: "999px",
          padding: "7px 12px",
          fontSize: "13px",
          fontWeight: "900",
          marginBottom: "16px",
        }}
      >
        <span>{item.icono}</span>
        {item.tipo}
      </div>

      <div
        style={{
          color: "#24325C",
          fontSize: "16px",
          fontWeight: "900",
          lineHeight: "1.55",
          minHeight: "84px",
        }}
      >
        {item.titulo}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#E9E3F8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
            }}
          >
            👤
          </div>

          <div>
            <div
              style={{
                color: "#24325C",
                fontWeight: "800",
                fontSize: "13px",
              }}
            >
              {item.autor}
            </div>

            <div
              style={{
                color: "#8B90A8",
                fontSize: "12px",
              }}
            >
              {item.tiempo}
            </div>
          </div>
        </div>

        <div
          style={{
            color: "#8F8AA9",
            fontSize: "14px",
            fontWeight: "800",
          }}
        >
          {item.accion} {item.interacciones}
        </div>
      </div>
    </div>
  );
}

function ConversacionCard({ item }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "18px",
        borderBottom: "1px solid #F1ECF8",
      }}
    >
      <div
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "20px",
          background: "#F3EEFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "26px",
          flexShrink: 0,
        }}
      >
        {item.icono}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: "#24325C",
            fontSize: "17px",
            fontWeight: "900",
            marginBottom: "5px",
          }}
        >
          {item.titulo}
        </div>

        <div
          style={{
            color: "#6F7897",
            fontSize: "14px",
            marginBottom: "7px",
            lineHeight: "1.35",
          }}
        >
          {item.subtitulo}
        </div>

        <div
          style={{
            color: "#8B90A8",
            fontSize: "13px",
          }}
        >
          {item.respuestas} respuestas · {item.ultima}
        </div>
      </div>

      <div
        style={{
          background: "#F1ECFF",
          color: "#7D73E6",
          borderRadius: "999px",
          padding: "6px 10px",
          fontSize: "13px",
          fontWeight: "900",
          flexShrink: 0,
        }}
      >
        {item.respuestas}
      </div>
    </div>
  );
}

function CrearPublicacion({ onCerrar }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Consejo");
  const [contenido, setContenido] = useState("");

  function publicar() {
    if (!titulo.trim() || !contenido.trim()) {
      alert("Escribe un título y una descripción.");
      return;
    }

    alert("Publicación creada correctamente.");
    setTitulo("");
    setContenido("");
    onCerrar();
  }

  return (
    <section className="pantalla-menu">
      <div className="pantalla-menu-header">
        <button onClick={onCerrar}>←</button>
        <h2>Nueva publicación</h2>
      </div>

      <div className="pantalla-menu-contenido">
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #EEE7FA",
            borderRadius: "22px",
            padding: "18px",
            boxShadow: "0 8px 24px rgba(155,132,192,0.06)",
          }}
        >
          <h3
            style={{
              color: "#24325C",
              fontSize: "18px",
              fontWeight: "900",
              margin: "0 0 8px",
            }}
          >
            Comparte con la comunidad
          </h3>

          <p
            style={{
              color: "#6F7897",
              fontSize: "13px",
              lineHeight: "1.45",
              margin: "0 0 18px",
            }}
          >
            Puedes hacer una pregunta, compartir una experiencia o dejar un consejo
            para otros cuidadores.
          </p>

          <label style={{ display: "block", marginBottom: "14px" }}>
            <span
              style={{
                display: "block",
                color: "#24325C",
                fontSize: "13px",
                fontWeight: "800",
                marginBottom: "7px",
              }}
            >
              Tipo de publicación
            </span>

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #E3D8F5",
                borderRadius: "14px",
                padding: "12px 14px",
                outline: "none",
                color: "#24325C",
              }}
            >
              <option>Consejo</option>
              <option>Pregunta</option>
              <option>Experiencia</option>
            </select>
          </label>

          <label style={{ display: "block", marginBottom: "14px" }}>
            <span
              style={{
                display: "block",
                color: "#24325C",
                fontSize: "13px",
                fontWeight: "800",
                marginBottom: "7px",
              }}
            >
              Título
            </span>

            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: ¿Cómo manejan las tardes difíciles?"
              style={{
                width: "100%",
                border: "1px solid #E3D8F5",
                borderRadius: "14px",
                padding: "12px 14px",
                outline: "none",
                color: "#24325C",
              }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "16px" }}>
            <span
              style={{
                display: "block",
                color: "#24325C",
                fontSize: "13px",
                fontWeight: "800",
                marginBottom: "7px",
              }}
            >
              Descripción
            </span>

            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Escribe aquí tu publicación..."
              rows={5}
              style={{
                width: "100%",
                border: "1px solid #E3D8F5",
                borderRadius: "14px",
                padding: "12px 14px",
                outline: "none",
                color: "#24325C",
                resize: "none",
              }}
            />
          </label>

          <button
            onClick={publicar}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "16px",
              padding: "14px",
              background: "linear-gradient(135deg, #B79CF7, #7FA8F8)",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "900",
              cursor: "pointer",
              boxShadow: "0 10px 22px rgba(126,126,230,0.25)",
            }}
          >
            Publicar
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Foro() {
  const [crearPublicacion, setCrearPublicacion] = useState(false);

  if (crearPublicacion) {
    return <CrearPublicacion onCerrar={() => setCrearPublicacion(false)} />;
  }

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
          border: "1px solid #EEE7FA",
          borderRadius: "24px",
          padding: "24px",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
          minHeight: "150px",
        }}
      >
        <div style={{ maxWidth: "58%" }}>
          <div
            style={{
              color: "#24325C",
              fontSize: "21px",
              fontWeight: "900",
              lineHeight: "1.35",
              marginBottom: "10px",
            }}
          >
            Bienvenido a la comunidad 👋
          </div>

          <div
            style={{
              color: "#5F6788",
              fontSize: "15px",
              lineHeight: "1.65",
            }}
          >
            Comparte experiencias, haz preguntas y recibe apoyo de otros cuidadores
            que entienden tu día a día.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "18px",
            bottom: "8px",
            fontSize: "90px",
            opacity: 0.22,
          }}
        >
          💬
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <h2
          style={{
            color: "#24325C",
            fontSize: "21px",
            margin: 0,
            fontWeight: "900",
          }}
        >
          Destacados
        </h2>

        <div
          style={{
            color: "#7D73E6",
            fontSize: "14px",
            fontWeight: "800",
          }}
        >
          Ver todos ›
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          paddingBottom: "8px",
          marginBottom: "24px",
        }}
      >
        {destacados.map((item) => (
          <DestacadoCard key={item.titulo} item={item} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <h2
          style={{
            color: "#24325C",
            fontSize: "21px",
            margin: 0,
            fontWeight: "900",
          }}
        >
          Conversaciones recientes
        </h2>

        <div
          style={{
            color: "#7D73E6",
            fontSize: "14px",
            fontWeight: "800",
          }}
        >
          Ver todas ›
        </div>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #EEE7FA",
          borderRadius: "24px",
          overflow: "hidden",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(155,132,192,0.05)",
        }}
      >
        {conversaciones.map((item) => (
          <ConversacionCard key={item.titulo} item={item} />
        ))}
      </div>

      <button
        onClick={() => setCrearPublicacion(true)}
        style={{
          width: "100%",
          border: "1px solid #EEE7FA",
          background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
          borderRadius: "24px",
          padding: "22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(155,132,192,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              color: "#7D73E6",
              fontSize: "28px",
            }}
          >
            ✏️
          </div>

          <div
            style={{
              color: "#7D73E6",
              fontWeight: "900",
              fontSize: "17px",
            }}
          >
            Crear nueva publicación
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "#8E80F7",
          }}
        >
          ›
        </div>
      </button>

      <div
        style={{
          background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
          border: "1px solid #EEE7FA",
          borderRadius: "24px",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
          minHeight: "145px",
        }}
      >
        <div style={{ maxWidth: "62%" }}>
          <div
            style={{
              color: "#7D73E6",
              fontSize: "20px",
              fontWeight: "900",
              lineHeight: "1.35",
              marginBottom: "10px",
            }}
          >
            Recuerda: No estás solo/a
          </div>

          <div
            style={{
              color: "#5F6788",
              fontSize: "15px",
              lineHeight: "1.65",
            }}
          >
            Esta comunidad está aquí para apoyarte en cada paso del camino. 💜
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "18px",
            bottom: "4px",
            fontSize: "88px",
            opacity: 0.22,
          }}
        >
          🙌
        </div>
      </div>
    </>
  );
}