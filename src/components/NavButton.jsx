export default function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "#F3ECFB" : "transparent",
        color: active ? "#A48FD6" : "#8D8D99",
        border: "none",
        borderRadius: "16px",
        padding: "10px 16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}