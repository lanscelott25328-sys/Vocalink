export default function SolicitudCard() {
  const solicitarRecurso = () => {
    alert("Solicitud enviada. Pronto te recomendaremos nuevos recursos.");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
        border: "1px solid #EEE7FA",
        borderRadius: "24px",
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
            fontSize: "17px",
            marginBottom: "5px",
          }}
        >
          ¿No encuentras lo que buscas?
        </div>

        <div
          style={{
            color: "#6F7897",
            fontSize: "14px",
            lineHeight: "1.45",
          }}
        >
          Cuéntanos qué necesitas y te ayudaremos a encontrarlo.
        </div>
      </div>

      <button
        onClick={solicitarRecurso}
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
        Solicitar ›
      </button>
    </div>
  );
}