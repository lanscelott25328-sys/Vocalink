export function clasificarEmocion(emotion = "") {
  const e = emotion.toLowerCase();

  if (["happy", "feliz", "calm", "calma", "neutral"].includes(e)) {
    return {
      categoria: e === "neutral" ? "Neutro" : "Positivo",
      emoji: e === "neutral" ? "🌿" : "😊",
      mensaje: e === "neutral"
        ? "se encuentra estable"
        : "se siente tranquilo",
      color: "#7ED6A7",
    };
  }

  if (
    ["sad", "triste", "fear", "miedo", "angry", "enojo", "disgust"].includes(e)
  ) {
    return {
      categoria: "Alerta",
      emoji: "😟",
      mensaje: "podría necesitar acompañamiento",
      color: "#FFB84D",
    };
  }

  return {
    categoria: "En análisis",
    emoji: "🎧",
    mensaje: "está siendo monitoreado",
    color: "#A48FD6",
  };
}