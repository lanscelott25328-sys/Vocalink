export default function ConfiguracionMenu({ onBack }) {
  return (
    <section className="pantalla-menu">
      <div className="pantalla-menu-header">
        <button onClick={onBack}>←</button>
        <h2>Configuración</h2>
      </div>

      <div className="pantalla-menu-contenido">
        <div className="lista-opciones">
          <div className="opcion-fila"><span>◎</span><p>Idioma</p><small>Español</small><span>›</span></div>
          <div className="opcion-fila"><span>◌</span><p>Tema</p><small>Claro</small><span>›</span></div>
          <div className="opcion-fila"><span>🔔</span><p>Notificaciones</p><span className="toggle activo"></span></div>
          <div className="opcion-fila"><span>▥</span><p>Calidad de audio</p><small>Alta</small><span>›</span></div>
        </div>
      </div>
    </section>
  );
}