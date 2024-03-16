import styles from "./MolarFlux.module.css";

function MolarFlux(){
    return(
        <div className={styles.container}>
        <h1>please enter</h1>
        <div className={styles.inputs}>
           <div >
           <label>Diffusivity (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Total Pressure (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Total concentration (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Pressure at Z1 (units)</label>
           <input type="number"></input>
           </div>
           
           <div>
           <label>Pressure at Z2 (units)</label>
           <input type="number"></input>
           </div>
           

  
        </div>
    </div>





    );
}

export default MolarFlux ;