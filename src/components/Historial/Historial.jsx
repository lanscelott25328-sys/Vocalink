import { useEffect, useMemo, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";

function TrendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 16L9 11L13 15L20 8" stroke="#8C7CF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 8H16" stroke="#8C7CF2" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 8V12" stroke="#8C7CF2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function emotionMeta(rawEmotion) {
  const e = String(rawEmotion ?? "").toLowerCase().trim();
  const map = {
    happy:       { label: "Feliz",      emoji: "😊", color: "#43B39B", soft: "#E7F7F2", pillText: "#2F8A76", recommendation: "¡Excelente! Tu pequeño está contento. Refuerza este momento positivo con juego o afecto." },
    feliz:       { label: "Feliz",      emoji: "😊", color: "#43B39B", soft: "#E7F7F2", pillText: "#2F8A76", recommendation: "¡Excelente! Tu pequeño está contento. Refuerza este momento positivo con juego o afecto." },
    calm:        { label: "Calma",      emoji: "😌", color: "#5ECFCB", soft: "#E0F7F6", pillText: "#2F8A76", recommendation: "Excelente momento de bienestar. Aprovecha para reforzar hábitos y rutinas positivas." },
    calma:       { label: "Calma",      emoji: "😌", color: "#5ECFCB", soft: "#E0F7F6", pillText: "#2F8A76", recommendation: "Excelente momento de bienestar. Aprovecha para reforzar hábitos y rutinas positivas." },
    tranquilo:   { label: "Tranquilo",  emoji: "😌", color: "#5ECFCB", soft: "#E0F7F6", pillText: "#2F8A76", recommendation: "Tu pequeño está sereno. Es un buen momento para actividades creativas o de aprendizaje." },
    neutral:     { label: "Neutral",    emoji: "😐", color: "#8E80F7", soft: "#F2EEFF", pillText: "#6D5DE0", recommendation: "Estado estable. Mantén la observación del contexto y la rutina habitual." },
    neutro:      { label: "Neutral",    emoji: "😐", color: "#8E80F7", soft: "#F2EEFF", pillText: "#6D5DE0", recommendation: "Estado estable. Mantén la observación del contexto y la rutina habitual." },
    sad:         { label: "Triste",     emoji: "😢", color: "#7BA8D4", soft: "#DCE8F8", pillText: "#4A6FA8", recommendation: "Favorece la contención emocional. Acompaña con actividades tranquilas y mucho afecto." },
    triste:      { label: "Triste",     emoji: "😢", color: "#7BA8D4", soft: "#DCE8F8", pillText: "#4A6FA8", recommendation: "Favorece la contención emocional. Acompaña con actividades tranquilas y mucho afecto." },
    fear:        { label: "Miedo",      emoji: "😨", color: "#8FB3FF", soft: "#EDF4FF", pillText: "#547FD9", recommendation: "Brinda seguridad y reduce estímulos intensos. Valida la emoción con voz tranquilizadora." },
    miedo:       { label: "Miedo",      emoji: "😨", color: "#8FB3FF", soft: "#EDF4FF", pillText: "#547FD9", recommendation: "Brinda seguridad y reduce estímulos intensos. Valida la emoción con voz tranquilizadora." },
    angry:       { label: "Enojo",      emoji: "😠", color: "#F4906A", soft: "#FFE0D4", pillText: "#C05030", recommendation: "Mantén la calma. Ofrece un espacio seguro y espera a que tu pequeño se autorregule." },
    enojo:       { label: "Enojo",      emoji: "😠", color: "#F4906A", soft: "#FFE0D4", pillText: "#C05030", recommendation: "Mantén la calma. Ofrece un espacio seguro y espera a que tu pequeño se autorregule." },
    disgust:     { label: "Malestar",   emoji: "😣", color: "#D4A44C", soft: "#FFF0D4", pillText: "#A07820", recommendation: "Revisa posibles fuentes de incomodidad física o ambiental y acompaña con calma." },
    inquieto:    { label: "Inquieto",   emoji: "😟", color: "#F0A060", soft: "#FFE8D4", pillText: "#C07030", recommendation: "Tu pequeño está inquieto. Acércate, ofrece contacto físico y voz tranquilizadora." },
    surprised:   { label: "Sorpresa",   emoji: "😮", color: "#F4C44C", soft: "#FFF4CC", pillText: "#B08800", recommendation: "Observa si la respuesta se estabiliza y acompaña con indicaciones suaves y claras." },
    sorpresa:    { label: "Sorpresa",   emoji: "😮", color: "#F4C44C", soft: "#FFF4CC", pillText: "#B08800", recommendation: "Observa si la respuesta se estabiliza y acompaña con indicaciones suaves y claras." },
    sorprendido: { label: "Sorpresa",   emoji: "😮", color: "#F4C44C", soft: "#FFF4CC", pillText: "#B08800", recommendation: "Observa si la respuesta se estabiliza y acompaña con indicaciones suaves y claras." },
  };
  return map[e] || {
    label: rawEmotion ? String(rawEmotion) : "No identificada",
    emoji: "🫤", color: "#B9B9C8", soft: "#F3F3F8", pillText: "#7A7A89",
    recommendation: "Continúa observando el contexto y revisa más registros para interpretar el patrón emocional.",
  };
}

function isSameDay(a, b) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

function getTimeLabel(timestamp) {
  if (!timestamp?.toDate) return "--:--";
  const date = timestamp.toDate();
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let dayLabel;
  if (isSameDay(date, today)) dayLabel = "Hoy";
  else if (isSameDay(date, yesterday)) dayLabel = "Ayer";
  else dayLabel = date.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
  const hora = date.toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" });
  return `${dayLabel}, ${hora}`;
}

function getDateOnly(timestamp) {
  if (!timestamp?.toDate) return null;
  return timestamp.toDate();
}

export default function Historial() {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [fechaInicioCustom, setFechaInicioCustom] = useState("");
  const [fechaFinCustom, setFechaFinCustom] = useState("");
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const usuario = auth.currentUser;
    if (!usuario) return;
    const q = query(
      collection(db, "predicciones"),
      where("uid", "==", usuario.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRegistros(datos);
    });
    return () => unsubscribe();
  }, []);

  function aplicarFiltro(items, filtroActual) {
    const now = new Date();
    if (filtroActual === "todos") return items;
    if (filtroActual === "hoy")
      return items.filter((i) => { const d = getDateOnly(i.createdAt); return d && isSameDay(d, now); });
    if (filtroActual === "ayer") {
      const ayer = new Date(); ayer.setDate(now.getDate() - 1);
      return items.filter((i) => { const d = getDateOnly(i.createdAt); return d && isSameDay(d, ayer); });
    }
    if (filtroActual === "7dias") {
      const inicio = new Date(); inicio.setDate(now.getDate() - 6); inicio.setHours(0, 0, 0, 0);
      return items.filter((i) => { const d = getDateOnly(i.createdAt); return d && d >= inicio; });
    }
    if (filtroActual === "30dias") {
      const inicio = new Date(); inicio.setDate(now.getDate() - 29); inicio.setHours(0, 0, 0, 0);
      return items.filter((i) => { const d = getDateOnly(i.createdAt); return d && d >= inicio; });
    }
    if (filtroActual === "personalizado" && fechaInicioCustom && fechaFinCustom) {
      const inicio = new Date(`${fechaInicioCustom}T00:00:00`);
      const fin = new Date(`${fechaFinCustom}T23:59:59`);
      return items.filter((i) => { const d = getDateOnly(i.createdAt); return d && d >= inicio && d <= fin; });
    }
    return items;
  }

  const registrosFiltrados = useMemo(
    () => aplicarFiltro(registros, filtro),
    [registros, filtro, fechaInicioCustom, fechaFinCustom]
  );

  const resumen = useMemo(() => {
    const conteo = {};
    registrosFiltrados.forEach((item) => {
      const meta = emotionMeta(item.emotion);
      if (!conteo[meta.label]) conteo[meta.label] = { ...meta, count: 0 };
      conteo[meta.label].count += 1;
    });
    const array = Object.values(conteo).sort((a, b) => b.count - a.count);
    const total = array.reduce((acc, i) => acc + i.count, 0);
    return { total, items: array.map((i) => ({ ...i, percent: total > 0 ? Math.round((i.count / total) * 100) : 0 })) };
  }, [registrosFiltrados]);

  const donutGradient = useMemo(() => {
    if (resumen.items.length === 0) return "conic-gradient(#EDEAF8 0deg 360deg)";
    let start = 0;
    const segments = resumen.items.map((item) => {
      const deg = (item.percent / 100) * 360;
      const seg = `${item.color} ${start}deg ${start + deg}deg`;
      start += deg;
      return seg;
    });
    if (start < 360) segments.push(`#F3F2FA ${start}deg 360deg`);
    return `conic-gradient(${segments.join(", ")})`;
  }, [resumen]);

  const tendencia = resumen.items[0] || null;

  if (detalle) {
    const meta = emotionMeta(detalle.emotion);
    return (
      <div style={{ padding: "18px 16px 100px", background: "#FAFBFF", minHeight: "100vh" }}>
        <button
          onClick={() => setDetalle(null)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer",
            color: "#7D73E6", fontWeight: 700, fontSize: 15, marginBottom: 20, padding: 0,
          }}
        >
          ← Volver al historial
        </button>

        <div style={{ background: meta.soft, borderRadius: 28, padding: 24, display: "flex", gap: 18, alignItems: "center", marginBottom: 18, border: `1.5px solid ${meta.color}33` }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, flexShrink: 0, border: `2px solid ${meta.color}44` }}>
            {meta.emoji}
          </div>
          <div>
            <div style={{ fontSize: 11, color: meta.pillText, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Estado emocional</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#24325C", lineHeight: 1 }}>{meta.label}</div>
            <div style={{ fontSize: 13, color: "#7C86A8", marginTop: 6 }}>🕐 {getTimeLabel(detalle.createdAt)}</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: 18, marginBottom: 14, border: "1px solid #EEE7FA" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#24325C", marginBottom: 10 }}>📋 Actividad registrada</div>
          {detalle.actividad
            ? <div style={{ fontSize: 15, color: "#24325C", fontWeight: 600 }}>{detalle.actividad}</div>
            : <div style={{ fontSize: 14, color: "#B0B9C8" }}>No se registró ninguna actividad en este momento.</div>}
        </div>

        <div style={{ background: "#F8F4FF", borderRadius: 20, padding: 18, borderLeft: `4px solid ${meta.color}`, border: "1px solid #EEE7FA", borderLeftWidth: 4, borderLeftColor: meta.color }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7D73E6", marginBottom: 10 }}>💡 Recomendación</div>
          <div style={{ fontSize: 15, color: "#5A6A8A", lineHeight: 1.6 }}>{meta.recommendation}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "18px 16px 100px", background: "#FAFBFF", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#24325C", marginBottom: 4 }}>Historial</div>
        <div style={{ fontSize: 13, color: "#7C86A8" }}>Revisa tus análisis anteriores</div>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #EEE7FA", borderRadius: 20, padding: 8, display: "flex", gap: 6, overflowX: "auto", marginBottom: 18 }}>
        {[
          { key: "todos", label: "Todos" },
          { key: "hoy", label: "Hoy" },
          { key: "ayer", label: "Ayer" },
          { key: "7dias", label: "7 días" },
          { key: "30dias", label: "30 días" },
          { key: "personalizado", label: "Personalizado" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            style={{
              border: "none",
              background: filtro === f.key ? "#F1ECFF" : "transparent",
              color: filtro === f.key ? "#7D73E6" : "#6F7897",
              fontWeight: filtro === f.key ? 800 : 600,
              borderRadius: 16, padding: "10px 14px",
              whiteSpace: "nowrap", cursor: "pointer", fontSize: 13,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtro === "personalizado" && (
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <input type="date" value={fechaInicioCustom} onChange={(e) => setFechaInicioCustom(e.target.value)}
            style={{ flex: 1, border: "1px solid #E3D8F5", borderRadius: 14, padding: 12, fontSize: 13 }} />
          <input type="date" value={fechaFinCustom} onChange={(e) => setFechaFinCustom(e.target.value)}
            style={{ flex: 1, border: "1px solid #E3D8F5", borderRadius: 14, padding: 12, fontSize: 13 }} />
        </div>
      )}

      <div style={{ background: "#FFFFFF", border: "1px solid #EEE7FA", borderRadius: 24, padding: 18, marginBottom: 18 }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: "#24325C" }}>Resumen emocional</div>
          <div style={{ fontSize: 12, color: "#7C86A8", marginTop: 2 }}>Basado en el filtro seleccionado</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", background: donutGradient, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: 94, height: 94, borderRadius: "50%", background: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: "inset 0 0 0 1px #F0EAF9" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#24325C", lineHeight: 1 }}>{resumen.total}</div>
              <div style={{ fontSize: 11, color: "#7C86A8", marginTop: 4 }}>análisis</div>
            </div>
          </div>
        </div>

        {resumen.items.length === 0 ? (
          <div style={{ fontSize: 13, color: "#8A8FA8", textAlign: "center" }}>Aún no hay datos para este periodo.</div>
        ) : (
          resumen.items.slice(0, 5).map((item) => (
            <div key={item.label} style={{ display: "grid", gridTemplateColumns: "28px 1fr 30px 38px", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 22 }}>{item.emoji}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#24325C", marginBottom: 4 }}>{item.label}</div>
                <div style={{ height: 5, borderRadius: 999, background: "#F0EEF7", overflow: "hidden" }}>
                  <div style={{ width: `${item.percent}%`, height: "100%", background: item.color, borderRadius: 999 }} />
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#24325C", textAlign: "right" }}>{item.count}</div>
              <div style={{ fontSize: 12, color: "#7C86A8", textAlign: "right" }}>{item.percent}%</div>
            </div>
          ))
        )}

        <div style={{ marginTop: 16, background: "#F8F4FF", borderRadius: 18, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 44, flexShrink: 0 }}>{tendencia ? tendencia.emoji : "🫧"}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#7D73E6", fontWeight: 800, fontSize: 13, marginBottom: 4 }}>
              <TrendIcon /> Tendencia general
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#24325C" }}>
              {tendencia ? `Mayormente ${tendencia.label.toLowerCase()}` : "Sin datos suficientes"}
            </div>
            <div style={{ fontSize: 13, color: "#7D73E6", fontWeight: 700, marginTop: 2 }}>
              {tendencia
                ? ["Calma", "Feliz", "Tranquilo"].includes(tendencia.label) ? "¡Buen trabajo! 🌟" : "Sigue observando el contexto"
                : "Analiza más audios"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 15, fontWeight: 900, color: "#24325C", marginBottom: 12 }}>Historial de análisis</div>

      {registrosFiltrados.length === 0 ? (
        <div style={{ background: "#FFFFFF", border: "1px solid #EEE7FA", borderRadius: 22, padding: 32, textAlign: "center", color: "#7C86A8" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
          No hay registros para este filtro.
        </div>
      ) : (
        registrosFiltrados.map((item) => {
          const meta = emotionMeta(item.emotion);
          return (
            <button
              key={item.id}
              onClick={() => setDetalle(item)}
              style={{
                width: "100%", textAlign: "left",
                background: "#FFFFFF", border: "1px solid #EEE7FA",
                borderRadius: 18, padding: "14px 16px", marginBottom: 10,
                boxShadow: "0 2px 8px rgba(155,132,192,0.07)",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: meta.soft, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, border: `1.5px solid ${meta.color}33` }}>
                {meta.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#24325C" }}>{meta.label}</div>
                  {item.actividad && (
                    <div style={{ fontSize: 11, color: "#43B39B", fontWeight: 700, background: "#F0FBF7", borderRadius: 8, padding: "2px 8px" }}>
                      📋 {item.actividad}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 12, color: "#7C86A8" }}>🕐 {getTimeLabel(item.createdAt)}</div>
              </div>
              <div style={{ fontSize: 20, color: "#C8C2E8", flexShrink: 0 }}>›</div>
            </button>
          );
        })
      )}
    </div>
  );
}