export default function RecursoItem({ recurso }) {
  const abrirRecurso = () => {
    if (recurso.url) {
      window.open(recurso.url, "_blank");
    }
  };

  return (
    <button
      onClick={abrirRecurso}
      style={{
        width: "100%",
        border: "none",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px",
        borderBottom: "1px solid #F0EAF8",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "16px",
          background: recurso.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          flexShrink: 0,
        }}
      >
        {recurso.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#24325C",
            fontSize: "15px",
            fontWeight: "900",
            lineHeight: "1.35",
            marginBottom: "5px",
          }}
        >
          {recurso.title}
        </div>

        <div
          style={{
            color: "#7C86A8",
            fontSize: "13px",
          }}
        >
          {recurso.type} · {recurso.detail}
        </div>
      </div>

      <div
        style={{
          color: "#A39DBF",
          fontSize: "24px",
          fontWeight: "800",
        }}
      >
        ›
      </div>
    </button>
  );
}