import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import "./App.css";

import Inicio from "./components/Inicio/Inicio";
import Historial from "./components/Historial/Historial";
import Comunidad from "./components/Comunidad/Comunidad";
import Recursos from "./components/Comunidad/Recursos";

import Login from "./components/Login";
import Registro from "./components/Registro";
import Recuperar from "./components/Recuperar";
import PerfilInicial from "./components/PerfilInicial";
import NavButton from "./components/NavButton";
import MenuLateral from "./components/MenuLateral/MenuLateral";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [pantallaAuth, setPantallaAuth] = useState("login");
  const [pantallaApp, setPantallaApp] = useState("inicio");
  const [perfilCompleto, setPerfilCompleto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionMenu, setSeccionMenu] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          setPerfilCompleto(docSnap.exists());
        } catch (error) {
          console.error("Error verificando perfil:", error);
          setPerfilCompleto(false);
        }
      } else {
        setPerfilCompleto(false);
      }
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  async function cerrarSesion() {
    try {
      await signOut(auth);
      setPantallaAuth("login");
      setPantallaApp("inicio");
      setPerfilCompleto(false);
      setMenuAbierto(false);
      setSeccionMenu(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  if (cargando) {
    return (
      <div className="app-loading">
        <div className="loading-text">Cargando...</div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="app-auth">
        <div className="phone-card">
          {pantallaAuth === "login" && (
            <Login
              onGoToRegistro={() => setPantallaAuth("registro")}
              onGoToRecuperar={() => setPantallaAuth("recuperar")}
            />
          )}
          {pantallaAuth === "registro" && (
            <Registro onGoToLogin={() => setPantallaAuth("login")} />
          )}
          {pantallaAuth === "recuperar" && (
            <Recuperar onGoToLogin={() => setPantallaAuth("login")} />
          )}
        </div>
      </div>
    );
  }

  if (usuario && !perfilCompleto) {
    return (
      <div className="app-auth">
        <div className="phone-card">
          <PerfilInicial
            usuario={usuario}
            onPerfilGuardado={() => setPerfilCompleto(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-auth">
      <div className="phone-card app-phone">
        <div className="top-menu-bar">
          <button
            className="hamburger-btn"
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <span className="top-bar-title">Vocalink</span>
          <div style={{ width: 42 }} />
        </div>

        <MenuLateral
          abierto={menuAbierto}
          usuario={usuario}
          seccionMenu={seccionMenu}
          setSeccionMenu={setSeccionMenu}
          onClose={() => setMenuAbierto(false)}
          cerrarSesion={cerrarSesion}
        />

        <div className="app-content">
          {pantallaApp === "inicio" && <Inicio />}
          {pantallaApp === "historial" && <Historial />}
          {pantallaApp === "comunidad" && <Comunidad />}
          {pantallaApp === "recursos" && <Recursos />}
        </div>

        <div className="bottom-navbar">
          <NavButton icon="🏠" label="Inicio" active={pantallaApp === "inicio"} onClick={() => setPantallaApp("inicio")} />
          <NavButton icon="🕘" label="Historial" active={pantallaApp === "historial"} onClick={() => setPantallaApp("historial")} />
          <NavButton icon="👥" label="Comunidad" active={pantallaApp === "comunidad"} onClick={() => setPantallaApp("comunidad")} />
          <NavButton icon="📚" label="Recursos" active={pantallaApp === "recursos"} onClick={() => setPantallaApp("recursos")} />
        </div>
      </div>
    </div>
  );
}