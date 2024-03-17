import { useState } from "react";
import styles from "./EquimolarDiffusion.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function EquimolarDiffusion() {
  const [diffusivity, setdiffusivity] = useState(null);
  const [concentrationZ1, setconcentrationZ1] = useState(null);
  const [concentrationZ2, setconcentrationZ2] = useState(null);
  const [distance, setdistance] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const flux = (diffusivity / distance) * (concentrationZ1 - concentrationZ2);
    setanswer(flux);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Diffusivity (units)</label>
          <input
            type="number"
            value={diffusivity}
            onChange={(e) => setdiffusivity(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Concentration at Z1 (units)</label>
          <input
            type="number"
            value={concentrationZ1}
            onChange={(e) => setconcentrationZ1(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Distance (units)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setdistance(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Concentration at Z2 (units)</label>
          <input
            type="number"
            value={concentrationZ2}
            onChange={(e) => setconcentrationZ2(e.target.value)}
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
export default EquimolarDiffusion;
