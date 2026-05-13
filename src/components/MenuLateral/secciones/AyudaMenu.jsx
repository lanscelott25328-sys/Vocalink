export default function AyudaMenu({ onBack }) {
  return (
    <section className="pantalla-menu">
      <div className="pantalla-menu-header">
        <button onClick={onBack}>←</button>
        <h2>Ayuda</h2>
      </div>

      <div className="pantalla-menu-contenido">
        <div className="lista-opciones">
          <div className="opcion-fila"><span>▤</span><p>Centro de ayuda</p><span>›</span></div>
          <div className="opcion-fila"><span>?</span><p>Preguntas frecuentes</p><span>›</span></div>
          <div className="opcion-fila"><span>☏</span><p>Contactar soporte</p><span>›</span></div>
          <div className="opcion-fila"><span>ⓘ</span><p>Acerca de Vocalink</p><small>v1.0.0</small><span>›</span></div>
        </div>
      </div>
    </section>
  );
}