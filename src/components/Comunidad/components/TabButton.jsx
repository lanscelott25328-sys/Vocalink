export default function TabButton({
  active,
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        minWidth: 120,
        border: "1px solid #EEE6FA",
        background: active ? "#F1ECFF" : "#FFFFFF",
        color: active ? "#7D73E6" : "#24325C",
        borderRadius: 18,
        padding: "15px 14px",
        fontWeight: active ? 800 : 700,
        fontSize: 15,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}