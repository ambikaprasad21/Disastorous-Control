import { useState } from "react";
import styles from "./RateConstant.module.css";

function RateConstant() {
  const [arrhanius, setArrhanius] = useState(0);
  const [activation, setActivation] = useState(0);
  const [temp, setTemp] = useState(0);
  const [answer, setanswer] = useState("");

  //formula answer = k0*e^(-E/(R*T))

  function calculateArrhenius(ko, E, R, T) {
    const exponent = -E / (R * T);
    const k = ko * Math.exp(exponent);
    return k;
  }

  function handleSolve() {
    const R = 8.314; // Gas constant in J/(mol*K)
    const ko = parseFloat(arrhanius); // Pre-exponential factor
    const E = parseFloat(activation); // Activation energy
    const T = parseFloat(temp); // Temperature

    const k = calculateArrhenius(ko, E, R, T).toFixed(2);
    setanswer(k);
  }

  return (
    <div className={styles.container}>
      <h1>please enter</h1>
      <div className={styles.inputs}>
        <div>
          <label>Arrhenius Constant (units)</label>
          <input
            type="number"
            value={arrhanius}
            onChange={(e) => setArrhanius(e.target.value)}
          />
        </div>

        <div>
          <label>Activation Energy (units)</label>
          <input
            type="number"
            value={activation}
            onChange={(e) => setActivation(e.target.value)}
          />
        </div>

        <div>
          <label>Temperature (units)</label>
          <input
            type="number"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
          />
        </div>
      </div>
      {answer && <p>{answer}</p>}
      <button onClick={handleSolve}>Calculate</button>
    </div>
  );
}

export default RateConstant;
