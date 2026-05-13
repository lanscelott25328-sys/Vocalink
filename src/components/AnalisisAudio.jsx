import { useState } from "react";
import { analizarAudio } from "../services/emotionService";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

function AnalisisAudio() {
  const [audioFile, setAudioFile] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const datosPorEmocion = {
    happy: {
      emocion: "calma",
      emoji: "🙂",
      mensaje: "Mateo podría estar tranquilo",
      recomendacion:
        "Mantén la actividad actual y observa qué estímulos favorecen su bienestar.",
      color: "#E3F3E0",
    },
    calm: {
      emocion: "calma",
      emoji: "🙂",
      mensaje: "Mateo podría estar en calma",
      recomendacion:
        "Mantén el entorno actual y continúa observando su respuesta.",
      color: "#E3F3E0",
    },
    neutral: {
      emocion: "neutral",
      emoji: "😐",
      mensaje: "Mateo podría estar estable",
      recomendacion:
        "Continúa observando su comportamiento y mantén una rutina tranquila.",
      color: "#ECEAF4",
    },
    sad: {
      emocion: "tristeza",
      emoji: "😕",
      mensaje: "Mateo podría estar incómodo",
      recomendacion: "Reducir estímulos del entorno y usar apoyo visual.",
      color: "#F9DEDD",
    },
    angry: {
      emocion: "estrés",
      emoji: "😣",
      mensaje: "Mateo podría estar estresado",
      recomendacion:
        "Habla con voz suave, reduce estímulos y revisa si hay algo que le incomoda.",
      color: "#FFF2CF",
    },
    fear: {
      emocion: "miedo",
      emoji: "😟",
      mensaje: "Mateo podría sentirse inseguro",
      recomendacion:
        "Bríndale seguridad, evita movimientos bruscos y acompáñalo con calma.",
      color: "#FBE8D8",
    },
    disgust: {
      emocion: "molestia",
      emoji: "😖",
      mensaje: "Mateo podría estar molesto",
      recomendacion:
        "Revisa posibles estímulos desagradables como ruido, textura, comida o temperatura.",
      color: "#F6D9D9",
    },
    surprise: {
      emocion: "sorpresa",
      emoji: "😮",
      mensaje: "Mateo reaccionó a un estímulo",
      recomendacion:
        "Identifica qué cambió en el entorno y dale tiempo para regularse.",
      color: "#EEE4FA",
    },
    unknown: {
      emocion: "no identificada",
      emoji: "🫤",
      mensaje: "No se pudo interpretar con claridad",
      recomendacion:
        "Intenta subir un audio más claro o con menos ruido de fondo.",
      color: "#F2F2F5",
    },
  };

  const handleAnalizar = async () => {
    if (!audioFile) {
      setError("Selecciona un archivo de audio.");
      return;
    }

    try {
      setCargando(true);
      setError("");
      setResultado(null);

      const data = await analizarAudio(audioFile);

      if (data.error) {
        setError(data.error);
        return;
      }

      setResultado(data);

      const usuario = auth.currentUser;

      if (usuario) {
        const info =
          datosPorEmocion[data.emotion] || datosPorEmocion.unknown;

        await addDoc(collection(db, "historialAudios"), {
          uid: usuario.uid,
          emotionOriginal: data.emotion,
          emocion: info.emocion,
          mensaje: info.mensaje,
          recomendacion: info.recomendacion,
          archivo: audioFile.name,
          fecha: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo analizar el audio.");
    } finally {
      setCargando(false);
    }
  };

  const info =
    resultado && (datosPorEmocion[resultado.emotion] || datosPorEmocion.unknown);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E1F2",
            borderRadius: "16px",
            padding: "14px",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "700",
              color: "#6F6A83",
              marginBottom: "10px",
            }}
          >
            Seleccionar archivo de audio
          </label>

          <input
            type="file"
            accept=".wav,audio/wav"
            onChange={(e) => setAudioFile(e.target.files[0])}
            style={{
              width: "100%",
              fontSize: "13px",
              color: "#5F5A72",
            }}
          />

          {audioFile && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#7C7890",
                wordBreak: "break-word",
              }}
            >
              Archivo: {audioFile.name}
            </div>
          )}
        </div>

        <button
          onClick={handleAnalizar}
          disabled={cargando}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background: cargando ? "#CDBEEB" : "#A48FD6",
            color: "#FFFFFF",
            fontWeight: "800",
            fontSize: "15px",
            cursor: cargando ? "default" : "pointer",
            boxShadow: "0 8px 18px rgba(164, 143, 214, 0.25)",
          }}
        >
          {cargando ? "Analizando audio..." : "Analizar audio"}
        </button>
      </div>

      {error && (
        <div
          style={{
            marginTop: "14px",
            background: "#FCEAEA",
            border: "1px solid #F4CACA",
            color: "#A04B4B",
            borderRadius: "16px",
            padding: "14px",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {error}
        </div>
      )}

      {info && (
        <div
          style={{
            marginTop: "16px",
            background: info.color,
            borderRadius: "20px",
            padding: "22px 18px",
            textAlign: "center",
            border: "1px solid #ECE3F6",
          }}
        >
          <div style={{ fontSize: "38px", marginBottom: "8px" }}>
            {info.emoji}
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#2F3443",
              marginBottom: "12px",
              lineHeight: "1.35",
            }}
          >
            {info.mensaje}
          </div>

          <div
            style={{
              fontSize: "15px",
              color: "#6F7282",
              marginBottom: "16px",
            }}
          >
            Emoción detectada: <strong>{info.emocion}</strong>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "16px",
              color: "#4E5060",
              fontSize: "15px",
              lineHeight: "1.5",
            }}
          >
            <strong>Recomendación</strong>
            <br />
            {info.recomendacion}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalisisAudio;