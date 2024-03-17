import { useState } from "react";
import styles from "./Adiabatic.module.css";
import ButtonCalci from "../utils/ButtonCalci";

function Adiabatic() {
  const [PressureZ1, setPressureZ1] = useState(null);
  const [PressureZ2, setPressureZ2] = useState(null);
  const [VolumeZ1, setVolumeZ1] = useState(null);
  const [VolumeZ2, setVolumeZ2] = useState(null);
  const [gama, setgama] = useState(null);
  const [answer, setanswer] = useState("");

  function handleSolve() {
    const work = (PressureZ2 * VolumeZ2 - PressureZ1 * VolumeZ1) / gama - 1;
    setanswer(work);
  }

  return (
    <div className={styles.container}>
      <h1>Enter Values</h1>
      <div className={styles.inputs}>
        <div className={styles["label-input"]}>
          <label>PressureZ1 (units)</label>
          <input
            type="number"
            value={PressureZ1}
            onChange={(e) => setPressureZ1(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>PressureZ2 (units)</label>
          <input
            type="number"
            value={PressureZ2}
            onChange={(e) => setPressureZ2(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>VolumeZ1 (units)</label>
          <input
            type="number"
            value={VolumeZ1}
            onChange={(e) => setVolumeZ1(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>VolumeZ2 (units)</label>
          <input
            type="number"
            value={VolumeZ2}
            onChange={(e) => setVolumeZ2(e.target.value)}
          ></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Gama (units)</label>
          <input
            type="number"
            value={gama}
            onChange={(e) => setgama(e.target.value)}
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
export default Adiabatic;
