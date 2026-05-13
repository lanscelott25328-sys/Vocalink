import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

import { auth, db } from "../../firebase";

import HeaderInicio from "./components/HeaderInicio";
import EstadoActual from "./components/EstadoActual";
import RegistrarActividad from "./components/RegistrarActividad";
import ResumenDia from "./components/ResumenDia";
import EmocionesRecientes from "./components/EmocionesRecientes";

import { obtenerUltimaPrediccion } from "../../services/modeloApi";

export default function Inicio() {
  const [prediccionActual, setPrediccionActual] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [registros, setRegistros] = useState([]);

  const lastResponseRef = useRef(null);
  const acknowledgedRef = useRef(false);
  const acknowledgedEmotionRef = useRef(null);

  useEffect(() => {
    const intervalo = setInterval(async () => {
      try {
        const data = await obtenerUltimaPrediccion();
        if (!data) return;

        const responseStr = JSON.stringify(data);

        if (responseStr !== lastResponseRef.current) {
          lastResponseRef.current = responseStr;

          await addDoc(collection(db, "predicciones"), {
            emotion: data.emotion,
            createdAt: serverTimestamp(),
            uid: auth.currentUser?.uid,
          });

          if (
            acknowledgedRef.current &&
            data.emotion !== acknowledgedEmotionRef.current
          ) {
            acknowledgedRef.current = false;
            acknowledgedEmotionRef.current = null;
            setAcknowledged(false);
          }

          setPrediccionActual(data);
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  function handleAcknowledge() {
    acknowledgedRef.current = true;
    acknowledgedEmotionRef.current = prediccionActual?.emotion;
    setAcknowledged(true);
  }

  useEffect(() => {
    const q = query(
      collection(db, "predicciones"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistros(datos);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ background: "#FAFBFF", minHeight: "100vh" }}>
      <HeaderInicio />
      <div style={{ padding: "0 16px 120px" }}>
        <EstadoActual
          prediccion={acknowledged ? null : prediccionActual}
          onAcknowledge={handleAcknowledge}
        />
        <RegistrarActividad prediccion={prediccionActual} />
        <ResumenDia registros={registros} />
        <EmocionesRecientes registros={registros} />
      </div>
    </div>
  );
}