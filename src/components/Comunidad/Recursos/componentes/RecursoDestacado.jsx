export default function RecursoDestacado() {
  const abrirGuia = () => {
    window.open(
      "https://www.google.com/search?q=guia+para+manejar+estres+como+cuidador",
      "_blank"
    );
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)",
          border: "1px solid #EEE7FA",
          borderRadius: "24px",
          padding: "22px",
          minHeight: "210px",
          position: "relative",
          overflow: "hidden",
          marginBottom: "12px",
        }}
      >
        <div style={{ maxWidth: "58%" }}>
          <div
            style={{
              color: "#7D73E6",
              fontSize: "13px",
              fontWeight: "900",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Recurso destacado
          </div>

          <div
            style={{
              color: "#24325C",
              fontSize: "20px",
              fontWeight: "900",
              lineHeight: "1.35",
              marginBottom: "14px",
            }}
          >
            Guía para manejar el estrés como cuidador
          </div>

          <div
            style={{
              color: "#6F7897",
              fontSize: "14px",
              lineHeight: "1.55",
              marginBottom: "18px",
            }}
          >
            Estrategias prácticas para cuidar de ti mientras cuidas a tu ser querido.
          </div>

          <button
            onClick={abrirGuia}
            style={{
              border: "none",
              background: "#F1ECFF",
              color: "#7D73E6",
              borderRadius: "14px",
              padding: "13px 18px",
              fontWeight: "900",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Ver guía ›
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            right: "16px",
            bottom: "4px",
            fontSize: "92px",
            opacity: 0.25,
          }}
        >
          🧘‍♀️
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "7px",
          marginBottom: "24px",
        }}
      >
        {[0, 1, 2, 3, 4].map((item) => (
          <span
            key={item}
            style={{
              width: item === 0 ? "10px" : "8px",
              height: item === 0 ? "10px" : "8px",
              borderRadius: "50%",
              background: item === 0 ? "#7D73E6" : "#E6DFF7",
            }}
          />
        ))}
      </div>
    </>
  );
}