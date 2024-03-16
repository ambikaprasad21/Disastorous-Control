import { useState } from "react";
import styles from "./EquimolarDiffusion.module.css";

function EquimolarDiffusion() {
  const [diffusivity, setdiffusivity] = useState(0);
  const [concentrationZ1, setconcentrationZ1] = useState(0);
  const [concentrationZ2, setconcentrationZ2] = useState(0);
  const [distance, setdistance] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const flux = (diffusivity / distance) * (concentrationZ1 - concentrationZ2);
    setanswer(flux);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Diffusivity (units)</label>
          <input
            type="number"
            value={diffusivity}
            onChange={(e) => setdiffusivity(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Concentration at Z1 (units)</label>
          <input
            type="number"
            value={concentrationZ1}
            onChange={(e) => setconcentrationZ1(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Distance (units)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setdistance(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Concentration at Z2 (units)</label>
          <input
            type="number"
            value={concentrationZ2}
            onChange={(e) => setconcentrationZ2(e.target.value)}
          ></input>
        </div>
      </div>
      {answer && <p className={styles.answer}>{answer}</p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}
export default EquimolarDiffusion;
