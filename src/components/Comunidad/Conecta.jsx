import { useState } from "react";

const cuidadores = [
  {
    id: 1,
    nombre: "María G.",
    rol: "Cuidadora de Mateo",
    edad: "8 años",
    distancia: "A 2.1 km de ti",
    tags: ["Rutinas", "Manejo del estrés", "Juegos"],
    foto: "👩🏻",
    estado: "online",
  },
  {
    id: 2,
    nombre: "Luis A.",
    rol: "Cuidador de Simón",
    edad: "6 años",
    distancia: "A 3.4 km de ti",
    tags: ["Alimentación", "Sueño", "Actividad física"],
    foto: "👨🏻",
    estado: "online",
  },
  {
    id: 3,
    nombre: "Ana P.",
    rol: "Cuidadora de Sofía",
    edad: "7 años",
    distancia: "A 4.7 km de ti",
    tags: ["Comunicación", "Emociones", "Escuela"],
    foto: "👩🏽",
    estado: "online",
  },
];

const pendientes = [
  {
    id: 1,
    nombre: "Laura R.",
    rol: "Cuidadora de Martín",
    edad: "5 años",
    detalle: "Solicitud enviada hace 1 día",
    foto: "👩🏽",
  },
  {
    id: 2,
    nombre: "Javier T.",
    rol: "Cuidador de Lucas",
    edad: "9 años",
    detalle: "Solicitud enviada hace 2 días",
    foto: "👨🏽",
  },
];

const mensajes = [
  {
    id: 1,
    nombre: "María G.",
    preview: "Tú: ¡Gracias! Lo probaré hoy 😊",
    hora: "9:40 a. m.",
    unread: 2,
    foto: "👩🏻",
    activo: true,
  },
  {
    id: 2,
    nombre: "Luis A.",
    preview: "Luis: Sí, a nosotros nos funcionó mucho.",
    hora: "Ayer",
    foto: "👨🏻",
  },
  {
    id: 3,
    nombre: "Ana P.",
    preview: "Tú: Perfecto, gracias por la recomendación ✨",
    hora: "Ayer",
    unread: 1,
    foto: "👩🏽",
  },
  {
    id: 4,
    nombre: "Grupo: Rutinas",
    preview: "Carla: Les comparto esta rutina que nos...",
    hora: "Mar",
    unread: 5,
    foto: "👥",
  },
  {
    id: 5,
    nombre: "Laura R.",
    preview: "Laura: ¿Cómo le fue en la escuela hoy?",
    hora: "Lun",
    foto: "👩🏾",
  },
];

function Tag({ children }) {
  return (
    <span
      style={{
        background: "#F3EEFF",
        color: "#7D73E6",
        borderRadius: "999px",
        padding: "6px 10px",
        fontSize: "12px",
        fontWeight: "700",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Avatar({ emoji, size = 64 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#EFE9FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.46,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {emoji}
      <span
        style={{
          position: "absolute",
          right: 2,
          bottom: 4,
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: "50%",
          background: "#43C879",
          border: "3px solid white",
        }}
      />
    </div>
  );
}

function CuidadorCard({ cuidador }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: "22px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        boxShadow: "0 8px 24px rgba(155,132,192,0.06)",
      }}
    >
      <Avatar emoji={cuidador.foto} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: "#24325C",
            fontSize: "17px",
            fontWeight: "900",
            marginBottom: "5px",
          }}
        >
          {cuidador.nombre}
        </div>

        <div
          style={{
            color: "#6F7897",
            fontSize: "13px",
            marginBottom: "5px",
          }}
        >
          {cuidador.rol} · {cuidador.edad}
        </div>

        <div
          style={{
            color: "#8D85BB",
            fontSize: "13px",
            marginBottom: "10px",
          }}
        >
          📍 {cuidador.distancia}
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
            flexWrap: "wrap",
          }}
        >
          {cuidador.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      <button
        style={{
          border: "1px solid #DED2FF",
          background: "#FFFFFF",
          color: "#7D73E6",
          borderRadius: "14px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "900",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Conectar
      </button>
    </div>
  );
}

function PendienteCard({ item }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: "22px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        boxShadow: "0 8px 24px rgba(155,132,192,0.05)",
      }}
    >
      <Avatar emoji={item.foto} size={58} />

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#24325C",
            fontSize: "16px",
            fontWeight: "900",
            marginBottom: "4px",
          }}
        >
          {item.nombre}
        </div>

        <div
          style={{
            color: "#6F7897",
            fontSize: "13px",
            marginBottom: "4px",
          }}
        >
          {item.rol} · {item.edad}
        </div>

        <div
          style={{
            color: "#7C86A8",
            fontSize: "13px",
          }}
        >
          {item.detalle}
        </div>
      </div>

      <button
        style={{
          border: "1px solid #EEE7FA",
          background: "#FFFFFF",
          color: "#7D73E6",
          borderRadius: "14px",
          padding: "11px 15px",
          fontSize: "14px",
          fontWeight: "900",
          cursor: "pointer",
        }}
      >
        Cancelar
      </button>
    </div>
  );
}

function BannerConecta() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #F4EEFF 100%)",
        border: "1px solid #EEE7FA",
        borderRadius: "24px",
        padding: "22px",
        marginBottom: "24px",
        position: "relative",
        overflow: "hidden",
        minHeight: "150px",
      }}
    >
      <div style={{ maxWidth: "58%" }}>
        <div
          style={{
            fontSize: "22px",
            fontWeight: "900",
            color: "#24325C",
            marginBottom: "12px",
          }}
        >
          No estás solo/a 💜
        </div>

        <div
          style={{
            fontSize: "15px",
            color: "#5F6788",
            lineHeight: "1.65",
          }}
        >
          Conecta con cuidadores que entienden tu día a día y comparte experiencias.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: "18px",
          bottom: "10px",
          fontSize: "82px",
          opacity: 0.25,
        }}
      >
        🫂
      </div>
    </div>
  );
}

function InviteCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #F9F5FF 0%, #FFFFFF 100%)",
        border: "1px solid #EEE7FA",
        borderRadius: "24px",
        padding: "18px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        margin: "22px 0",
      }}
    >
      <div
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "#F1ECFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          flexShrink: 0,
        }}
      >
        👥
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#7D73E6",
            fontWeight: "900",
            fontSize: "18px",
            marginBottom: "5px",
          }}
        >
          Invita a más cuidadores
        </div>

        <div
          style={{
            color: "#6F7897",
            fontSize: "14px",
            lineHeight: "1.45",
          }}
        >
          Comparte Vocalink con otras personas que puedan beneficiarse.
        </div>
      </div>

      <button
        style={{
          border: "none",
          background: "linear-gradient(135deg, #8C7CF2, #6C5CE7)",
          color: "white",
          borderRadius: "14px",
          padding: "13px 16px",
          fontWeight: "900",
          cursor: "pointer",
        }}
      >
        Invitar
      </button>
    </div>
  );
}

function ChatPreview({ onBack }) {
  return (
    <div>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #EEE7FA",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(155,132,192,0.06)",
        }}
      >
        <div
          style={{
            padding: "14px",
            borderBottom: "1px solid #F1ECF8",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={onBack}
            style={{
              border: "none",
              background: "transparent",
              color: "#7D73E6",
              fontSize: "26px",
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <Avatar emoji="👩🏻" size={48} />

          <div style={{ flex: 1 }}>
            <div style={{ color: "#24325C", fontWeight: "900", fontSize: "17px" }}>
              María G.
            </div>
            <div style={{ color: "#6F7897", fontSize: "13px" }}>En línea</div>
          </div>

          <span style={{ fontSize: "22px", color: "#7D73E6" }}>☎</span>
          <span style={{ fontSize: "22px", color: "#7D73E6" }}>⋯</span>
        </div>

        <div style={{ padding: "18px", background: "#FEFCFF" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                background: "#F1ECFF",
                color: "#8B80C8",
                borderRadius: "999px",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: "800",
              }}
            >
              Hoy
            </span>
          </div>

          <Bubble left>
            ¡Hola! Vi tu publicación sobre manejo del estrés en las tardes.
            ¿Qué actividades te han funcionado mejor? 😊
          </Bubble>

          <Bubble>
            ¡Hola María! 😊 A nosotros nos ha servido mucho la respiración guiada
            y los juegos sensoriales.
          </Bubble>

          <Bubble left>
            Qué interesante, ¿podrías compartir más sobre los juegos sensoriales que hacen? 🙏
          </Bubble>

          <Bubble>
            Claro, te comparto una lista que nos ha funcionado muy bien:
            <br />
            <br />
            • Burbujas
            <br />
            • Masas sensoriales
            <br />
            • Cajas sensoriales
            <br />
            • Pintura con dedos
          </Bubble>

          <Bubble left>¡Muchas gracias! 🙌 Lo voy a probar con mi hijo hoy.</Bubble>
        </div>

        <div
          style={{
            padding: "12px",
            display: "flex",
            gap: "10px",
            borderTop: "1px solid #F1ECF8",
          }}
        >
          <button
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "none",
              background: "#F1ECFF",
              color: "#7D73E6",
              fontSize: "24px",
            }}
          >
            +
          </button>

          <input
            placeholder="Escribe un mensaje..."
            style={{
              flex: 1,
              border: "1px solid #EEE7FA",
              borderRadius: "999px",
              padding: "0 16px",
              outline: "none",
              color: "#24325C",
            }}
          />

          <button
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "none",
              background: "#7D73E6",
              color: "white",
              fontSize: "20px",
            }}
          >
            🎙️
          </button>
        </div>
      </div>
    </div>
  );
}

function Bubble({ children, left }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: left ? "flex-start" : "flex-end",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          maxWidth: "78%",
          background: left ? "#FFFFFF" : "#F1ECFF",
          border: left ? "1px solid #EEE7FA" : "none",
          color: "#24325C",
          padding: "13px 15px",
          borderRadius: left ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Mensajes({ onAbrirChat }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(155,132,192,0.06)",
      }}
    >
      <div
        style={{
          padding: "18px",
          borderBottom: "1px solid #F1ECF8",
        }}
      >
        <div
          style={{
            color: "#24325C",
            fontSize: "20px",
            fontWeight: "900",
            marginBottom: "14px",
          }}
        >
          Mensajes
        </div>

        <input
          placeholder="Buscar mensajes..."
          style={{
            width: "100%",
            border: "1px solid #EEE7FA",
            borderRadius: "14px",
            padding: "13px 14px",
            fontSize: "14px",
            outline: "none",
            marginBottom: "12px",
          }}
        />

        <div style={{ display: "flex", gap: "8px" }}>
          {["Todos", "No leídos", "Grupos"].map((item, index) => (
            <span
              key={item}
              style={{
                background: index === 0 ? "#F1ECFF" : "#FFFFFF",
                color: index === 0 ? "#7D73E6" : "#6F7897",
                border: "1px solid #EEE7FA",
                borderRadius: "999px",
                padding: "7px 11px",
                fontSize: "13px",
                fontWeight: "800",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {mensajes.map((msg) => (
        <button
          key={msg.id}
          onClick={onAbrirChat}
          style={{
            width: "100%",
            border: "none",
            background: msg.activo ? "#F8F4FF" : "#FFFFFF",
            padding: "14px 16px",
            display: "flex",
            gap: "12px",
            textAlign: "left",
            borderBottom: "1px solid #F1ECF8",
            cursor: "pointer",
          }}
        >
          <Avatar emoji={msg.foto} size={50} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                style={{
                  color: "#24325C",
                  fontWeight: "900",
                  fontSize: "14px",
                }}
              >
                {msg.nombre}
              </div>

              <div style={{ color: "#8B90A8", fontSize: "12px" }}>{msg.hora}</div>
            </div>

            <div
              style={{
                color: "#6F7897",
                fontSize: "13px",
                marginTop: "4px",
                lineHeight: "1.35",
              }}
            >
              {msg.preview}
            </div>
          </div>

          {msg.unread && (
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#8C7CF2",
                color: "white",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "900",
                alignSelf: "center",
              }}
            >
              {msg.unread}
            </div>
          )}
        </button>
      ))}

      <div
        style={{
          padding: "16px",
          background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "28px" }}>👥</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#7D73E6", fontWeight: "900" }}>Crea un grupo</div>
          <div style={{ color: "#6F7897", fontSize: "13px", marginTop: "3px" }}>
            Conéctate con varios cuidadores a la vez.
          </div>
        </div>
        <div style={{ color: "#7D73E6", fontSize: "24px" }}>›</div>
      </div>
    </div>
  );
}

export default function Conecta() {
  const [vista, setVista] = useState("personas");

  if (vista === "chat") {
    return <ChatPreview onBack={() => setVista("personas")} />;
  }

  return (
    <>
      <BannerConecta />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setVista("personas")}
          style={{
            flex: 1,
            border: "1px solid #EEE7FA",
            background: vista === "personas" ? "#F1ECFF" : "#FFFFFF",
            color: vista === "personas" ? "#7D73E6" : "#6F7897",
            borderRadius: "16px",
            padding: "12px",
            fontWeight: "900",
          }}
        >
          Cuidadores
        </button>

        <button
          onClick={() => setVista("mensajes")}
          style={{
            flex: 1,
            border: "1px solid #EEE7FA",
            background: vista === "mensajes" ? "#F1ECFF" : "#FFFFFF",
            color: vista === "mensajes" ? "#7D73E6" : "#6F7897",
            borderRadius: "16px",
            padding: "12px",
            fontWeight: "900",
          }}
        >
          Mensajes
        </button>
      </div>

      {vista === "mensajes" ? (
        <Mensajes onAbrirChat={() => setVista("chat")} />
      ) : (
        <>
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
                fontSize: "20px",
                margin: 0,
              }}
            >
              Cuidadores cerca de ti
            </h2>

            <div
              style={{
                color: "#7D73E6",
                fontWeight: "800",
                fontSize: "14px",
              }}
            >
              Ver mapa 📍
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cuidadores.map((cuidador) => (
              <CuidadorCard key={cuidador.id} cuidador={cuidador} />
            ))}
          </div>

          <InviteCard />

          <h2
            style={{
              color: "#24325C",
              fontSize: "20px",
              marginBottom: "14px",
            }}
          >
            Conexiones pendientes
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pendientes.map((item) => (
              <PendienteCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
}