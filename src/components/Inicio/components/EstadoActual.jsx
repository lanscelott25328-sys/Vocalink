export default function EstadoActual({ prediccion }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #F8F4FF 0%, #EEF5FF 100%)",
        borderRadius: 28,
        padding: 24,
        marginBottom: 20,
        border: "1px solid #EEE6FA",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            boxShadow: "0 8px 24px rgba(125,115,230,0.12)",
          }}
        >
          😊
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "#FFFFFF",
              padding: "8px 14px",
              borderRadius: 999,
              display: "inline-block",
              color: "#7D73E6",
              fontWeight: 700,
              fontSize: 13,
              marginBottom: 12,
            }}
          >
            Estado emocional actual
          </div>

          <h2
            style={{
              margin: 0,
              color: "#24325C",
              fontSize: 42,
              lineHeight: 1,
            }}
          >
            {prediccion?.emotion || "Tranquilo"}
          </h2>

          <p
            style={{
              marginTop: 12,
              color: "#6B7280",
              fontSize: 16,
            }}
          >
            Tu pequeño se siente en calma 💙
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          background: "#FFFFFF",
          borderRadius: 20,
          padding: 18,
          color: "#24325C",
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        Vocalink es una ayuda para comprender emociones
        a través de la voz.{" "}
        <strong>No es un diagnóstico médico.</strong>
      </div>
    </div>
  );
}