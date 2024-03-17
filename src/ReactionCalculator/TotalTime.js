import { useState } from "react";
import styles from "./TotalTime.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function TotalTime() {
  const [order, setorder] = useState(null);
  const [initconcen, setiniconcen] = useState(null);
  const [finalconcen, setfinalconcen] = useState(null);
  const [rateconstant, setrateconstant] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    if (+order === 1 && +rateconstant !== 0) {
      const time =
        2.303 * Math.log(initconcen / finalconcen) * (1 / rateconstant);
      setanswer(time.toFixed(2));
    } else {
      const time =
        (1 / (rateconstant * (order - 1))) *
        (finalconcen ** (1 - order) - initconcen ** (1 - order));
      setanswer(time.toFixed(2));
    }
  }
  return (
    <div>
      <div className={styles.container}>
        <h1>Enter Values</h1>
        <div className={styles.inputs}>
          <div className={styles["label-input"]}>
            <label>Rate constant (units)</label>
            <input
              type="number"
              value={rateconstant}
              onChange={(e) => setrateconstant(e.target.value)}
            ></input>
          </div>

          <div className={styles["label-input"]}>
            <label>Order of reaction (units)</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setorder(e.target.value)}
            ></input>
          </div>

          <div className={styles["label-input"]}>
            <label>Initial Concentration (units)</label>
            <input
              type="number"
              value={initconcen}
              onChange={(e) => setiniconcen(e.target.value)}
            ></input>
          </div>

          <div className={styles["label-input"]}>
            <label>Final concentration (units)</label>
            <input
              type="number"
              value={finalconcen}
              onChange={(e) => setfinalconcen(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <div className={styles["btn-ans"]}>
        <ButtonCalci handleSolve={handleSolve} />
        {answer && <p>{answer}</p>}
      </div>
    </div>
  );
}

export default TotalTime;
