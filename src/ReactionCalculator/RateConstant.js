import styles from "./RateConstant.module.css";

function RateConstant(){

    return(
     <div className={styles.container}>
         <h1>please enter</h1>
         <div className={styles.inputs}>
            <div >
            <label>Arrhenius Constant (units)</label>
            <input type="number"></input>
            </div>

            <div>
            <label>Activation Energy (units)</label>
            <input type="number"></input>
            </div>

            <div>
            <label>Temperature (units)</label>
            <input type ="number"></input>
            </div>
           
            
            
         </div>
     </div>


    );
}

export default RateConstant ;