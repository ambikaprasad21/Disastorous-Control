import { useState } from "react";
import styles from "./Reynolds.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function Reynolds() {
  const [Density, setDensity] = useState(null);
  const [Velocity, setVelocity] = useState(null);
  const [Diameter, setDiameter] = useState(null);
  const [Viscosity, setViscosity] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const number = (Density * Velocity * Diameter) / Viscosity;
    setanswer(number);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Density (units)</label>
          <input
            type="number"
            value={Density}
            onChange={(e) => setDensity(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Temperature differnce (units)</label>
          <input
            type="number"
            value={Velocity}
            onChange={(e) => setVelocity(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Length (units)</label>
          <input
            type="number"
            value={Diameter}
            onChange={(e) => setDiameter(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Area normal (units)</label>
          <input
            type="number"
            value={Viscosity}
            onChange={(e) => setViscosity(e.target.value)}
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
export default Reynolds;
