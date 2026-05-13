export default function DispositivoMenu({ onBack }) {
  return (
    <section className="pantalla-menu">
      <div className="pantalla-menu-header">
        <button onClick={onBack}>←</button>
        <h2>Dispositivo</h2>
      </div>

      <div className="pantalla-menu-contenido">
        <h3>Dispositivo conectado</h3>

        <div className="card-device">
          <div className="circle-icon">🎙️</div>
          <div className="device-info">
            <h4>Vocalink Mic Pro</h4>
            <p>Conectado <span className="punto-verde"></span></p>
            <small>🔋 85%</small>
          </div>
          <span className="flecha">›</span>
        </div>

        <h3>Opciones del dispositivo</h3>

        <div className="lista-opciones">
          <div className="opcion-fila"><span>⊕</span><p>Prueba de micrófono</p><span>›</span></div>
          <div className="opcion-fila"><span>⇧</span><p>Actualización de firmware</p><small>v1.2.3</small><span>›</span></div>
          <div className="opcion-fila opcion-peligro"><span>↪</span><p>Desconectar dispositivo</p><span>›</span></div>
        </div>
      </div>
    </section>
  );
}