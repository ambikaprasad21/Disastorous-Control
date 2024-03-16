import styles from "./EquimolarDiffusion.module.css";

function EquimolarDiffusion(){
    return(
        <div className={styles.container}>
        <h1>please enter</h1>
        <div className={styles.inputs}>
           <div >
           <label>Diffusivity (units)</label>
           <input type="number"></input>
           </div>

           

           <div>
           <label>Concentration at Z1 (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Concentration at Z2 (units)</label>
           <input type="number"></input>
           </div>
        
  
        </div>
    </div>



    );
}
export default EquimolarDiffusion ;