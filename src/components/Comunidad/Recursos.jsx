import { useState } from "react";

import categorias from "./Recursos/datos/categorias";
import recursosData from "./Recursos/datos/recursosData";


import CategoriaButton from "./Recursos/components/CategoriaButton";
import RecursoItem from "./Recursos/components/RecursoItem";
import RecursoDestacado from "./Recursos/components/RecursoDestacado";
import SolicitudCard from "./Recursos/components/SolicitudCard";

export default function Recursos() {
  const [categoria, setCategoria] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const recursosFiltrados = recursosData.filter((recurso) => {
    const coincideCategoria =
      categoria === "todos" || recurso.categoria === categoria;

    const coincideBusqueda = recurso.title
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <>
      <div style={{ marginBottom: "18px" }}>
        <h2
          style={{
            color: "#24325C",
            fontSize: "23px",
            margin: "0 0 8px",
            fontWeight: "900",
          }}
        >
          Recursos para cuidadores
        </h2>

        <p
          style={{
            color: "#6F7897",
            fontSize: "15px",
            lineHeight: "1.5",
            margin: 0,
          }}
        >
          Explora herramientas, guías y actividades que pueden ayudarte.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          marginBottom: "22px",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "20px",
            color: "#9B9AB4",
          }}
        >
          🔍
        </span>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar recursos..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #EEE7FA",
            borderRadius: "18px",
            padding: "16px 16px 16px 48px",
            outline: "none",
            fontSize: "15px",
            color: "#24325C",
            background: "#FFFFFF",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "10px",
          marginBottom: "22px",
        }}
      >
        {categorias.map((item) => (
          <CategoriaButton
            key={item.id}
            item={item}
            active={categoria === item.id}
            onClick={() => setCategoria(item.id)}
          />
        ))}
      </div>

      <RecursoDestacado />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h2
          style={{
            color: "#24325C",
            fontSize: "20px",
            margin: 0,
            fontWeight: "900",
          }}
        >
          Recursos recomendados
        </h2>

        <button
          onClick={() => setCategoria("todos")}
          style={{
            border: "none",
            background: "transparent",
            color: "#7D73E6",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Ver todos ›
        </button>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #EEE7FA",
          borderRadius: "22px",
          overflow: "hidden",
          marginBottom: "24px",
          boxShadow: "0 8px 24px rgba(155,132,192,0.05)",
        }}
      >
        {recursosFiltrados.length > 0 ? (
          recursosFiltrados.map((recurso) => (
            <RecursoItem key={recurso.id} recurso={recurso} />
          ))
        ) : (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: "#7C86A8",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            No se encontraron recursos.
          </div>
        )}
      </div>

      <SolicitudCard />
    </>
  );
}