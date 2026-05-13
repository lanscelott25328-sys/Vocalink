const FACE_TYPE = {
  happy: "happy", feliz: "happy", calm: "happy", calma: "happy", tranquilo: "happy",
  fear: "fear", miedo: "fear",
  sad: "sad", triste: "sad",
  disgust: "disgust",
  angry: "angry", enojo: "angry", inquieto: "angry",
  neutral: "neutral", neutro: "neutral",
  surprised: "surprised", sorpresa: "surprised", sorprendido: "surprised",
};

const WAVE_COLOR = {
  happy: "#2DB887",
  fear: "#6060B8",
  sad: "#4872B8",
  disgust: "#8844BB",
  angry: "#D84468",
  neutral: "#C49028",
  surprised: "#D09020",
};

const WAVE_PATTERN = {
  happy:     [0.4, 0.7, 0.9, 0.6, 1.0, 0.8, 0.7, 0.9, 0.6, 1.0, 0.7, 0.4],
  fear:      [0.7, 1.0, 0.5, 0.9, 0.7, 0.4, 1.0, 0.6, 0.9, 0.5, 0.8, 0.7],
  sad:       [0.3, 0.5, 0.4, 0.6, 0.3, 0.4, 0.5, 0.3, 0.6, 0.4, 0.3, 0.4],
  disgust:   [0.5, 0.7, 0.9, 0.5, 0.8, 0.6, 0.9, 0.5, 0.7, 0.8, 0.6, 0.5],
  angry:     [0.8, 1.0, 0.8, 1.0, 0.9, 1.0, 0.8, 1.0, 0.9, 0.8, 1.0, 0.9],
  neutral:   [0.5, 0.5, 0.6, 0.5, 0.5, 0.6, 0.5, 0.5, 0.6, 0.5, 0.5, 0.6],
  surprised: [0.5, 0.8, 1.0, 0.8, 0.6, 1.0, 0.9, 0.6, 1.0, 0.8, 0.6, 0.5],
};

function HappyFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#C8EFE2" />
      <circle cx="24" cy="60" r="8" fill="#A8E4CC" opacity="0.5" />
      <circle cx="76" cy="60" r="8" fill="#A8E4CC" opacity="0.5" />
      <path d="M29 46 Q36 38 43 46" stroke="#2DB887" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M57 46 Q64 38 71 46" stroke="#2DB887" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M27 59 Q50 80 73 59" stroke="#2DB887" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function FearFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#D4D0EE" />
      <path d="M27 37 Q35 30 43 37" stroke="#6060B8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M57 37 Q65 30 73 37" stroke="#6060B8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="35" cy="50" rx="8" ry="6" fill="#6060B8" />
      <ellipse cx="65" cy="50" rx="8" ry="6" fill="#6060B8" />
      <circle cx="32" cy="48" r="2.5" fill="white" />
      <circle cx="62" cy="48" r="2.5" fill="white" />
      <ellipse cx="50" cy="68" rx="7" ry="9" fill="#6060B8" />
      <ellipse cx="79" cy="28" rx="3.5" ry="5" fill="#B0B0E0" transform="rotate(-15 79 28)" />
    </>
  );
}

function SadFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#C4D8EE" />
      <path d="M28 44 Q35 51 42 44" stroke="#4872B8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M58 44 Q65 51 72 44" stroke="#4872B8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="30" cy="60" rx="3" ry="4" fill="#7AAAD8" />
      <ellipse cx="70" cy="60" rx="3" ry="4" fill="#7AAAD8" />
      <path d="M30 72 Q50 60 70 72" stroke="#4872B8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function DisgustFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#DDD0EE" />
      <path d="M27 38 Q35 45 43 38" stroke="#8844BB" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M57 38 Q65 45 73 38" stroke="#8844BB" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M27 49 L43 53 L27 57" stroke="#8844BB" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M73 49 L57 53 L73 57" stroke="#8844BB" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 66 Q39 73 46 67 Q53 61 60 67 Q67 73 74 66" stroke="#8844BB" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function AngryFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#F5CCDA" />
      <path d="M26 39 L42 45" stroke="#D84468" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M58 45 L74 39" stroke="#D84468" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M27 51 L43 47 L27 55" stroke="#D84468" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M73 51 L57 47 L73 55" stroke="#D84468" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 68 Q50 59 67 68" stroke="#D84468" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function NeutralFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#EEE4C4" />
      <circle cx="35" cy="46" r="5" fill="#C49028" />
      <circle cx="65" cy="46" r="5" fill="#C49028" />
      <circle cx="33" cy="44" r="2" fill="white" />
      <circle cx="63" cy="44" r="2" fill="white" />
      <path d="M35 63 L65 63" stroke="#C49028" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  );
}

function SurprisedFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#FFF0C4" />
      <path d="M27 36 Q35 29 43 36" stroke="#D09020" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M57 36 Q65 29 73 36" stroke="#D09020" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="35" cy="48" r="8" fill="#D09020" />
      <circle cx="65" cy="48" r="8" fill="#D09020" />
      <circle cx="32" cy="45" r="3" fill="white" />
      <circle cx="62" cy="45" r="3" fill="white" />
      <ellipse cx="50" cy="67" rx="11" ry="9" fill="#D09020" />
      <ellipse cx="50" cy="67" rx="6" ry="5" fill="#FFF0C4" />
    </>
  );
}

function ListeningFace() {
  return (
    <>
      <circle cx="50" cy="50" r="50" fill="#E8EFF8" />
      <circle cx="35" cy="46" r="5" fill="#A8BAD0" />
      <circle cx="65" cy="46" r="5" fill="#A8BAD0" />
      <circle cx="33" cy="44" r="2" fill="white" />
      <circle cx="63" cy="44" r="2" fill="white" />
      <path d="M38 63 L62 63" stroke="#A8BAD0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M14 44 Q11 50 14 56" stroke="#C0CCDC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M9 40 Q5 50 9 60" stroke="#C0CCDC" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M86 44 Q89 50 86 56" stroke="#C0CCDC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M91 40 Q95 50 91 60" stroke="#C0CCDC" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  );
}

const FACE_COMPONENTS = {
  happy: <HappyFace />,
  fear: <FearFace />,
  sad: <SadFace />,
  disgust: <DisgustFace />,
  angry: <AngryFace />,
  neutral: <NeutralFace />,
  surprised: <SurprisedFace />,
  listening: <ListeningFace />,
};

export function FaceIcon({ emotion, size = 80, listening = false }) {
  const key = String(emotion ?? "").toLowerCase().trim();
  const type = listening ? "listening" : (FACE_TYPE[key] || "neutral");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {FACE_COMPONENTS[type]}
    </svg>
  );
}

export function WaveBar({ emotion, width = 120, height = 20 }) {
  const key = String(emotion ?? "").toLowerCase().trim();
  const type = FACE_TYPE[key] || "neutral";
  const color = WAVE_COLOR[type];
  const bars = WAVE_PATTERN[type];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, width, height }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${Math.round(h * 100)}%`,
            background: color,
            borderRadius: 999,
            opacity: 0.45 + 0.55 * h,
          }}
        />
      ))}
    </div>
  );
}