import styles from "./RateConstant.module.css";

function RateConstant(){

    return(
     <div className={styles.container}>
         <h1>Please Enter</h1>
         <div className={styles.inputs}>
            <div className={styles['label-input']}>
            <label>Arrhenius Constant (units)</label>
            <input type="number"></input>
            </div>

            <div className={styles['label-input']}>
            <label>Activation Energy (units)</label>
            <input type="number"></input>
            </div>

            <div className={styles['label-input']}>
            <label>Temperature (units)</label>
            <input type ="number"></input>
            </div>
           
            
            
         </div>
     </div>


    );
}

export default RateConstant ;