import { useState } from "react";
import styles from "./radiation.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function Radiation() {
  const [stefan, setstefan] = useState(null);
  const [area, setarea] = useState(null);
  const [temperatureZ1, settemperatureZ1] = useState(null);
  const [temperatureZ2, settemperatureZ2] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const energy = stefan * area * (temperatureZ1 ** 4 - temperatureZ2 ** 4);
    setanswer(energy);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Stefan Boltzman constant (units)</label>
          <input
            type="number"
            value={stefan}
            onChange={(e) => setstefan(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Area normal (units)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setarea(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Temperature at Z1 (units)</label>
          <input
            type="number"
            value={temperatureZ1}
            onChange={(e) => settemperatureZ1(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Temperature at Z2 (units)</label>
          <input
            type="number"
            value={temperatureZ2}
            onChange={(e) => settemperatureZ2(e.target.value)}
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
export default Radiation;
