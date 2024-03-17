import { Outlet } from "react-router";
import styles from "./ReactorDesign.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function ReactorDesign() {
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
            className={activeButton === "cstr" ? styles.active : ""}
            onClick={() => handleButtonClick("cstr")}
          >
            <NavLink to="Space-Time-CSTR">Space time CSTR</NavLink>
          </button>
          <button
            className={activeButton === "pfr" ? styles.active : ""}
            onClick={() => handleButtonClick("pfr")}
          >
            <NavLink to="Space-Time-PFR">Space time for PFR</NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default ReactorDesign;
