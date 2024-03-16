import styles from "./conduction.module.css";

function Radiation(){
    return(
        <div className={styles.container}>
        <h1>please enter</h1>
        <div className={styles.inputs}>
           <div >
           <label>Stefan Boltzman constant (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Area normal (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Temperature at Z1 (units)</label>
           <input type ="number"></input>
           </div>

           <div>
           <label>Temperature at Z2 (units)</label>
           <input type ="number"></input>
           </div>
          
           
           
        </div>
    </div>



    );
}
export default Radiation ;