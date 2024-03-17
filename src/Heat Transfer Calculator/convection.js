import { useState } from "react";
import styles from "./convection.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function Convection() {
  const [coefficient, setcoefficient] = useState(null);
  const [area, setarea] = useState(null);
  const [wallTemperature, setwallTemperature] = useState(null);
  const [bulkTemperature, setbulkTemperature] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const energy = coefficient * area * (wallTemperature - bulkTemperature);
    setanswer(energy);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Heat transfer coefficient (units)</label>
          <input
            type="number"
            value={coefficient}
            onChange={(e) => setcoefficient(e.target.value)}
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
          <label>Wall temperature (units)</label>
          <input
            type="number"
            value={wallTemperature}
            onChange={(e) => setwallTemperature(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Bulk temperature (units)</label>
          <input
            type="number"
            value={bulkTemperature}
            onChange={(e) => setbulkTemperature(e.target.value)}
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
export default Convection;
