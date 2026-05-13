import { FaceIcon } from "../../shared/FaceIcon";

export default function ResumenDia({ registros = [] }) {
  const hoy = new Date();
  const mes = hoy.toLocaleDateString("es-ES", { month: "long" });
  const fechaTexto = `Hoy, ${hoy.getDate()} de ${mes}`;

  const total = registros.length;
  const positivos = registros.filter((r) => ["happy","feliz","calm","calma","tranquilo"].includes(r.emotion?.toLowerCase())).length;
  const neutros = registros.filter((r) => ["neutral","neutro"].includes(r.emotion?.toLowerCase())).length;
  const alertas = registros.filter((r) => ["sad","triste","fear","miedo","angry","enojo","disgust","inquieto"].includes(r.emotion?.toLowerCase())).length;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ margin: 0, color: "#1E2B54", fontSize: 18, fontWeight: 800 }}>Resumen del día</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid #EEE6FA", borderRadius: 20, padding: "6px 12px", fontSize: 12, color: "#6B7280" }}>
          {fechaTexto}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        <StatCard icon={<WaveIcon />} iconBg="#E0F7F6" numero={total} texto="Voces analizadas" subtexto="Hoy" />
        <StatCard icon={<FaceIcon emotion="happy" size={28} />} iconBg="#E8F8ED" numero={positivos} texto="Momentos positivos" />
        <StatCard icon={<FaceIcon emotion="neutral" size={28} />} iconBg="#FFF8E8" numero={neutros} texto="Momentos neutros" />
        <StatCard icon={<FaceIcon emotion="angry" size={28} />} iconBg="#FFE9E9" numero={alertas} texto="Momento de estrés" />
      </div>
    </div>
  );
}

function StatCard({ icon, iconBg, numero, texto, subtexto }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 18, padding: "12px 10px", border: "1px solid #F0EDF8" }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, overflow: "hidden" }}>
        {icon}
      </div>
      <div style={{ color: "#1E2B54", fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{numero}</div>
      <div style={{ color: "#6B7280", fontSize: 11, marginTop: 4, lineHeight: 1.3 }}>{texto}</div>
      {subtexto && <div style={{ color: "#B0B9C8", fontSize: 10, marginTop: 2 }}>{subtexto}</div>}
    </div>
  );
}

function WaveIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M1 8 Q3 4 5 8 Q7 12 9 8 Q11 4 13 8 Q15 12 17 8 Q19 4 20 8" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}