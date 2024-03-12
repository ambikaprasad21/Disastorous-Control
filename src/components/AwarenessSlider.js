import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./AwarenessSlider.module.css";
import { useEffect } from "react";

function AwarenessSlider() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }
  }, [inView, controls]);
  return (
    <motion.div
      className={styles.section}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
    >
      <div className={styles.slider}>
        <div className={styles["slide-track"]}>
          <div className={styles.slide}>
            <img src="images/co2.jpg" alt="co2 emission" />
            <p className={styles["cards-label"]}>CO2 Emmission</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>

          <div className={styles.slide}>
            <img src="images/droughts.jpg" alt="droughts " />
            <p className={styles["cards-label"]}>Droughts</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/flood.jpeg" alt="flood " />
            <p className={styles["cards-label"]}>Floods</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/ozone.jpg" alt="ozone " />
            <p className={styles["cards-label"]}>Ozone Hole</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/tsunami.jpg" alt="tsunami " />
            <p className={styles["cards-label"]}>Tsunami</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/valcanic.webp" alt="valcanic " />
            <p className={styles["cards-label"]}>Volcanic Eruption</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>

          {/* double images */}
          <div className={styles.slide}>
            <img src="images/co2.jpg" alt="co2 emission" />
            <p className={styles["cards-label"]}>CO2 Emmission</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/droughts.jpg" alt="droughts " />
            <p className={styles["cards-label"]}>Droughts</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/flood.jpeg" alt="flood " />
            <p className={styles["cards-label"]}>Floods</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/ozone.jpg" alt="ozone " />
            <p className={styles["cards-label"]}>Ozone Hole</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/tsunami.jpg" alt="tsunami " />
            <p className={styles["cards-label"]}>Tsunami</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
          <div className={styles.slide}>
            <img src="images/valcanic.webp" alt="valcanic " />
            <p className={styles["cards-label"]}>Volcanic Eruption</p>
            <button className={styles.btn}>
              <Link className={styles.learn}>Learn More &rarr;</Link>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AwarenessSlider;
