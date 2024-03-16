import styles from "./conduction.module.css";


function Conduction(){
    return(
        <div className={styles.container}>
         <h1>please enter</h1>
         <div className={styles.inputs}>
            <div >
            <label>Heat transfer Coefficient (units)</label>
            <input type="number"></input>
            </div>

            <div>
            <label>Temperature differnce (units)</label>
            <input type="number"></input>
            </div>

            <div>
            <label>Length (units)</label>
            <input type ="number"></input>
            </div>
           
            <div>
            <label>Area normal (units)</label>
            <input type ="number"></input>
            </div>
            
            
         </div>
     </div>

    );
}
export default Conduction ;