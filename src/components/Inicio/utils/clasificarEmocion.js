export function clasificarEmocion(emotion = "") {
  const e = (emotion ?? "").toLowerCase();

  if (["happy", "feliz", "calm", "calma", "tranquilo"].includes(e)) {
    return { categoria: "Positivo", emoji: "😊", mensaje: "se siente tranquilo", color: "#7B6FCC", bgColor: "#EDEAFF" };
  }

  if (["neutral", "neutro"].includes(e)) {
    return { categoria: "Neutro", emoji: "😐", mensaje: "se encuentra estable", color: "#E09840", bgColor: "#FFF3E0" };
  }

  if (["sad", "triste", "inquieto", "fear", "miedo", "angry", "enojo", "disgust"].includes(e)) {
    return { categoria: "Alerta", emoji: "😟", mensaje: "podría necesitar acompañamiento", color: "#E05C5C", bgColor: "#FFE8E8" };
  }

  return { categoria: "En análisis", emoji: "🎧", mensaje: "está siendo monitoreado", color: "#A48FD6", bgColor: "#F0EEFF" };
}