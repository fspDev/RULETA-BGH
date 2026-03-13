import React, { useState } from "react";
import "./Ruleta.css";
import centro from "./images/centro.png";
import ruleta from "./images/ruleta.png";
import logo from "./images/logo.png";

function Ruleta({ onResult }) {
  const [premio, setPremio] = useState("Suerte!");
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const sectores = [
    { id: 1, prob: 8,  centro: 22,  texto: "Ganaste el Primer Premio" },
    { id: 2, prob: 13,  centro: 67,  texto: "Seguí disfrutando de NPLAY" },
    { id: 3, prob: 15, centro: 112, texto: "Ganaste el Segundo Premio" },
    { id: 4, prob: 8,  centro: 157, texto: "Tirá de nuevo" },
    { id: 5, prob: 23, centro: 202, texto: "Ganaste el Tercer Premio" },
    { id: 6, prob: 18, centro: 247, texto: "Seguí disfrutando de NPLAY" },
    { id: 7, prob: 0, centro: 292, texto: "Ganaste el Tercer Premio" },
    { id: 8, prob: 10, centro: 337, texto: "Tirá de nuevo" },
  ];

  function girar() {
    const totalProb = sectores.reduce((suma, s) => suma + s.prob, 0);
    let random = Math.random() * totalProb;
    let acumulado = 0;
    let sectorSeleccionado = sectores[sectores.length - 1];

    for (let s of sectores) {
      acumulado += s.prob;
      if (random <= acumulado) {
        sectorSeleccionado = s;
        break;
      }
    }

    const offset = Math.floor(Math.random() * 30) - 15;
    const targetGrados = sectorSeleccionado.centro + offset;
    const vueltas = 5;
    const destinoFinal = (Math.ceil(rotation / 360) * 360) + (vueltas * 360) + targetGrados;

    setRotation(destinoFinal);
  }

  const final = () => {
    const gradosFinales = ((rotation % 360) + 360) % 360;
    const sectorReal = sectores.find(s => 
      gradosFinales >= s.centro - 22 && gradosFinales <= s.centro + 22
    ) || sectores[0];

    const nuevoPremio = sectorReal.texto;
    setPremio(nuevoPremio);

    if (onResult) {
      onResult(nuevoPremio);
    }

    setIsSpinning(false);

    setTimeout(() => {
      setPremio("Suerte!");
    }, 2500);
  };

  const lanzar = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    girar();
  };

  const handleRegresar = () => {
    window.location.reload();
  };

  return (
    <div className="plafon">
      <img src={logo} alt="Logo" className="ruleta-logo" />
      <div className="ruleta-wrapper">
        <div
          className="ruleta"
          style={{
            backgroundImage: `url(${ruleta})`,
            transform: `rotate(${rotation}deg)`,
            cursor: isSpinning ? "default" : "pointer"
          }}
          onClick={lanzar}
          onTransitionEnd={final}
        ></div>

        <div className="central" onClick={lanzar} style={{ cursor: isSpinning ? "default" : "pointer" }}>
          <img src={centro} alt="centro" style={{ pointerEvents: "none" }} />
        </div>
      </div>

      <div className="premio">{premio}</div>

      <div className="barraInferior">
        <button className="BotonRegresar" onClick={handleRegresar}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Ruleta;
