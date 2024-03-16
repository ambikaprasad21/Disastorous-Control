import { useState } from "react";
import styles from "./Velocity.module.css";

function Velocity() {
  const [Radius, setRadius] = useState(0);
  const [Pressure, setPressure] = useState(0);
  const [CenterRadius, setCenterRadius] = useState(0);
  const [Viscosity, setViscosity] = useState(0);
  const [Length, setLength] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const speed =
      ((Radius ** 2 * Pressure) / (4 * Viscosity * Length)) *
      (1 - CenterRadius ** 2 / Radius ** 2);
    setanswer(speed);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Radius (units)</label>
          <input
            type="number"
            value={Radius}
            onChange={(e) => setRadius(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Pressure (units)</label>
          <input
            type="number"
            value={Pressure}
            onChange={(e) => setPressure(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Viscosity (units)</label>
          <input
            type="number"
            value={Viscosity}
            onChange={(e) => setViscosity(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Length of pipe (units)</label>
          <input
            type="number"
            value={Length}
            onChange={(e) => setLength(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Distance from center of pipe (units)</label>
          <input
            type="number"
            value={CenterRadius}
            onChange={(e) => setCenterRadius(e.target.value)}
          ></input>
        </div>
      </div>
      {answer && <p className={styles.answer}>{answer}</p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}

export default Velocity;
