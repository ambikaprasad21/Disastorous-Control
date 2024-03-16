import { useState } from "react";
import styles from "./Adiabatic.module.css";

function Adiabatic() {
  const [PressureZ1, setPressureZ1] = useState(0);
  const [PressureZ2, setPressureZ2] = useState(0);
  const [VolumeZ1, setVolumeZ1] = useState(0);
  const [VolumeZ2, setVolumeZ2] = useState(0);
  const [gama, setgama] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const work = (PressureZ2 * VolumeZ2 - PressureZ1 * VolumeZ1) / gama - 1;
    setanswer(work);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>PressureZ1 (units)</label>
          <input
            type="number"
            value={PressureZ1}
            onChange={(e) => setPressureZ1(e.target.value)}
          ></input>
        </div>

        <div>
          <label>PressureZ2 (units)</label>
          <input
            type="number"
            value={PressureZ2}
            onChange={(e) => setPressureZ2(e.target.value)}
          ></input>
        </div>

        <div>
          <label>VolumeZ1 (units)</label>
          <input
            type="number"
            value={VolumeZ1}
            onChange={(e) => setVolumeZ1(e.target.value)}
          ></input>
        </div>

        <div>
          <label>VolumeZ2 (units)</label>
          <input
            type="number"
            value={VolumeZ2}
            onChange={(e) => setVolumeZ2(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Gama (units)</label>
          <input
            type="number"
            value={gama}
            onChange={(e) => setgama(e.target.value)}
          ></input>
        </div>
      </div>

      {answer && <p className={styles.answer}>{answer} </p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}
export default Adiabatic;
