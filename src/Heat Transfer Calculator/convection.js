import styles from "./conduction.module.css";

function Convection(){
    return(
        <div className={styles.container}>
        <h1>please enter</h1>
        <div className={styles.inputs}>
           <div >
           <label>Heat transfer coefficient (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Area normal (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Wall temperature (units)</label>
           <input type ="number"></input>
           </div>

           <div>
           <label>Bulk temperature (units)</label>
           <input type ="number"></input>
           </div>
          
           
           
        </div>
    </div>



    );
}
export default Convection ;