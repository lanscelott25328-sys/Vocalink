import "./MenuLateral.css";


import PerfilMenu from "./secciones/Perfil/PerfilMenu";
import DispositivoMenu from "./secciones/DispositivoMenu";
import ConfiguracionMenu from "./secciones/ConfiguracionMenu";
import AyudaMenu from "./secciones/AyudaMenu";

export default function MenuLateral({
  abierto,
  usuario,
  seccionMenu,
  setSeccionMenu,
  onClose,
  cerrarSesion,
}) {
  const cerrarPantalla = () => setSeccionMenu(null);

  return (
    <>
      {abierto && <div className="menu-overlay" onClick={onClose}></div>}

      <aside className={`menu-lateral ${abierto ? "menu-lateral-activo" : ""}`}>
        <div className="menu-logo-section">
          <div className="vocalink-wave">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <h2>VOCALINK</h2>
        </div>

        <nav className="menu-opciones">
          <button onClick={() => setSeccionMenu("dispositivo")}>🎙️ Dispositivo</button>
          <button onClick={() => setSeccionMenu("perfil")}>👤 Perfil</button>
          <button onClick={() => setSeccionMenu("configuracion")}>⚙️ Configuración</button>
          <button onClick={() => setSeccionMenu("ayuda")}>❔ Ayuda</button>
        </nav>

        <button className="boton-cerrar-sesion" onClick={cerrarSesion}>
          ↪ Cerrar sesión
        </button>
      </aside>

      {seccionMenu === "perfil" && (
        <PerfilMenu usuario={usuario} onBack={cerrarPantalla} />
      )}

      {seccionMenu === "dispositivo" && (
        <DispositivoMenu onBack={cerrarPantalla} />
      )}

      {seccionMenu === "configuracion" && (
        <ConfiguracionMenu onBack={cerrarPantalla} />
      )}

      {seccionMenu === "ayuda" && (
        <AyudaMenu onBack={cerrarPantalla} />
      )}
    </>
  );
}