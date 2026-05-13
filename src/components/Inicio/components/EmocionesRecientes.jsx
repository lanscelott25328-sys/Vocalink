import { clasificarEmocion } from "../utils/clasificarEmocion";

export default function EmocionesRecientes({ registros }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: 20,
        border: "1px solid #EEE6FA",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#24325C",
          }}
        >
          Emociones recientes
        </h3>

        <span
          style={{
            color: "#7D73E6",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Ver todas
        </span>
      </div>

      {registros.map((item) => {
        const info = clasificarEmocion(item.emotion);

        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 0",
              borderBottom: "1px solid #F1ECFF",
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: "#F6F2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              {info.emoji}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <strong style={{ color: "#24325C" }}>
                  {item.emotion}
                </strong>

                <span
                  style={{
                    background: "#F1ECFF",
                    color: "#7D73E6",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {info.categoria}
                </span>
              </div>

              {item.actividad && (
                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#6B7280",
                    fontSize: 13,
                  }}
                >
                  Durante: {item.actividad}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}