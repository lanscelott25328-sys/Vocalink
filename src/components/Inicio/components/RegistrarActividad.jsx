import { useState } from "react";

export default function RegistrarActividad() {
  const [actividad, setActividad] = useState("");
  const [abierto, setAbierto] = useState(false);

  function guardarActividad() {
    if (!actividad.trim()) return;
    console.log("Actividad registrada:", actividad);
    setActividad("");
    setAbierto(false);
  }

  return (
    <div
      style={{
        background: "#FFFFFF", borderRadius: 24, padding: 18,
        marginBottom: 20, border: "1px solid #EEE6FA",
        boxShadow: "0 4px 16px rgba(125,115,230,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56, height: 56, borderRadius: 18,
            background: "linear-gradient(135deg, #B79CF7 0%, #7FA8F8 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
          }}
        >
          📋
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ color: "#7D73E6", fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
            Registrar actividad
          </div>
          <div style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.4 }}>
            Registra lo que está haciendo tu pequeño para asociarlo con sus emociones.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => setAbierto(!abierto)}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #B79CF7 0%, #7FA8F8 100%)",
              border: "none", color: "#FFFFFF", fontSize: 22,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 4px 12px rgba(125,115,230,0.3)",
            }}
          >
            {abierto ? "×" : "+"}
          </button>
          <span style={{ color: "#C8C2E8", fontSize: 20, lineHeight: 1 }}>›</span>
        </div>
      </div>

      {abierto && (
        <div style={{ marginTop: 16 }}>
          <input
            value={actividad}
            onChange={(e) => setActividad(e.target.value)}
            placeholder="Ej: jugando, comiendo, en clase..."
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 14,
              border: "1px solid #EEE6FA", outline: "none", fontSize: 14,
              marginBottom: 10, background: "#FAFBFF", boxSizing: "border-box",
            }}
          />
          <button
            onClick={guardarActividad}
            style={{
              width: "100%", border: "none", borderRadius: 14, padding: "12px",
              background: "linear-gradient(135deg, #B79CF7 0%, #7FA8F8 100%)",
              color: "#FFFFFF", fontWeight: 700, fontSize: 15, cursor: "pointer",
            }}
          >
            Guardar actividad
          </button>
        </div>
      )}
    </div>
  );
}