import { clasificarEmocion } from "../utils/clasificarEmocion";

export default function EmocionesRecientes({ registros }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ margin: 0, color: "#1E2B54", fontSize: 18, fontWeight: 800 }}>
          Emociones recientes
        </h3>
        <span style={{ color: "#7D73E6", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 2 }}>
          Ver todas <span style={{ fontSize: 18, lineHeight: 1 }}>›</span>
        </span>
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: 24, padding: "0 16px", border: "1px solid #EEE6FA" }}>
        {registros.length === 0 ? (
          <p style={{ textAlign: "center", color: "#B0B9C8", padding: "20px 0", margin: 0, fontSize: 14 }}>
            No hay registros recientes
          </p>
        ) : (
          registros.map((item, index) => {
            const info = clasificarEmocion(item.emotion);
            const fecha = item.createdAt?.toDate?.();
            let tiempoTexto = "";
            if (fecha) {
              const esHoy = fecha.toDateString() === new Date().toDateString();
              const hora = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
              tiempoTexto = esHoy
                ? `Hoy, ${hora}`
                : fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
            }
            const nombreEmocion = item.emotion
              ? item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1)
              : "—";

            return (
              <div
                key={item.id}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px 0",
                  borderBottom: index < registros.length - 1 ? "1px solid #F3EEFF" : "none",
                }}
              >
                <div
                  style={{
                    width: 46, height: 46, borderRadius: "50%", background: info.bgColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, flexShrink: 0,
                  }}
                >
                  {info.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: info.color, fontWeight: 700, fontSize: 15 }}>{nombreEmocion}</div>
                  {tiempoTexto && <div style={{ color: "#B0B9C8", fontSize: 12, marginTop: 2 }}>{tiempoTexto}</div>}
                </div>

                {item.actividad && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 14, color: "#A48FD6" }}>📅</span>
                    <div>
                      <div style={{ color: "#9CA3AF", fontSize: 11 }}>Actividad:</div>
                      <div style={{ color: "#4B5563", fontSize: 13, fontWeight: 600 }}>{item.actividad}</div>
                    </div>
                  </div>
                )}

                <span style={{ color: "#D1C9F0", fontSize: 20, lineHeight: 1, flexShrink: 0 }}>›</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}