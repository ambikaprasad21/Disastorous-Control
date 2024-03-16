import { Outlet } from "react-router";
import styles from "./HeatTransfer.module.css";
import { NavLink } from "react-router-dom";


function HeatTransfer(){
    return(
        <div>
        <h1 className={styles.primaryH1}> Heat Transfer Calculator</h1>
        <h2 className={styles.secondaryH2}>What you want to calculate , select from below :</h2>
        <div className={styles["option-calci"]}>
        <div className={styles.option}> 
          <button><NavLink to= "conduction">Conduction</NavLink></button>
          <button> <NavLink to="convection">Convection</NavLink></button>
          <button><NavLink to= "Radiation">Radiation</NavLink></button>
        </div>
  
        <Outlet/>
        </div>
        
  
        
      </div>




    );
}
export default HeatTransfer ;