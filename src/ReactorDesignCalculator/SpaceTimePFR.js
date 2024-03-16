import { useState } from "react";
import styles from "./SpaceTimePFR.module.css";

function SpaceTimePFR() {
  const [order, setorder] = useState(0);
  const [initconcen, setiniconcen] = useState(0);
  const [rateconstant, setrateconstant] = useState(0);
  const [Conversion, setConversion] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    if (+order === 1) {
      const tau = (1 / rateconstant) * Math.log(1 / (1 - initconcen));
      setanswer(tau.toFixed(2));
    } else {
      const tau =
        (initconcen ** (1 - rateconstant) / rateconstant ** (1 - order)) *
        ((1 - Conversion) ** (order - 1) / (1 - Conversion) ** (order - 1));

      setanswer(tau.toFixed(2));
    }
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Order of reaction (units)</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setorder(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Initial concentration (units)</label>
          <input
            type="number"
            value={initconcen}
            onChange={(e) => setiniconcen(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Conversion (units)</label>
          <input
            type="number"
            value={Conversion}
            onChange={(e) => setConversion(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Rate constant (units)</label>
          <input
            type="number"
            value={rateconstant}
            onChange={(e) => setrateconstant(e.target.value)}
          ></input>
        </div>
      </div>
      {answer && <p className={styles.answer}>{answer} </p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}
export default SpaceTimePFR;
