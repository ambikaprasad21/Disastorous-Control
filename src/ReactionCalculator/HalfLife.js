import { useState } from "react";
import styles from "./HalfLife.module.css";


 

 
function HalfLife(){
   const [order, setorder] = useState(0);
  const [initconcen, setiniconcen] = useState(0);
  const [rateconstant, setrateconstant] = useState(0);
  const [answer, setanswer] = useState(0);

  function handleSolve() {
    if (+order === 1) {
      const thalf = 0.693 / rateconstant;
      setanswer(thalf.toFixed(2));
    } else {
      const first = 2 ** (order - 1) - 1;
      const second = initconcen ** (1 - order);
      const third = rateconstant * (order - 1);
      const thalf = (first * second) / third;

      setanswer(thalf);
    }
  }

    return(
        <div className={styles.container}>
         <h1>please enter</h1>
         <div className={styles.inputs}>
            <div className={styles['label-input']}>
            <label>Order of reaction (units)</label>
            <input type="number"></input>
            </div>

            <div className={styles['label-input']}>
            <label>Initial concentration (units)</label>
            <input type="number"></input>
            </div>

            <div className={styles['label-input']}>
            <label>Rate constant (units)</label>
            <input type ="number"></input>
            </div>
           
            
            
         </div>
     </div>





    );

}
export default HalfLife;
