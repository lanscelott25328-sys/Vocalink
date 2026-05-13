export default function GroupCard({
  icon,
  title,
  members,
}) {
  return (
    <div
      style={{
        minWidth: 220,
        background: "#FFFFFF",
        border: "1px solid #EEE7FA",
        borderRadius: 24,
        padding: 18,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 18,
          background: "#F1ECFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 25,
          marginBottom: 14,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 900,
          color: "#24325C",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#7D73E6",
          fontWeight: 800,
        }}
      >
        {members} miembros
      </div>
    </div>
  );
}