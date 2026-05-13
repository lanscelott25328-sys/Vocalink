export default function ResumenDia({ registros = [] }) {
  const total = registros.length;

  const alertas = registros.filter((item) =>
    ["sad", "triste", "fear", "miedo", "angry", "enojo", "disgust"].includes(
      item.emotion?.toLowerCase()
    )
  ).length;

  const positivos = registros.filter((item) =>
    ["happy", "feliz", "calm", "calma", "neutral"].includes(
      item.emotion?.toLowerCase()
    )
  ).length;

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
      <h3 style={{ margin: "0 0 16px", color: "#24325C" }}>
        Resumen del día
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        <Card numero={total} texto="Registros" />
        <Card numero={positivos} texto="Estables" />
        <Card numero={alertas} texto="Alertas" />
      </div>
    </div>
  );
}

function Card({ numero, texto }) {
  return (
    <div
      style={{
        background: "#F8F4FF",
        borderRadius: 18,
        padding: 14,
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#7D73E6",
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        {numero}
      </div>

      <div
        style={{
          color: "#6B7280",
          fontSize: 12,
          marginTop: 4,
        }}
      >
        {texto}
      </div>
    </div>
  );
}