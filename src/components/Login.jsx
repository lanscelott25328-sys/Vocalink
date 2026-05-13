import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onGoToRegistro, onGoToRecuperar }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  async function manejarLogin(e) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
    } catch (err) {
      setError("No se pudo iniciar sesión. Revisa el correo y la contraseña.");
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
        <div style={{ fontSize: "42px", marginBottom: "10px" }}>🎤</div>
        <h1 style={{ margin: 0, color: "#2A2A35" }}>VocaLink</h1>
        <p style={{ color: "#666674", marginTop: "8px" }}>
          Inicia sesión para continuar
        </p>
      </div>

      <form
        onSubmit={manejarLogin}
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
          placeholder="Tu contraseña"
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
          Iniciar sesión
        </button>

        <button
          type="button"
          onClick={onGoToRecuperar}
          style={{
            width: "100%",
            marginTop: "12px",
            background: "transparent",
            border: "none",
            color: "#7A68B3",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Olvidé mi contraseña
        </button>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666674",
          }}
        >
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={onGoToRegistro}
            style={{
              background: "transparent",
              border: "none",
              color: "#7A68B3",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  );
}