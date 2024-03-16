import styles from "./Reyleigh.module.css";

function Reyleigh(){


    return(
        <div className={styles.container}>
        <h1>please enter</h1>
        <div className={styles.inputs}>
           <div >
           <label>Order of reaction (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Initial concentration (units)</label>
           <input type="number"></input>
           </div>

           <div>
           <label>Rate constant (units)</label>
           <input type ="number"></input>
           </div>
          
           
           
        </div>
    </div>





    );
}
export default Reyleigh ;