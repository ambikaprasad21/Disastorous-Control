import { useState } from "react";
import styles from "./Isothermal.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function Isothermal() {
  const [pressure, setpressure] = useState(null);
  const [VolumeZ1, setVolumeZ1] = useState(null);
  const [VolumeZ2, setVolumeZ2] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const work = pressure * VolumeZ1 * Math.log(VolumeZ2 / VolumeZ1);
    setanswer(work);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>Pressure (units)</label>
          <input
            type="number"
            value={pressure}
            onChange={(e) => setpressure(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Initial volume (units)</label>
          <input
            type="number"
            value={VolumeZ1}
            onChange={(e) => setVolumeZ1(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Final volume (units)</label>
          <input
            type="number"
            value={VolumeZ2}
            onChange={(e) => setVolumeZ2(e.target.value)}
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
export default Isothermal;
