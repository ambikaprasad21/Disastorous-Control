import { Outlet } from "react-router";
import styles from "./MassTransfer.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function MassTransfer() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <h1 className={styles.primaryH1}>Mass Transfer Calculator</h1>
      <h2 className={styles.secondaryH2}>
        What you want to calculate , select from below :
      </h2>
      <div className={styles["option-calci"]}>
        <div className={styles.option}>
          <button
            className={activeButton === "molar-flux" ? styles.active : ""}
            onClick={() => handleButtonClick("molar-flux")}
          >
            <NavLink to="molar-flux">Molar flux</NavLink>
          </button>
          <button
            className={activeButton === "equi" ? styles.active : ""}
            onClick={() => handleButtonClick("equi")}
          >
            {" "}
            <NavLink to="equimolar-counter-diffusion">
              Equimolar counter diffusion
            </NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default MassTransfer;
