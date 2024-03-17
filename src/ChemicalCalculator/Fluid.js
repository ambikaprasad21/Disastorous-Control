import { NavLink } from "react-router-dom";
import styles from "./Fluid.module.css";
import { Outlet } from "react-router";
import { useState } from "react";

function Flow() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <h1 className={styles.primaryH1}> Heat Transfer Calculator</h1>
      <h2 className={styles.secondaryH2}>
        What you want to calculate , select from below :
      </h2>
      <div className={styles["option-calci"]}>
        <div className={styles.option}>
          <button
            className={activeButton === "re" ? styles.active : ""}
            onClick={() => handleButtonClick("re")}
          >
            <NavLink to="Reynolds">Reynolds number</NavLink>
          </button>
          <button
            className={activeButton === "vel" ? styles.active : ""}
            onClick={() => handleButtonClick("vel")}
          >
            <NavLink to="Velocity">Velocity in pipe</NavLink>
          </button>
          <button
            className={activeButton === "max-vel" ? styles.active : ""}
            onClick={() => handleButtonClick("max-vel")}
          >
            <NavLink to="Max-Velocity">Maximum Velocity</NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
export default Flow;
