import { useState } from "react";

export default function RegistrarActividad() {
  const [actividad, setActividad] = useState("");

  function guardarActividad() {
    if (!actividad.trim()) return;

    console.log("Actividad registrada:", actividad);
    setActividad("");
  }

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        border: "1px solid #EEE6FA",
        boxShadow: "0 8px 24px rgba(125,115,230,0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 8px", color: "#24325C" }}>
        Registrar actividad
      </h3>

      <p
        style={{
          margin: "0 0 16px",
          color: "#6B7280",
          fontSize: 14,
          lineHeight: 1.4,
        }}
      >
        Asocia una actividad con la emoción detectada.
      </p>

      <input
        value={actividad}
        onChange={(e) => setActividad(e.target.value)}
        placeholder="Ej: jugando, comiendo, en clase..."
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 16,
          border: "1px solid #EEE6FA",
          outline: "none",
          fontSize: 14,
          marginBottom: 12,
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={guardarActividad}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 16,
          padding: "14px",
          background: "#7D73E6",
          color: "#FFFFFF",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        Guardar actividad
      </button>
    </div>
  );
}