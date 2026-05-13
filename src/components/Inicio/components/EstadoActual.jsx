export default function EstadoActual({ prediccion }) {
  const emocion = prediccion?.emotion || "Tranquilo";

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #D8D0F8 0%, #C4D4F8 100%)",
        borderRadius: 28,
        padding: 22,
        marginBottom: 20,
        overflow: "hidden",
      }}
    >
      <span style={{ position: "absolute", top: 14, left: 14, color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 1, pointerEvents: "none" }}>✦</span>
      <span style={{ position: "absolute", bottom: 88, left: 18, color: "rgba(255,255,255,0.65)", fontSize: 9, lineHeight: 1, pointerEvents: "none" }}>✦</span>
      <span style={{ position: "absolute", top: 18, right: 18, color: "rgba(255,255,255,0.75)", fontSize: 9, lineHeight: 1, pointerEvents: "none" }}>✦</span>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div
          style={{
            width: 118, height: 118, borderRadius: "50%",
            background: "linear-gradient(135deg, #5ECFCB 0%, #9B8AF0 100%)",
            padding: 4, flexShrink: 0,
            boxShadow: "0 8px 24px rgba(94,207,203,0.35)",
          }}
        >
          <div
            style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: "#FFFFFF", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="M19 28 Q22.5 23.5 26 28" stroke="#24325C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M38 28 Q41.5 23.5 45 28" stroke="#24325C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M21 42 Q32 53 43 42" stroke="#24325C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.72)", padding: "6px 14px",
              borderRadius: 999, display: "inline-block",
              color: "#7D73E6", fontWeight: 700, fontSize: 13, marginBottom: 10,
            }}
          >
            Estado emocional actual
          </div>
          <h2 style={{ margin: 0, color: "#1E2B54", fontSize: 38, fontWeight: 800, lineHeight: 1 }}>
            {emocion}
          </h2>
          <p style={{ marginTop: 8, marginBottom: 0, color: "#5A6A8A", fontSize: 15 }}>
            Tu pequeño se siente en calma 💙
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: 18, background: "rgba(255,255,255,0.88)",
          borderRadius: 18, padding: "12px 16px",
          display: "flex", alignItems: "center", gap: 12,
        }}
      >
        <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
        <p style={{ margin: 0, color: "#24325C", fontSize: 13, lineHeight: 1.45, flex: 1 }}>
          Vocalink es una ayuda para comprender emociones a través de la voz.{" "}
          <strong>No es un diagnóstico médico.</strong>
        </p>
        <span style={{ fontSize: 22, flexShrink: 0 }}>🫶</span>
      </div>
    </div>
  );
}