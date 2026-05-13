import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function EditarInfoNino({ usuario, onBack }) {
  const [form, setForm] = useState({
    nombreNino: "",
    edad: "",
    genero: "",
    estatura: "",
    afeccionMedica: "",
    otraAfeccion: "",
    nivelActividad: "",
    formaMalestar: "",
    otraTransicion: "",
  });

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      if (!usuario) return;

      const ref = doc(db, "usuarios", usuario.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const datos = snap.data();

        setForm({
          nombreNino: datos.nombreNino || "",
          edad: datos.edad || "",
          genero: datos.genero || "",
          estatura: datos.estatura || "",
          afeccionMedica: datos.afeccionMedica || "",
          otraAfeccion: datos.otraAfeccion || "",
          nivelActividad: datos.nivelActividad || "",
          formaMalestar: datos.formaMalestar || "",
          otraTransicion: datos.otraTransicion || "",
        });
      }
    }

    cargarDatos();
  }, [usuario]);

  function cambiarCampo(campo, valor) {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  async function guardarCambios() {
    if (!usuario) return;

    try {
      setGuardando(true);

      const ref = doc(db, "usuarios", usuario.uid);

      await updateDoc(ref, {
        nombreNino: form.nombreNino,
        edad: form.edad,
        genero: form.genero,
        estatura: form.estatura,
        afeccionMedica: form.afeccionMedica,
        otraAfeccion: form.otraAfeccion,
        nivelActividad: form.nivelActividad,
        formaMalestar: form.formaMalestar,
        otraTransicion: form.otraTransicion,
      });

      alert("Información actualizada correctamente");
      onBack();
    } catch (error) {
      console.error("Error actualizando información:", error);
      alert("No se pudo actualizar la información.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className="pantalla-menu">
      <div className="pantalla-menu-header">
        <button onClick={onBack}>←</button>
        <h2>Información del niño</h2>
      </div>

      <div className="pantalla-menu-contenido">
        <div className="editar-nino-card">
          <h3>Editar información de {form.nombreNino || "niño"}</h3>
          <p>
            Actualiza los datos iniciales. Estos cambios también se guardarán en
            Firebase.
          </p>

          <CampoTexto
            label="Nombre del niño"
            value={form.nombreNino}
            onChange={(e) => cambiarCampo("nombreNino", e.target.value)}
          />

          <CampoTexto
            label="Edad"
            value={form.edad}
            onChange={(e) => cambiarCampo("edad", e.target.value)}
          />

          <CampoSelect
            label="Género"
            value={form.genero}
            onChange={(e) => cambiarCampo("genero", e.target.value)}
            options={["Masculino", "Femenino", "Otro", "Prefiero no decirlo"]}
          />

          <CampoTexto
            label="Estatura"
            value={form.estatura}
            onChange={(e) => cambiarCampo("estatura", e.target.value)}
          />

          <CampoTexto
            label="Afección médica"
            value={form.afeccionMedica}
            onChange={(e) => cambiarCampo("afeccionMedica", e.target.value)}
          />

          <CampoTexto
            label="Otra afección"
            value={form.otraAfeccion}
            onChange={(e) => cambiarCampo("otraAfeccion", e.target.value)}
          />

          <CampoSelect
            label="Nivel de actividad"
            value={form.nivelActividad}
            onChange={(e) => cambiarCampo("nivelActividad", e.target.value)}
            options={[
              "Bajo",
              "Ligeramente Activo",
              "Moderadamente Activo",
              "Muy Activo",
            ]}
          />

          <CampoTexto
            label="¿Cómo suele expresar malestar?"
            value={form.formaMalestar}
            onChange={(e) => cambiarCampo("formaMalestar", e.target.value)}
          />

          <CampoTexto
            label="Otra transición o situación importante"
            value={form.otraTransicion}
            onChange={(e) => cambiarCampo("otraTransicion", e.target.value)}
          />

          <button
            className="btn-guardar-nino"
            onClick={guardarCambios}
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </section>
  );
}

function CampoTexto({ label, value, onChange }) {
  return (
    <label className="campo-editar-nino">
      <span>{label}</span>
      <input value={value} onChange={onChange} />
    </label>
  );
}

function CampoSelect({ label, value, onChange, options }) {
  return (
    <label className="campo-editar-nino">
      <span>{label}</span>
      <select value={value} onChange={onChange}>
        <option value="">Seleccionar</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}