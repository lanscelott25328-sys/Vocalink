export default function ConnectCard({
  name,
  city,
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: 24,
        padding: 18,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "#EDE7FF",
          }}
        />

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 900,
              color: "#24325C",
            }}
          >
            {name}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#6F7897",
            }}
          >
            📍 {city}
          </div>
        </div>

        <button
          style={{
            border: "none",
            borderRadius: 14,
            padding: "10px 14px",
            background:
              "linear-gradient(135deg,#B79CF7,#7FA8F8)",
            color: "white",
            fontWeight: 800,
          }}
        >
          Conectar
        </button>
      </div>
    </div>
  );
}