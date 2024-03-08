import AwarenessSlider from "../components/AwarenessSlider";
import styles from "./Awareness.module.css";

function Awareness() {
  return (
    <div className={styles.section}>
      <h1>AWARENESS</h1>
      <AwarenessSlider />
    </div>
  );
}

export default Awareness;
