export default function HighlightCard({
  type,
  title,
}) {
  return (
    <div
      style={{
        minWidth: 230,
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: 24,
        padding: 18,
      }}
    >
      <div
        style={{
          color: "#7D73E6",
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        {type}
      </div>

      <div
        style={{
          fontWeight: 900,
          color: "#24325C",
          lineHeight: 1.45,
        }}
      >
        {title}
      </div>
    </div>
  );
}