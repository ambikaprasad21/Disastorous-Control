import { Outlet } from "react-router";
import styles from "./MassTransfer.module.css";
import { NavLink } from "react-router-dom";

function MassTransfer(){

    return(
        <div>
        <h1 className={styles.primaryH1}> Reaction kinetic Calculator</h1>
        <h2 className={styles.secondaryH2}>What you want to calculate , select from below :</h2>
        <div className={styles["option-calci"]}>
        <div className={styles.option}> 
          <button><NavLink to= "molar-flux">Molar flux</NavLink></button>
          <button> <NavLink to="equimolar-counter-diffusion">Equimolar counter diffusion</NavLink></button>
        </div>
  
        <Outlet/>
        </div>
        
  
        
      </div>



    );
}

export default MassTransfer  ;