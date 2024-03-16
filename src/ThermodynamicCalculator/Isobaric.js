import { useState } from "react";
import styles from "./Isobaric.module.css";

function Isobaric() {
  const [pressure, setpressure] = useState(0);
  const [VolumeZ1, setVolumeZ1] = useState(0);
  const [VolumeZ2, setVolumeZ2] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    const work = pressure * (VolumeZ2 - VolumeZ1);
    setanswer(work);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Total pressure (units)</label>
          <input
            type="number"
            value={pressure}
            onChange={(e) => setpressure(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Final volume (units)</label>
          <input
            type="number"
            value={VolumeZ2}
            onChange={(e) => setVolumeZ2(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Initial volume (units)</label>
          <input
            type="number"
            value={VolumeZ1}
            onChange={(e) => setVolumeZ1(e.target.value)}
          ></input>
        </div>

        <div>
          <label>Final concentration (units)</label>
          <input
            type="number"
            value={VolumeZ2}
            onChange={(e) => setVolumeZ2(e.target.value)}
          ></input>
        </div>
      </div>

      {answer && <p className={styles.answer}>{answer} </p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}
export default Isobaric;
