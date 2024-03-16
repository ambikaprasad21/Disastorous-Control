import { Outlet } from "react-router";
import styles from "./Thermodynamics.module.css";
import { NavLink } from "react-router-dom";

function Thermodynamics() {
  return (
    <div>
      <h1 className={styles.primaryH1}> Thermodynamics Calculator</h1>
      <h2 className={styles.secondaryH2}>
        What you want to calculate , select from below :
      </h2>
      <div className={styles["option-calci"]}>
        <div className={styles.option}>
          <button>
            <NavLink to="Isochoric-work">Isochoric work</NavLink>
          </button>
          <button>
            {" "}
            <NavLink to="Isothermal-work">Isothermal work</NavLink>
          </button>
          <button>
            {" "}
            <NavLink to="Isobaric-work">Isobaric work</NavLink>
          </button>
          <button>
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
