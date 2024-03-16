import { useState } from "react";
import styles from "./convection.module.css";

function Convection() {
  const [coefficient, setcoefficient] = useState(0);
  const [area, setarea] = useState(0);
  const [wallTemperature, setwallTemperature] = useState(0);
  const [bulkTemperature, setbulkTemperature] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const energy = coefficient * area * (wallTemperature - bulkTemperature);
    setanswer(energy);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Heat transfer coefficient (units)</label>
          <input
            type="number"
            value={coefficient}
            onChange={(e) => setcoefficient(e.target.value)}
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
          <label>Wall temperature (units)</label>
          <input
            type="number"
            value={wallTemperature}
            onChange={(e) => setwallTemperature(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Bulk temperature (units)</label>
          <input
            type="number"
            value={bulkTemperature}
            onChange={(e) => setbulkTemperature(e.target.value)}
          ></input>
        </div>
      </div>

      {answer && <p className={styles.answer}>{answer}</p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}
export default Convection;
