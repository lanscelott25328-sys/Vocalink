function SearchIcon() {
  return <span style={{ fontSize: 24 }}>🔍</span>;
}

export default function CommunityHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 14,
        alignItems: "center",
        marginBottom: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: 26,
            background: "#F1ECFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 34,
          }}
        >
          👥
        </div>

        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#24325C",
              marginBottom: 6,
            }}
          >
            Comunidad
          </div>

          <div
            style={{
              fontSize: 15,
              color: "#6F7897",
              lineHeight: 1.5,
            }}
          >
            Conecta, comparte y aprende
            con otros cuidadores.
          </div>
        </div>
      </div>

      <button
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          border: "1px solid #EEE7FA",
          background: "#FFFFFF",
        }}
      >
        <SearchIcon />
      </button>
    </div>
  );
}