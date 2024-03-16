import styles from "./isothermal.module.css";

function Isothermal(){
    return(
        <div className={styles.container}>
        <h1>please enter</h1>
        <div className={styles.inputs}>
           <div >
           <label>Rate constant (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Order of reaction (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Initial Concentration (units)</label>
           <input type ="number"></input>
           </div>

           <div>
           <label>Final concentration (units)</label>
           <input type ="number"></input>
           </div>
          
           
           
        </div>
    </div>
 


    );
}
export default Isothermal ;