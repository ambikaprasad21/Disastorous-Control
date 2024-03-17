import { Outlet } from "react-router";
import styles from "./Thermodynamics.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Thermodynamics() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <h1 className={styles.primaryH1}> Thermodynamics Calculator</h1>
      <h2 className={styles.secondaryH2}>
        What you want to calculate , select from below :
      </h2>
      <div className={styles["option-calci"]}>
        <div className={styles.option}>
          <button
            className={activeButton === "isochoric" ? styles.active : ""}
            onClick={() => handleButtonClick("isochoric")}
          >
            <NavLink to="Isochoric-work">Isochoric work</NavLink>
          </button>
          <button
            className={activeButton === "isother" ? styles.active : ""}
            onClick={() => handleButtonClick("isother")}
          >
            {" "}
            <NavLink to="Isothermal-work">Isothermal work</NavLink>
          </button>
          <button
            className={activeButton === "isobaric" ? styles.active : ""}
            onClick={() => handleButtonClick("isobaric")}
          >
            {" "}
            <NavLink to="Isobaric-work">Isobaric work</NavLink>
          </button>
          <button
            className={activeButton === "adiabatic" ? styles.active : ""}
            onClick={() => handleButtonClick("adiabatic")}
          >
            {" "}
            <NavLink to="Adiabatic-work">Adiabatic work</NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
export default Thermodynamics;
