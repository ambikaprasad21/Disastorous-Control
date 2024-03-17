import { Outlet } from "react-router";
import styles from "./HeatTransfer.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function HeatTransfer() {
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
            className={activeButton === "conduction" ? styles.active : ""}
            onClick={() => handleButtonClick("conduction")}
          >
            <NavLink to="conduction">Conduction</NavLink>
          </button>
          <button
            className={activeButton === "convection" ? styles.active : ""}
            onClick={() => handleButtonClick("convection")}
          >
            {" "}
            <NavLink to="convection">Convection</NavLink>
          </button>
          <button
            className={activeButton === "radiation" ? styles.active : ""}
            onClick={() => handleButtonClick("radiation")}
          >
            <NavLink to="Radiation">Radiation</NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
export default HeatTransfer;
