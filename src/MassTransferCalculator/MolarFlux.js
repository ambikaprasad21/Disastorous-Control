import { useState } from "react";
import styles from "./MolarFlux.module.css";

function MolarFlux() {
  const [diffusivity, setdiffusivity] = useState(0);
  const [TotalPressure, setTotalPressure] = useState(0);
  const [TotalConcentration, setTotalConcentration] = useState(0);
  const [PressureZ1, setPressureZ1] = useState(0);
  const [PressureZ2, setPressureZ2] = useState(0);
  const [Distance, setDistance] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const flux =
      ((diffusivity * TotalConcentration) / Distance) *
      Math.log((TotalPressure - PressureZ1) / (TotalPressure - PressureZ2));

    setanswer(flux);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Diffusivity (units)</label>
          <input
            type="number"
            value={diffusivity}
            onChange={(e) => setdiffusivity(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Total Pressure (units)</label>
          <input
            type="number"
            value={TotalPressure}
            onChange={(e) => setTotalPressure(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Total concentration (units)</label>
          <input
            type="number"
            value={TotalConcentration}
            onChange={(e) => setTotalConcentration(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Distance (units)</label>
          <input
            type="number"
            value={Distance}
            onChange={(e) => setDistance(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Pressure at Z1 (units)</label>
          <input
            type="number"
            value={PressureZ1}
            onChange={(e) => setPressureZ1(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Pressure at Z2 (units)</label>
          <input
            type="number"
            value={PressureZ2}
            onChange={(e) => setPressureZ2(e.target.value)}
          ></input>
        </div>
      </div>

      {answer && <p className={styles.answer}>{answer} </p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}

export default MolarFlux;
