import { useState } from "react";
import styles from "./radiation.module.css";

function Radiation() {
  const [stefan, setstefan] = useState(0);
  const [area, setarea] = useState(0);
  const [temperatureZ1, settemperatureZ1] = useState(0);
  const [temperatureZ2, settemperatureZ2] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const energy = stefan * area * (temperatureZ1 ** 4 - temperatureZ2 ** 4);
    setanswer(energy);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Stefan Boltzman constant (units)</label>
          <input
            type="number"
            value={stefan}
            onChange={(e) => setstefan(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Area normal (units)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setarea(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Temperature at Z1 (units)</label>
          <input
            type="number"
            value={temperatureZ1}
            onChange={(e) => settemperatureZ1(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Temperature at Z2 (units)</label>
          <input
            type="number"
            value={temperatureZ2}
            onChange={(e) => settemperatureZ2(e.target.value)}
          ></input>
        </div>
      </div>
      {answer && <p className={styles.answer}>{answer}</p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}
export default Radiation;
