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
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/co2.jpg" alt="co2 emission" />
            <p className={styles["cards-label"]}>CO2 Emmission</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://ourworldindata.org/co2-emissions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>

          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/droughts.jpg" alt="droughts " />
            <p className={styles["cards-label"]}>Droughts</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.nature.com/articles/s41598-022-18511-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/flood.jpeg" alt="flood " />
            <p className={styles["cards-label"]}>Floods</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.cdc.gov/disasters/floods/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/ozone.jpg" alt="ozone " />
            <p className={styles["cards-label"]}>Ozone Hole</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.eea.europa.eu/en/topics/in-depth/climate-change-mitigation-reducing-emissions/current-state-of-the-ozone-layer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/tsunami.jpg" alt="tsunami " />
            <p className={styles["cards-label"]}>Tsunami</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.cdc.gov/disasters/tsunamis/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/valcanic.webp" alt="valcanic " />
            <p className={styles["cards-label"]}>Volcanic Eruption</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.cdc.gov/disasters/volcanoes/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>

          {/* double images */}
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/co2.jpg" alt="co2 emission" />
            <p className={styles["cards-label"]}>CO2 Emmission</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://ourworldindata.org/co2-emissions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/droughts.jpg" alt="droughts " />
            <p className={styles["cards-label"]}>Droughts</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.nature.com/articles/s41598-022-18511-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/flood.jpeg" alt="flood " />
            <p className={styles["cards-label"]}>Floods</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.cdc.gov/disasters/floods/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/ozone.jpg" alt="ozone " />
            <p className={styles["cards-label"]}>Ozone Hole</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.eea.europa.eu/en/topics/in-depth/climate-change-mitigation-reducing-emissions/current-state-of-the-ozone-layer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/tsunami.jpg" alt="tsunami " />
            <p className={styles["cards-label"]}>Tsunami</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.cdc.gov/disasters/tsunamis/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
          <motion.div className={styles.slide} whileHover={{ scale: 1.1 }}>
            <img src="images/valcanic.webp" alt="valcanic " />
            <p className={styles["cards-label"]}>Volcanic Eruption</p>
            <button className={styles.btn}>
              <Link
                className={styles.learn}
                to="https://www.cdc.gov/disasters/volcanoes/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More &rarr;
              </Link>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AwarenessSlider;
