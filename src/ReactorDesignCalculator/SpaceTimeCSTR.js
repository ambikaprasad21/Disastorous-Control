import { useState } from "react";
import styles from "./SpaceTimeCSTR.module.css";

function SpaceTimeCSTR() {
  const [order, setorder] = useState(0);
  const [initconcen, setiniconcen] = useState(0);
  const [rateconstant, setrateconstant] = useState(0);
  const [Conversion, setConversion] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const tau =
      (initconcen * Conversion) /
      (rateconstant * initconcen ** order * (1 - initconcen) ** order);
    setanswer(tau);
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
export default SpaceTimeCSTR;
