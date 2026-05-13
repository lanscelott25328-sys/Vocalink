import WaveLogo from "./WaveLogo";

export default function HeaderInicio() {
  return (
    <div
      style={{
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <WaveLogo />

        <h1
          style={{
            margin: 0,
            fontSize: 30,
            color: "#7D73E6",
            fontWeight: 800,
          }}
        >
          Vocalink
        </h1>
      </div>

      <h2
        style={{
          margin: 0,
          color: "#24325C",
          fontSize: 34,
          lineHeight: 1.1,
        }}
      >
        ¡Hola, cuidador! 👋
      </h2>

      <p
        style={{
          color: "#6B7280",
          fontSize: 16,
          marginTop: 12,
          lineHeight: 1.5,
        }}
      >
        Estamos aquí para apoyarte y acompañarte
        en cada momento.
      </p>
    </div>
  );
}