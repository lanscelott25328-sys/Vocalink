export default function CategoriaButton({ item, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        minWidth: "86px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          background: active ? item.color : `${item.color}22`,
          color: active ? "#FFFFFF" : item.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          boxShadow: active ? "0 10px 22px rgba(125,115,230,0.25)" : "none",
        }}
      >
        {item.icon}
      </div>

      <div
        style={{
          color: active ? "#7D73E6" : "#6F7897",
          fontSize: "13px",
          fontWeight: active ? "900" : "600",
          textAlign: "center",
          lineHeight: "1.25",
        }}
      >
        {item.label}
      </div>
    </button>
  );
}