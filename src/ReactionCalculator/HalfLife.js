import { useState } from "react";
import styles from "./HalfLife.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function HalfLife() {
  const [order, setorder] = useState(null);
  const [initconcen, setiniconcen] = useState(null);
  const [rateconstant, setrateconstant] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    if (+order === 1) {
      const thalf = 0.693 / rateconstant;
      setanswer(thalf.toFixed(2));
    } else {
      const first = 2 ** (order - 1) - 1;
      const second = initconcen ** (1 - order);
      const third = rateconstant * (order - 1);
      const thalf = (first * second) / third;

      setanswer(thalf);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Order of reaction (units)</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setorder(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Initial concentration (units)</label>
          <input
            type="number"
            value={initconcen}
            onChange={(e) => setiniconcen(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Rate constant (units)</label>
          <input
            type="number"
            value={rateconstant}
            onChange={(e) => setrateconstant(e.target.value)}
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
export default HalfLife;
