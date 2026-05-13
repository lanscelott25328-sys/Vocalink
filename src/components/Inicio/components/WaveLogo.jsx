export default function WaveLogo() {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {[14, 24, 38, 24, 14].map((height, index) => (
        <span
          key={index}
          style={{
            width: 5,
            height,
            borderRadius: 999,
            background:
              "linear-gradient(180deg, #B79CF7, #7FA8F8)",
          }}
        />
      ))}
    </div>
  );
}