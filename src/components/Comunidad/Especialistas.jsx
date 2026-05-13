import { useState } from "react";

const categorias = [
  { id: "todos", icon: "👥", label: "Todos", color: "#7D73E6" },
  { id: "psicologia", icon: "🧠", label: "Psicología", color: "#58C7C5" },
  { id: "terapia", icon: "✋", label: "Terapia ocupacional", color: "#F2A66D" },
  { id: "fono", icon: "💬", label: "Fonoaudiología", color: "#70A7F7" },
  { id: "psico", icon: "📖", label: "Psicopedagogía", color: "#F18BC0" },
  { id: "nutricion", icon: "🍏", label: "Nutrición", color: "#9BCF78" },
];

const especialistas = [
  {
    nombre: "Dra. Camila Rojas",
    area: "Psicóloga clínica",
    rating: "4.9",
    resenas: "128 reseñas",
    experiencia: "8 años de experiencia",
    tags: ["Ansiedad", "Manejo emocional", "Estrés"],
    precio: "$25.000",
    avatar: "👩🏻‍⚕️",
  },
  {
    nombre: "Tomás Medina",
    area: "Terapeuta ocupacional",
    rating: "4.8",
    resenas: "96 reseñas",
    experiencia: "6 años de experiencia",
    tags: ["Integración sensorial", "Autonomía", "Rutinas"],
    precio: "$30.000",
    avatar: "👨🏻‍⚕️",
  },
  {
    nombre: "Lic. Valentina Pérez",
    area: "Fonoaudióloga",
    rating: "4.9",
    resenas: "74 reseñas",
    experiencia: "7 años de experiencia",
    tags: ["Lenguaje", "Comunicación", "Habla"],
    precio: "$22.000",
    avatar: "👩🏽‍⚕️",
  },
];

function CategoriaButton({ item, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        minWidth: "92px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: active ? item.color : `${item.color}22`,
          color: active ? "#FFFFFF" : item.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "27px",
          boxShadow: active ? "0 10px 22px rgba(125,115,230,0.25)" : "none",
        }}
      >
        {item.icon}
      </div>

      <div
        style={{
          color: active ? "#7D73E6" : "#6F7897",
          fontSize: "13px",
          fontWeight: active ? "900" : "600",
          textAlign: "center",
          lineHeight: "1.25",
        }}
      >
        {item.label}
      </div>
    </button>
  );
}

function EspecialistaCard({ especialista }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(155,132,192,0.06)",
      }}
    >
      <div
        style={{
          padding: "18px",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            background: "#F1ECFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "38px",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {especialista.avatar}

          <span
            style={{
              position: "absolute",
              right: "4px",
              bottom: "6px",
              width: "17px",
              height: "17px",
              borderRadius: "50%",
              background: "#43C879",
              border: "3px solid white",
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                color: "#24325C",
                fontSize: "18px",
                fontWeight: "900",
              }}
            >
              {especialista.nombre}
            </div>

            <button
              style={{
                border: "none",
                background: "transparent",
                color: "#9C8EF5",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ♡
            </button>
          </div>

          <div
            style={{
              color: "#7D73E6",
              fontSize: "15px",
              fontWeight: "800",
              marginBottom: "6px",
            }}
          >
            {especialista.area}
          </div>

          <div
            style={{
              color: "#6F7897",
              fontSize: "14px",
              marginBottom: "4px",
            }}
          >
            ⭐ {especialista.rating} ({especialista.resenas})
          </div>

          <div
            style={{
              color: "#6F7897",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            {especialista.experiencia}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {especialista.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#F3EEFF",
                  color: "#7D73E6",
                  borderRadius: "999px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #F1ECF8",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            color: "#6F7897",
            fontSize: "14px",
            fontWeight: "700",
            flex: 1,
          }}
        >
          <span style={{ color: "#43C879" }}>●</span> Online
        </div>

        <div
          style={{
            color: "#6F7897",
            fontSize: "14px",
            fontWeight: "700",
            flex: 1,
          }}
        >
          🪙 Desde {especialista.precio}
        </div>

        <button
          style={{
            border: "none",
            background: "linear-gradient(135deg, #8C7CF2, #6C5CE7)",
            color: "#FFFFFF",
            borderRadius: "12px",
            padding: "11px 18px",
            fontWeight: "900",
            fontSize: "14px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Ver perfil
        </button>
      </div>
    </div>
  );
}

export default function Especialistas() {
  const [categoria, setCategoria] = useState("todos");

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
          border: "1px solid #EEE7FA",
          borderRadius: "24px",
          padding: "22px",
          display: "flex",
          gap: "18px",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "26px",
            background: "#EEE8FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            flexShrink: 0,
          }}
        >
          🛡️
        </div>

        <div>
          <div
            style={{
              color: "#24325C",
              fontSize: "20px",
              fontWeight: "900",
              marginBottom: "8px",
            }}
          >
            Profesionales que te acompañan
          </div>

          <div
            style={{
              color: "#6F7897",
              fontSize: "15px",
              lineHeight: "1.55",
              marginBottom: "10px",
            }}
          >
            Encuentra especialistas verificados que pueden ayudarte con
            orientación personalizada.
          </div>

          <div
            style={{
              color: "#7D73E6",
              fontSize: "14px",
              fontWeight: "900",
            }}
          >
            🛡️ Todos nuestros especialistas están verificados
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "12px",
          marginBottom: "22px",
        }}
      >
        {categorias.map((item) => (
          <CategoriaButton
            key={item.id}
            item={item}
            active={categoria === item.id}
            onClick={() => setCategoria(item.id)}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
              color: "#9B9AB4",
            }}
          >
            🔍
          </span>

          <input
            placeholder="Buscar especialista, área o problema..."
            style={{
              width: "100%",
              border: "1px solid #EEE7FA",
              borderRadius: "16px",
              padding: "15px 15px 15px 46px",
              outline: "none",
              fontSize: "14px",
              color: "#24325C",
              background: "#FFFFFF",
            }}
          />
        </div>

        <button
          style={{
            border: "1px solid #EEE7FA",
            background: "#FFFFFF",
            color: "#7D73E6",
            borderRadius: "16px",
            padding: "0 16px",
            fontSize: "14px",
            fontWeight: "900",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          ⛃ Filtros
        </button>
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
            fontSize: "20px",
            margin: 0,
            fontWeight: "900",
          }}
        >
          Especialistas destacados
        </h2>

        <div
          style={{
            color: "#7D73E6",
            fontWeight: "800",
            fontSize: "14px",
          }}
        >
          Ver todos ›
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "22px",
        }}
      >
        {especialistas.map((especialista) => (
          <EspecialistaCard
            key={especialista.nombre}
            especialista={especialista}
          />
        ))}
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
          border: "1px solid #EEE7FA",
          borderRadius: "22px",
          padding: "18px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#F1ECFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            flexShrink: 0,
          }}
        >
          🎧
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#7D73E6",
              fontWeight: "900",
              fontSize: "16px",
              marginBottom: "5px",
            }}
          >
            ¿Necesitas ayuda para encontrar al especialista ideal?
          </div>

          <div
            style={{
              color: "#6F7897",
              fontSize: "13px",
              lineHeight: "1.45",
            }}
          >
            Nuestro equipo puede orientarte sin costo.
          </div>
        </div>

        <button
          style={{
            border: "none",
            background: "linear-gradient(135deg, #8C7CF2, #6C5CE7)",
            color: "#FFFFFF",
            borderRadius: "14px",
            padding: "13px 16px",
            fontWeight: "900",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Contactar 💬
        </button>
      </div>
    </>
  );
}