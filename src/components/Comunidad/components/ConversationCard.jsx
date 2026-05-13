export default function ConversationCard({
  icon,
  title,
  subtitle,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        padding: 18,
        borderBottom: "1px solid #F1ECF8",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 20,
          background: "#F3EEFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 25,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: 18,
            color: "#24325C",
            fontWeight: 800,
            marginBottom: 5,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 15,
            color: "#6F7897",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}