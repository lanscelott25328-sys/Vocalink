import { FaceIcon, WaveBar } from "../../shared/FaceIcon";

const EMOCIONES = {
  happy:       { mensaje: "Tu pequeño se siente feliz y contento", gradiente: "linear-gradient(135deg, #5ECFCB 0%, #7FD48F 100%)", bg: "linear-gradient(135deg, #D0F8E8 0%, #C8F0D8 100%)" },
  feliz:       { mensaje: "Tu pequeño se siente feliz y contento", gradiente: "linear-gradient(135deg, #5ECFCB 0%, #7FD48F 100%)", bg: "linear-gradient(135deg, #D0F8E8 0%, #C8F0D8 100%)" },
  calm:        { mensaje: "Tu pequeño está en calma, todo bien", gradiente: "linear-gradient(135deg, #5ECFCB 0%, #9B8AF0 100%)", bg: "linear-gradient(135deg, #D8D0F8 0%, #C4D4F8 100%)" },
  calma:       { mensaje: "Tu pequeño está en calma, todo bien", gradiente: "linear-gradient(135deg, #5ECFCB 0%, #9B8AF0 100%)", bg: "linear-gradient(135deg, #D8D0F8 0%, #C4D4F8 100%)" },
  tranquilo:   { mensaje: "Tu pequeño está en calma, todo bien", gradiente: "linear-gradient(135deg, #5ECFCB 0%, #9B8AF0 100%)", bg: "linear-gradient(135deg, #D8D0F8 0%, #C4D4F8 100%)" },
  neutral:     { mensaje: "Tu pequeño está en un momento estable", gradiente: "linear-gradient(135deg, #A0B4CC 0%, #8CA8C0 100%)", bg: "linear-gradient(135deg, #E8EFF8 0%, #DDE8F4 100%)" },
  neutro:      { mensaje: "Tu pequeño está en un momento estable", gradiente: "linear-gradient(135deg, #A0B4CC 0%, #8CA8C0 100%)", bg: "linear-gradient(135deg, #E8EFF8 0%, #DDE8F4 100%)" },
  sad:         { mensaje: "Tu pequeño podría estar triste. Dale un abrazo", gradiente: "linear-gradient(135deg, #7BA8D4 0%, #5880B4 100%)", bg: "linear-gradient(135deg, #DCE8F8 0%, #C8D8F4 100%)" },
  triste:      { mensaje: "Tu pequeño podría estar triste. Dale un abrazo", gradiente: "linear-gradient(135deg, #7BA8D4 0%, #5880B4 100%)", bg: "linear-gradient(135deg, #DCE8F8 0%, #C8D8F4 100%)" },
  fear:        { mensaje: "Tu pequeño parece sentir miedo. Acompáñalo", gradiente: "linear-gradient(135deg, #C49CF4 0%, #A070D8 100%)", bg: "linear-gradient(135deg, #EDE0FF 0%, #E0D0FF 100%)" },
  miedo:       { mensaje: "Tu pequeño parece sentir miedo. Acompáñalo", gradiente: "linear-gradient(135deg, #C49CF4 0%, #A070D8 100%)", bg: "linear-gradient(135deg, #EDE0FF 0%, #E0D0FF 100%)" },
  angry:       { mensaje: "Tu pequeño está molesto. Mantén la calma", gradiente: "linear-gradient(135deg, #F4906A 0%, #E06040 100%)", bg: "linear-gradient(135deg, #FFE0D4 0%, #FFD0C0 100%)" },
  enojo:       { mensaje: "Tu pequeño está molesto. Mantén la calma", gradiente: "linear-gradient(135deg, #F4906A 0%, #E06040 100%)", bg: "linear-gradient(135deg, #FFE0D4 0%, #FFD0C0 100%)" },
  disgust:     { mensaje: "Tu pequeño expresa malestar. Revisa su entorno", gradiente: "linear-gradient(135deg, #D4A44C 0%, #B08030 100%)", bg: "linear-gradient(135deg, #FFF0D4 0%, #FFE8C0 100%)" },
  inquieto:    { mensaje: "Tu pequeño está inquieto. Acércate a él", gradiente: "linear-gradient(135deg, #F0A060 0%, #D07840 100%)", bg: "linear-gradient(135deg, #FFE8D4 0%, #FFD8C0 100%)" },
  surprised:   { mensaje: "Tu pequeño está sorprendido. Atiéndelo", gradiente: "linear-gradient(135deg, #F4C44C 0%, #E0A020 100%)", bg: "linear-gradient(135deg, #FFF4CC 0%, #FFE8A0 100%)" },
  sorpresa:    { mensaje: "Tu pequeño está sorprendido. Atiéndelo", gradiente: "linear-gradient(135deg, #F4C44C 0%, #E0A020 100%)", bg: "linear-gradient(135deg, #FFF4CC 0%, #FFE8A0 100%)" },
  sorprendido: { mensaje: "Tu pequeño está sorprendido. Atiéndelo", gradiente: "linear-gradient(135deg, #F4C44C 0%, #E0A020 100%)", bg: "linear-gradient(135deg, #FFF4CC 0%, #FFE8A0 100%)" },
};

const DEFAULT_EMOCION = {
  mensaje: "Analizando el estado emocional...",
  gradiente: "linear-gradient(135deg, #A48FD6 0%, #8870C0 100%)",
  bg: "linear-gradient(135deg, #EDE0FF 0%, #E0D4FF 100%)",
};

export default function EstadoActual({ prediccion, onAcknowledge }) {
  if (!prediccion) {
    return (
      <div style={{ background: "linear-gradient(135deg, #E8EFF8 0%, #E0E8F4 100%)", borderRadius: 28, padding: 22, marginBottom: 20, display: "flex", gap: 20, alignItems: "center" }}>
        <FaceIcon listening size={80} />
        <div>
          <h2 style={{ margin: 0, color: "#1E2B54", fontSize: 22, fontWeight: 800 }}>Esperando análisis...</h2>
          <p style={{ margin: "6px 0 0", color: "#6B7280", fontSize: 14, lineHeight: 1.4 }}>
            Analiza un audio para ver el estado emocional de tu pequeño.
          </p>
        </div>
      </div>
    );
  }

  const key = prediccion.emotion?.toLowerCase();
  const info = EMOCIONES[key] || DEFAULT_EMOCION;
  const nombre = prediccion.emotion
    ? prediccion.emotion.charAt(0).toUpperCase() + prediccion.emotion.slice(1)
    : "Desconocido";

  return (
    <div style={{ position: "relative", background: info.bg, borderRadius: 28, padding: 22, marginBottom: 20, overflow: "hidden" }}>
      <span style={{ position: "absolute", top: 14, left: 14, color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 1, pointerEvents: "none" }}>✦</span>
      <span style={{ position: "absolute", bottom: 88, left: 18, color: "rgba(255,255,255,0.65)", fontSize: 9, lineHeight: 1, pointerEvents: "none" }}>✦</span>
      <span style={{ position: "absolute", top: 18, right: 18, color: "rgba(255,255,255,0.75)", fontSize: 9, lineHeight: 1, pointerEvents: "none" }}>✦</span>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div style={{ width: 118, height: 118, borderRadius: "50%", background: info.gradiente, padding: 4, flexShrink: 0, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <FaceIcon emotion={prediccion.emotion} size={110} />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.72)", padding: "6px 14px", borderRadius: 999, display: "inline-block", color: "#7D73E6", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
            Estado emocional actual
          </div>
          <h2 style={{ margin: 0, color: "#1E2B54", fontSize: 38, fontWeight: 800, lineHeight: 1 }}>{nombre}</h2>
          <p style={{ marginTop: 8, marginBottom: 0, color: "#5A6A8A", fontSize: 15 }}>{info.mensaje}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <WaveBar emotion={prediccion.emotion} width={220} height={22} />
      </div>

      <button onClick={onAcknowledge} style={{ marginTop: 14, width: "100%", border: "none", borderRadius: 18, padding: "13px", background: "rgba(255,255,255,0.88)", color: "#5A6A8A", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        Ya lo vi — volver a esperar
      </button>

      <div style={{ marginTop: 10, background: "rgba(255,255,255,0.72)", borderRadius: 18, padding: "10px 16px" }}>
        <p style={{ margin: 0, color: "#24325C", fontSize: 12, lineHeight: 1.45 }}>
          Vocalink es una ayuda para comprender emociones a través de la voz.{" "}
          <strong>No es un diagnóstico médico.</strong>
        </p>
      </div>
    </div>
  );
}