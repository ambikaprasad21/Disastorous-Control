import { useState } from "react";
import styles from "./Reynolds.module.css";

function Reynolds() {
  const [Density, setDensity] = useState(0);
  const [Velocity, setVelocity] = useState(0);
  const [Diameter, setDiameter] = useState(0);
  const [Viscosity, setViscosity] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const number = (Density * Velocity * Diameter) / Viscosity;
    setanswer(number);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Density (units)</label>
          <input
            type="number"
            value={Density}
            onChange={(e) => setDensity(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Temperature differnce (units)</label>
          <input
            type="number"
            value={Velocity}
            onChange={(e) => setVelocity(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Length (units)</label>
          <input
            type="number"
            value={Diameter}
            onChange={(e) => setDiameter(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Area normal (units)</label>
          <input
            type="number"
            value={Viscosity}
            onChange={(e) => setViscosity(e.target.value)}
          ></input>
        </div>
      </div>
      {answer && <p className={styles.answer}>{answer}</p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}
export default Reynolds;
