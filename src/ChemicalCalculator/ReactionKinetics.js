import { Outlet } from "react-router";
import styles from "./ReactionKinetics.module.css";
import { NavLink } from "react-router-dom";

function ReactionKinetics() {
  function solve() {}
  return (
    <div>
      <h1 className={styles.primaryH1}> Reaction kinetic Calculator</h1>
      <h2 className={styles.secondaryH2}>What you want to calculate , select from below :</h2>
      <div className={styles["option-calci"]}>
      <div className={styles.option}> 
        <button><NavLink to= "rate-constant">Rate constant</NavLink></button>
        <button> <NavLink to="half-life">Half cycle</NavLink></button>
        <button> <NavLink to="time-taken">Time for reaction completion</NavLink></button>
      </div>

      <Outlet/>
      </div>
      

      
    </div>
  );
}

export default ReactionKinetics;
