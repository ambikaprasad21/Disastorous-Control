import Earthquake from "./Earthquake";
import styles from "./Maps.module.css";
import Tsunami from "./Tsunami";

function Maps() {
  return (
    <div className={styles.bg}>
      <div className={styles.section}>
        <Earthquake />
        <Tsunami />
      </div>
    </div>
  );
}

export default Maps;
