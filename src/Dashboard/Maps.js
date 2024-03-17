import Earthquake from "./Earthquake";
import styles from "./Maps.module.css";
import Tsunami from "./Tsunami";
import Volcano from "./Volcano";

function Maps() {
  return (
    <>
      <h1 className={styles.heading}>Various Records</h1>
      <div className={styles.bg}>
        <div className={styles.section}>
          <Earthquake />
          {/* <Tsunami /> */}
          <Volcano />
        </div>
      </div>
    </>
  );
}

export default Maps;
