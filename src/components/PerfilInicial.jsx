import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PerfilInicial({ usuario, onPerfilGuardado }) {
  const [paso, setPaso] = useState(1);

  const [nombreCuidador, setNombreCuidador] = useState("");
  const [nombreNino, setNombreNino] = useState("");
  const [relacion, setRelacion] = useState("");

  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [unidadPeso, setUnidadPeso] = useState("KG");
  const [estatura, setEstatura] = useState("");

  const [nivelActividad, setNivelActividad] = useState("");

  const [afeccionMedica, setAfeccionMedica] = useState("");
  const [otraAfeccion, setOtraAfeccion] = useState("");

  const [formaMalestar, setFormaMalestar] = useState("");
  const [otroMalestar, setOtroMalestar] = useState("");

  const [transicionDificil, setTransicionDificil] = useState("");
  const [otraTransicion, setOtraTransicion] = useState("");

  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const totalPasos = 7;
  const porcentaje = `${((paso - 1) / (totalPasos - 1)) * 100}%`;

  function siguientePaso() {
    setError("");

    if (paso === 1) {
      if (!nombreCuidador || !nombreNino || !relacion) {
        setError("Completa todos los campos para continuar.");
        return;
      }
    }

    if (paso === 2) {
      if (!genero || !edad || !peso || !estatura) {
        setError("Completa todos los campos para continuar.");
        return;
      }
    }

    if (paso === 3) {
      if (!nivelActividad) {
        setError("Selecciona un nivel de actividad.");
        return;
      }
    }

    if (paso === 4) {
      if (!afeccionMedica) {
        setError("Selecciona una opción.");
        return;
      }
      if (afeccionMedica === "Otros problemas de salud" && !otraAfeccion) {
        setError("Especifica el otro problema de salud.");
        return;
      }
    }

    if (paso === 5) {
      if (!formaMalestar) {
        setError("Selecciona una opción.");
        return;
      }
      if (formaMalestar === "Otro" && !otroMalestar) {
        setError("Especifica la otra forma de malestar.");
        return;
      }
    }

    if (paso === 6) {
      if (!transicionDificil) {
        setError("Selecciona una opción.");
        return;
      }
      if (transicionDificil === "Otra" && !otraTransicion) {
        setError("Especifica la otra transición.");
        return;
      }
    }

    setPaso((prev) => prev + 1);
  }

  async function guardarPerfilYContinuar() {
    setError("");
    setGuardando(true);

    try {
      await setDoc(doc(db, "usuarios", usuario.uid), {
        uid: usuario.uid,
        correo: usuario.email,
        nombreCuidador,
        nombreNino,
        relacion,
        genero,
        edad,
        peso,
        unidadPeso,
        estatura,
        nivelActividad,
        afeccionMedica,
        otraAfeccion,
        formaMalestar,
        otroMalestar,
        transicionDificil,
        otraTransicion,
        creadoEn: new Date().toISOString(),
      });

      setPaso(7);
    } catch (err) {
      console.error("ERROR FIRESTORE:", err);
      setError("No se pudo guardar la información: " + err.message);
    } finally {
      setGuardando(false);
    }
  }

  async function saltar() {
    setGuardando(true);

    try {
      await setDoc(doc(db, "usuarios", usuario.uid), {
        uid: usuario.uid,
        correo: usuario.email,
        onboardingSaltado: true,
        creadoEn: new Date().toISOString(),
      });

      onPerfilGuardado();
    } catch (err) {
      console.error(err);
      setError("No se pudo continuar.");
    } finally {
      setGuardando(false);
    }
  }

  function volver() {
    if (paso > 1 && paso < 7) {
      setPaso((prev) => prev - 1);
      setError("");
    }
  }

  return (
    <div
      style={{
        minHeight: "680px",
        background: "#F8F7FB",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FondoDecorativo />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "22px 24px 28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
          }}
        >
          <button
            onClick={volver}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "22px",
              color: "#4A4A57",
              cursor: paso > 1 && paso < 7 ? "pointer" : "default",
              opacity: paso > 1 && paso < 7 ? 1 : 0.35,
            }}
          >
            ←
          </button>

          <div
            style={{
              flex: 1,
              margin: "0 14px",
              height: "4px",
              background: "#E5E1EC",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: porcentaje,
                height: "100%",
                background: paso === 7 ? "#BFECCC" : "#AA97D8",
                borderRadius: "999px",
              }}
            />
          </div>

          <button
            onClick={saltar}
            disabled={guardando || paso === 7}
            style={{
              border: "none",
              background: "transparent",
              color: "#6C6A76",
              fontSize: "14px",
              cursor: "pointer",
              opacity: paso === 7 ? 0 : 1,
            }}
          >
            Saltar
          </button>
        </div>

        {paso === 1 && (
          <>
            <Titulo
              titulo="¡Bienvenido a VocaLink!"
              subtitulo="Empecemos por conoceros mejor..."
            />

            <Campo
              label="¿Cómo te gustaría que te llamemos?"
              placeholder="Ej: Mamá Laura, Papá Carlos, Tía Ana"
              value={nombreCuidador}
              onChange={setNombreCuidador}
            />

            <Campo
              label="¿A quién cuidas?"
              placeholder="Nombre de la persona a tu cargo"
              value={nombreNino}
              onChange={setNombreNino}
            />

            <Campo
              label="¿Qué relación tienen?"
              placeholder="Ej: Madre, Abuelo, Hermano, Tía"
              value={relacion}
              onChange={setRelacion}
            />

            <MensajeError error={error} />
            <Boton onClick={siguientePaso}>Continuar</Boton>
          </>
        )}

        {paso === 2 && (
          <>
            <Titulo
              titulo={`¡Hola ${nombreCuidador || "cuidador"}!`}
              subtitulo={`Cuéntanos más acerca de ${nombreNino || "la persona a tu cargo"}...`}
            />

            <div style={{ marginBottom: "22px" }}>
              <label style={labelStyle}>Selecciona su género</label>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <GeneroCard
                  titulo="Masculino"
                  selected={genero === "Masculino"}
                  onClick={() => setGenero("Masculino")}
                  icon="👦"
                />
                <GeneroCard
                  titulo="Femenino"
                  selected={genero === "Femenino"}
                  onClick={() => setGenero("Femenino")}
                  icon="👧"
                />
              </div>
            </div>

            <Campo
              label="Edad"
              placeholder="Ingresar edad"
              value={edad}
              onChange={setEdad}
              suffix="años"
              type="number"
            />

            <CampoPeso
              label="Peso"
              placeholder="Ingresar peso"
              value={peso}
              onChange={setPeso}
              unidad={unidadPeso}
              setUnidad={setUnidadPeso}
            />

            <Campo
              label="Estatura"
              placeholder="Ingresar estatura"
              value={estatura}
              onChange={setEstatura}
              suffix="cm"
              type="number"
            />

            <MensajeError error={error} />
            <Boton onClick={siguientePaso}>Continuar</Boton>
          </>
        )}

        {paso === 3 && (
          <>
            <Titulo
              titulo="¿Cuál es su nivel de actividad?"
              subtitulo="Esto nos ayuda a personalizar las alertas de estrés y entender mejor sus patrones naturales, evitando falsas alarmas."
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <OpcionCard
                titulo="Sedentario"
                subtitulo="Casi no hace ejercicio"
                selected={nivelActividad === "Sedentario"}
                onClick={() => setNivelActividad("Sedentario")}
              />
              <OpcionCard
                titulo="Ligeramente Activo"
                subtitulo="Hace ejercicio hasta 2 horas a la semana"
                selected={nivelActividad === "Ligeramente Activo"}
                onClick={() => setNivelActividad("Ligeramente Activo")}
              />
              <OpcionCard
                titulo="Moderadamente Activo"
                subtitulo="Hace ejercicio hasta 4 horas a la semana"
                selected={nivelActividad === "Moderadamente Activo"}
                onClick={() => setNivelActividad("Moderadamente Activo")}
              />
              <OpcionCard
                titulo="Muy Activo"
                subtitulo="Hace ejercicio más de 4 horas a la semana"
                selected={nivelActividad === "Muy Activo"}
                onClick={() => setNivelActividad("Muy Activo")}
              />
            </div>

            <MensajeError error={error} />
            <Boton onClick={siguientePaso}>Continuar</Boton>
          </>
        )}

        {paso === 4 && (
          <>
            <Titulo
              titulo="¿Tiene alguna afección médica o limitación física que debamos conocer?"
              subtitulo=""
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Diabetes",
                "Enfermedades cardíacas",
                "Problemas articulares",
                "Asma",
                "Otros problemas de salud",
              ].map((item) => (
                <RadioCard
                  key={item}
                  label={item}
                  selected={afeccionMedica === item}
                  onClick={() => setAfeccionMedica(item)}
                />
              ))}
            </div>

            {afeccionMedica === "Otros problemas de salud" && (
              <Campo
                label="Si es «Otro», especifique:"
                placeholder="Ej: Dolor de espalda"
                value={otraAfeccion}
                onChange={setOtraAfeccion}
              />
            )}

            <MensajeError error={error} />
            <Boton onClick={siguientePaso}>Continuar</Boton>
          </>
        )}

        {paso === 5 && (
          <>
            <Titulo
              titulo="¿Cómo suele expresar malestar o dolor?"
              subtitulo=""
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                "Llanto",
                "Aislamiento",
                "Hiperactividad",
                "Autoagresión",
                "Gritos",
                "Agitación",
                "Conductas repetitivas",
              ].map((item) => (
                <TagCard
                  key={item}
                  label={item}
                  selected={formaMalestar === item}
                  onClick={() => setFormaMalestar(item)}
                  full={item === "Conductas repetitivas"}
                />
              ))}
            </div>

            <Campo
              label="¿Algún otro?, especifique:"
              placeholder="Ej: Autoestimulación"
              value={otroMalestar}
              onChange={(value) => {
                setOtroMalestar(value);
                if (value) setFormaMalestar("Otro");
              }}
            />

            <MensajeError error={error} />
            <Boton onClick={siguientePaso}>Continuar</Boton>
          </>
        )}

        {paso === 6 && (
          <>
            <Titulo
              titulo="¿Qué transiciones le cuestan más?"
              subtitulo=""
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                "Despertarse",
                "Hora del baño",
                "Salir de casa",
                "Hora de dormir",
                "Llegar a un lugar nuevo",
                "Cambios en la alimentación",
                "Terminar una actividad preferida",
              ].map((item) => (
                <TagCard
                  key={item}
                  label={item}
                  selected={transicionDificil === item}
                  onClick={() => setTransicionDificil(item)}
                  full={item === "Terminar una actividad preferida"}
                />
              ))}
            </div>

            <Campo
              label="¿Algún otro?, especifique:"
              placeholder="Ej: Transiciones entre terapias"
              value={otraTransicion}
              onChange={(value) => {
                setOtraTransicion(value);
                if (value) setTransicionDificil("Otra");
              }}
            />

            <MensajeError error={error} />
            <Boton onClick={guardarPerfilYContinuar} disabled={guardando}>
              {guardando ? "Guardando..." : "Continuar"}
            </Boton>
          </>
        )}

        {paso === 7 && (
          <div style={{ textAlign: "center", paddingTop: "26px" }}>
            <h1
              style={{
                fontSize: "22px",
                color: "#2F2E38",
                fontWeight: "800",
                marginBottom: "26px",
              }}
            >
              ¡Gracias por tus respuestas!
            </h1>

            <div style={{ fontSize: "44px", marginBottom: "28px", color: "#AA97D8" }}>
              ♡
            </div>

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.5,
                color: "#30303A",
                marginBottom: "34px",
              }}
            >
              Ahora entendemos mejor a <b>{nombreNino}</b> y podemos personalizar
              la app para apoyarte de manera más efectiva.
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.6,
                color: "#4F4D58",
                marginBottom: "40px",
              }}
            >
              Cada alerta, cada recomendación y cada herramienta estará adaptada
              a sus necesidades únicas.
            </p>

            <button
              onClick={onPerfilGuardado}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "999px",
                border: "none",
                background: "#BFECCC",
                color: "white",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Empezar a usar VocaLink
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Titulo({ titulo, subtitulo }) {
  return (
    <>
      <h1
        style={{
          fontSize: "22px",
          margin: "0 0 8px 0",
          color: "#2F2E38",
          fontWeight: "800",
          lineHeight: 1.25,
        }}
      >
        {titulo}
      </h1>

      {subtitulo !== "" && (
        <p
          style={{
            fontSize: "15px",
            margin: "0 0 34px 0",
            color: "#4F4D58",
            lineHeight: 1.6,
          }}
        >
          {subtitulo}
        </p>
      )}
    </>
  );
}

function MensajeError({ error }) {
  if (!error) return null;

  return (
    <p style={{ color: "#C62828", fontSize: "13px", marginTop: "14px" }}>
      {error}
    </p>
  );
}

function Boton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        marginTop: "22px",
        padding: "14px",
        borderRadius: "999px",
        border: "none",
        background: "#AA97D8",
        color: "white",
        fontWeight: "700",
        fontSize: "15px",
        cursor: "pointer",
        opacity: disabled ? 0.75 : 1,
      }}
    >
      {children}
    </button>
  );
}

function Campo({
  label,
  placeholder,
  value,
  onChange,
  suffix,
  type = "text",
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <label style={labelStyle}>{label}</label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid #D9D5E2",
          marginTop: "12px",
          paddingBottom: "8px",
        }}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            width: "100%",
            fontSize: "14px",
            color: "#2F2E38",
          }}
        />

        {suffix && (
          <span
            style={{
              fontSize: "14px",
              color: "#6E6A78",
              marginLeft: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function CampoPeso({ label, placeholder, value, onChange, unidad, setUnidad }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <label style={labelStyle}>{label}</label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "12px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #D9D5E2",
            paddingBottom: "8px",
          }}
        >
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              fontSize: "14px",
              color: "#2F2E38",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            background: "#EDE8F7",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <UnidadButton active={unidad === "KG"} onClick={() => setUnidad("KG")}>
            KG
          </UnidadButton>
          <UnidadButton active={unidad === "LB"} onClick={() => setUnidad("LB")}>
            LB
          </UnidadButton>
        </div>
      </div>
    </div>
  );
}

function UnidadButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{
        border: "none",
        padding: "8px 10px",
        background: active ? "#AA97D8" : "transparent",
        color: active ? "#FFFFFF" : "#6C6A76",
        fontSize: "12px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function GeneroCard({ titulo, selected, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        height: "92px",
        borderRadius: "10px",
        border: selected ? "2px solid #AA97D8" : "1px solid #D7D3E1",
        background: "#FFFFFF",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
      }}
    >
      <div style={{ fontSize: "34px" }}>{icon}</div>
      <div style={{ fontSize: "14px", color: "#45434C" }}>{titulo}</div>
    </button>
  );
}

function OpcionCard({ titulo, subtitulo, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        borderRadius: "10px",
        border: selected ? "2px solid #AA97D8" : "1px solid #D7D3E1",
        background: "#FFFFFF",
        padding: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        textAlign: "left",
      }}
    >
      <div style={{ fontSize: "26px" }}>▥</div>
      <div>
        <div style={{ fontSize: "16px", color: "#45434C" }}>{titulo}</div>
        <div style={{ fontSize: "12px", color: "#6B6874", marginTop: "2px" }}>
          {subtitulo}
        </div>
      </div>
    </button>
  );
}

function RadioCard({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #D7D3E1",
        background: "#FFFFFF",
        padding: "14px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          border: "1.8px solid #3AA0FF",
          background: selected ? "#3AA0FF" : "transparent",
          boxShadow: selected ? "inset 0 0 0 3px white" : "none",
        }}
      />
      <div style={{ fontSize: "15px", color: "#45434C" }}>{label}</div>
    </button>
  );
}

function TagCard({ label, selected, onClick, full = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        gridColumn: full ? "1 / -1" : "auto",
        justifySelf: full ? "center" : "stretch",
        minWidth: full ? "160px" : "auto",
        borderRadius: "8px",
        border: selected ? "2px solid #AA97D8" : "1px solid #D7D3E1",
        background: "#FFFFFF",
        padding: "16px 12px",
        cursor: "pointer",
        fontSize: "15px",
        color: "#45434C",
        textAlign: "center",
      }}
    >
      {label}
    </button>
  );
}

function FondoDecorativo() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.18,
        pointerEvents: "none",
        backgroundImage: `
          radial-gradient(circle at 20px 20px, #D9CFF0 0 2px, transparent 2px),
          radial-gradient(circle at 80px 60px, #D9CFF0 0 2px, transparent 2px),
          radial-gradient(circle at 140px 30px, #D9CFF0 0 2px, transparent 2px)
        `,
        backgroundSize: "160px 120px",
      }}
    />
  );
}

const labelStyle = {
  display: "block",
  fontSize: "14px",
  color: "#3F3D46",
  fontWeight: "500",
};