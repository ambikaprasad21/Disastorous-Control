import { NavLink } from "react-router-dom";
import styles from "./Fluid.module.css";
import { Outlet } from "react-router";

function Flow() {
  return (
    <div>
      <h1 className={styles.primaryH1}> Heat Transfer Calculator</h1>
      <h2 className={styles.secondaryH2}>
        What you want to calculate , select from below :
      </h2>
      <div className={styles["option-calci"]}>
        <div className={styles.option}>
          <button>
            <NavLink to="Reynolds">Reynolds number</NavLink>
          </button>
          <button>
            <NavLink to="Velocity">Velocity in pipe</NavLink>
          </button>
          <button>
            <NavLink to="Max-Velocity">Maximum Velocity</NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
export default Flow;
