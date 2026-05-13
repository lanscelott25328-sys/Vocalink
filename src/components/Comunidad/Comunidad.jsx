import { useState } from "react";

import Foro from "./Foro";
import Conecta from "./Conecta";
import Recursos from "./Recursos";
import Especialistas from "./Especialistas";

import CommunityHeader from "./components/CommunityHeader";
import TabButton from "./components/TabButton";

export default function Comunidad() {
  const [tab, setTab] = useState("foro");

  return (
    <div
      style={{
        padding: 20,
        background: "linear-gradient(180deg,#FBF8FE 0%,#FFFFFF 100%)",
      }}
    >
      <CommunityHeader />

      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          marginBottom: 20,
        }}
      >
        <TabButton
          active={tab === "foro"}
          onClick={() => setTab("foro")}
        >
          Foro
        </TabButton>

        <TabButton
          active={tab === "conecta"}
          onClick={() => setTab("conecta")}
        >
          Conecta
        </TabButton>

        <TabButton
          active={tab === "recursos"}
          onClick={() => setTab("recursos")}
        >
          Recursos
        </TabButton>

        <TabButton
          active={tab === "especialistas"}
          onClick={() => setTab("especialistas")}
        >
          Especialistas
        </TabButton>
      </div>

      {tab === "foro" && <Foro />}
      {tab === "conecta" && <Conecta />}
      {tab === "recursos" && <Recursos />}
      {tab === "especialistas" && <Especialistas />}
    </div>
  );
}