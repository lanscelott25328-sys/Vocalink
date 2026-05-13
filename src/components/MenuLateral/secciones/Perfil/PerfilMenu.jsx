import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import EditarInfoNino from "./EditarInfoNino";

function PerfilOption({ icon, title, subtitle, danger, onClick }) {
  return (
    <button
      className={`perfil-option ${danger ? "perfil-option-danger" : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className="perfil-option-icon">{icon}</div>

      <div className="perfil-option-text">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>

      <span className="perfil-option-arrow">›</span>
    </button>
  );
}

export default function PerfilMenu({ usuario, onBack }) {
  const [perfil, setPerfil] = useState(null);
  const [pantallaInterna, setPantallaInterna] = useState(null);

  useEffect(() => {
    async function cargarPerfil() {
      if (!usuario) return;

      try {
        const ref = doc(db, "usuarios", usuario.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setPerfil(snap.data());
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    }

    cargarPerfil();
  }, [usuario]);

  const nombreNino = perfil?.nombreNino || "niño";

  if (pantallaInterna === "editarNino") {
    return (
      <EditarInfoNino
        usuario={usuario}
        onBack={() => setPantallaInterna(null)}
      />
    );
  }

  return (
    <section className="pantalla-menu">
      <div className="pantalla-menu-header">
        <button onClick={onBack}>←</button>
        <h2>Perfil</h2>
      </div>

      <div className="pantalla-menu-contenido">
        <div className="card-device perfil-user-card">
          <div className="circle-icon">👤</div>

          <div className="device-info">
            <h4>{perfil?.nombreCuidador || "Usuario"}</h4>
            <p>{usuario?.email}</p>
          </div>
        </div>

        <div className="perfil-admin-card">
          <h3>Administrar perfil</h3>

          <PerfilOption
            icon="✏️"
            title={`Editar información de ${nombreNino}`}
            subtitle="Actualiza datos personales y preferencias"
            onClick={() => setPantallaInterna("editarNino")}
          />

          <PerfilOption
            icon="👤"
            title="Editar mi perfil"
            subtitle="Actualiza tu información como cuidador"
          />

          <PerfilOption
            icon="🔒"
            title="Cambiar contraseña"
            subtitle="Mantén tu cuenta segura"
          />

          <PerfilOption
            icon="🔔"
            title="Notificaciones"
            subtitle="Configura tus preferencias de notificaciones"
          />

          <PerfilOption
            icon="◎"
            title="Privacidad y datos"
            subtitle="Controla la privacidad de la información"
          />

          <PerfilOption
            icon="🗑️"
            title="Eliminar cuenta"
            subtitle="Elimina tu cuenta y todos los datos asociados"
            danger
          />
        </div>

        <div className="perfil-help-card">
          <div className="perfil-help-icon">🎧</div>

          <div className="perfil-help-text">
            <strong>¿Necesitas ayuda?</strong>
            <span>Estamos aquí para apoyarte en lo que necesites.</span>
          </div>

          <button type="button">💬 Contactar soporte</button>
        </div>
      </div>
    </section>
  );
}