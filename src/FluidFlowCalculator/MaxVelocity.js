import { useState } from "react";
import styles from "./MaxVelocity.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function MaxVelocity() {
  const [Radius, setRadius] = useState(null);
  const [Pressure, setPressure] = useState(null);
  const [Viscosity, setViscosity] = useState(null);
  const [Length, setLength] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {}

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Radius (units)</label>
          <input
            type="number"
            value={Radius}
            onChange={(e) => setRadius(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Pressure (units)</label>
          <input
            type="number"
            value={Pressure}
            onChange={(e) => setPressure(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Length (units)</label>
          <input
            type="number"
            value={Length}
            onChange={(e) => setLength(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Length (units)</label>
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
export default MaxVelocity;
