import { Outlet } from "react-router";
import styles from "./ReactorDesign.module.css";
import { NavLink } from "react-router-dom";

function ReactorDesign() {
  function solve() {}
  return (
    <div>
      <h1 className={styles.primaryH1}> Reaction kinetic Calculator</h1>
      <h2 className={styles.secondaryH2}>
        What you want to calculate , select from below :
      </h2>
      <div className={styles["option-calci"]}>
        <div className={styles.option}>
          <button>
            <NavLink to="Space-Time-CSTR">Space time CSTR</NavLink>
          </button>
          <button>
            <NavLink to="Space-Time-PFR">Space time for PFR</NavLink>
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default ReactorDesign;
