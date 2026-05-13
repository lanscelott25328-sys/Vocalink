export default function HeaderInicio() {
  return (
    <div
      style={{
        position: "relative",
        padding: "20px 16px 28px",
        background: "linear-gradient(180deg, #E4EDFF 0%, #EDE8FF 40%, #F5F2FF 100%)",
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      <svg
        style={{ position: "absolute", top: -10, right: -10, pointerEvents: "none" }}
        width="160" height="140" viewBox="0 0 160 140" fill="none"
      >
        <path d="M160 0 C115 25 138 75 105 105 C82 128 115 140 160 140 Z" fill="white" fillOpacity="0.35" />
        <path d="M160 0 C130 35 148 85 128 115 C118 130 140 140 160 140 Z" fill="white" fillOpacity="0.2" />
      </svg>

      <span style={{ position: "absolute", top: 18, right: 58, color: "#C0B0F0", fontSize: 16, fontWeight: "bold", lineHeight: 1 }}>✦</span>
      <span style={{ position: "absolute", top: 48, right: 28, color: "#A8C4FF", fontSize: 10, lineHeight: 1 }}>✦</span>

      <h2 style={{ margin: 0, color: "#1E2B54", fontSize: 30, fontWeight: 800, lineHeight: 1.1 }}>
        ¡Hola, cuidador! 👋
      </h2>
      <p style={{ color: "#6B7280", fontSize: 15, marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>
        Estamos aquí para apoyarte y acompañarte en cada momento.
      </p>
    </div>
  );
}