import { useState } from "react";
import styles from "./TotalTime.module.css";

function TotalTime() {
  const [order, setorder] = useState(0);
  const [initconcen, setiniconcen] = useState(0);
  const [finalconcen, setfinalconcen] = useState(0);
  const [rateconstant, setrateconstant] = useState(0);
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
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Rate constant (units)</label>
          <input
            type="number"
            value={rateconstant}
            onChange={(e) => setrateconstant(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Order of reaction (units)</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setorder(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Initial Concentration (units)</label>
          <input
            type="number"
            value={initconcen}
            onChange={(e) => setiniconcen(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Final concentration (units)</label>
          <input
            type="number"
            value={finalconcen}
            onChange={(e) => setfinalconcen(e.target.value)}
          ></input>
        </div>
      </div>
      {answer && <p className={styles.answer}>{answer} </p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}

export default TotalTime;
