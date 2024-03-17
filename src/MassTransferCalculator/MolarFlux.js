import { useState } from "react";
import styles from "./MolarFlux.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function MolarFlux() {
  const [diffusivity, setdiffusivity] = useState(null);
  const [TotalPressure, setTotalPressure] = useState(null);
  const [TotalConcentration, setTotalConcentration] = useState(null);
  const [PressureZ1, setPressureZ1] = useState(null);
  const [PressureZ2, setPressureZ2] = useState(null);
  const [Distance, setDistance] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const flux =
      ((diffusivity * TotalConcentration) / Distance) *
      Math.log((TotalPressure - PressureZ1) / (TotalPressure - PressureZ2));

    setanswer(flux);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Diffusivity (units)</label>
          <input
            type="number"
            value={diffusivity}
            onChange={(e) => setdiffusivity(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Total Pressure (units)</label>
          <input
            type="number"
            value={TotalPressure}
            onChange={(e) => setTotalPressure(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Total concentration (units)</label>
          <input
            type="number"
            value={TotalConcentration}
            onChange={(e) => setTotalConcentration(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Distance (units)</label>
          <input
            type="number"
            value={Distance}
            onChange={(e) => setDistance(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Pressure at Z1 (units)</label>
          <input
            type="number"
            value={PressureZ1}
            onChange={(e) => setPressureZ1(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Pressure at Z2 (units)</label>
          <input
            type="number"
            value={PressureZ2}
            onChange={(e) => setPressureZ2(e.target.value)}
          ></input>
        </div>
      </div>

      <div className={styles["btn-ans"]}>
        <ButtonCalci handleSolve={handleSolve} />
        {answer && <p>{answer}</p>}
      </div>
    </div>
  );
}

export default MolarFlux;
