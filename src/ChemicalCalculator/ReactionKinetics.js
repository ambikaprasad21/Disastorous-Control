import { Outlet } from "react-router";
import styles from "./ReactionKinetics.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function ReactionKinetics() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <h1 className={styles.primaryH1}> Reaction kinetic Calculator</h1>
      <h2 className={styles.secondaryH2}>
        What you want to calculate , select from below :
      </h2>
      <div className={styles["option-calci"]}>
        <div className={styles.option}>
          <button
            className={activeButton === "rate-constant" ? styles.active : ""}
            onClick={() => handleButtonClick("rate-constant")}
          >
            <NavLink to="rate-constant">Rate constant</NavLink>
          </button>
          <button
            className={activeButton === "half-life" ? styles.active : ""}
            onClick={() => handleButtonClick("half-life")}
          >
            <NavLink to="half-life">Half cycle</NavLink>
          </button>
          <button
            className={activeButton === "total-time" ? styles.active : ""}
            onClick={() => handleButtonClick("total-time")}
          >
            <NavLink to="time-taken">Time for reaction completion</NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default ReactionKinetics;
