import { Outlet } from "react-router";
import styles from "./Distillation.module.css";
import { NavLink } from "react-router-dom";

function Distillation(){
    return(
        <div>
        <h1 className={styles.primaryH1}>Distillation Calculator</h1>
        <h2 className={styles.secondaryH2}>What you want to calculate , select from below :</h2>
        <div className={styles["option-calci"]}>
        <div className={styles.option}> 
          <button><NavLink to= "reyleigh-equation">Minimum number of plates</NavLink></button>
          <button> <NavLink to="number-of-plates">Number of plates</NavLink></button>
          
        </div>
        <Outlet/>
        </div>
        
  
        
      </div>
 


    );
}
export default Distillation ;