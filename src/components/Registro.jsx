import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Registro({ onGoToLogin }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function manejarRegistro(e) {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (contrasena !== confirmacion) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, contrasena);
      setMensaje("Cuenta creada correctamente.");
    } catch (err) {
      setError("No se pudo crear la cuenta. Verifica los datos.");
      console.error(err);
    }
  }

  return (
    <div
      style={{
        padding: "24px",
        background: "linear-gradient(180deg, #FBF8FE 0%, #FFFFFF 100%)",
        minHeight: "560px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "42px", marginBottom: "10px" }}>📝</div>
        <h1 style={{ margin: 0, color: "#2A2A35" }}>Crear cuenta</h1>
        <p style={{ color: "#666674", marginTop: "8px" }}>
          Regístrate para usar VocaLink
        </p>
      </div>

      <form
        onSubmit={manejarRegistro}
        style={{
          background: "#FFFFFF",
          border: "1px solid #EDE3F8",
          borderRadius: "22px",
          padding: "20px",
          boxShadow: "0 6px 18px rgba(155, 132, 192, 0.08)",
        }}
      >
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#444452",
            marginBottom: "8px",
          }}
        >
          Correo electrónico
        </label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="ejemplo@correo.com"
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #DDD3EE",
            marginBottom: "16px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />

        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#444452",
            marginBottom: "8px",
          }}
        >
          Contraseña
        </label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Crea una contraseña"
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #DDD3EE",
            marginBottom: "16px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />

        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#444452",
            marginBottom: "8px",
          }}
        >
          Confirmar contraseña
        </label>
        <input
          type="password"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          placeholder="Repite tu contraseña"
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #DDD3EE",
            marginBottom: "12px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "#C62828", fontSize: "14px", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        {mensaje && (
          <p style={{ color: "#2E7D32", fontSize: "14px", marginBottom: "12px" }}>
            {mensaje}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "#A48FD6",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Registrarme
        </button>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666674",
          }}
        >
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={onGoToLogin}
            style={{
              background: "transparent",
              border: "none",
              color: "#7A68B3",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Inicia sesión
          </button>
        </div>
      </form>
    </div>
  );
}