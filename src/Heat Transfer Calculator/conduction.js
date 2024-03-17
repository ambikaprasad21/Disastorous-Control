import { useState } from "react";
import styles from "./conduction.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function Conduction() {
  const [coefficient, setcoefficient] = useState(null);
  const [temperature, settemperature] = useState(null);
  const [length, setlength] = useState(null);
  const [area, setarea] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const energy = (coefficient * area * temperature) / length;
    setanswer(energy);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Heat transfer Coefficient (units)</label>
          <input
            type="number"
            value={coefficient}
            onChange={(e) => setcoefficient(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Temperature differnce (units)</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => settemperature(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Length (units)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setlength(e.target.value)}
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
      </div>
      <div className={styles["btn-ans"]}>
        <ButtonCalci handleSolve={handleSolve} />
        {answer && <p>{answer}</p>}
      </div>
    </div>
  );
}
export default Conduction;
