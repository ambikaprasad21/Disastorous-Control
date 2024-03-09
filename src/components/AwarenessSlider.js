import { Link } from "react-router-dom";
import styles from "./AwarenessSlider.module.css";

function AwarenessSlider() {
  return (
    <div className={styles.section}>
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
    </div>
  );
}

export default AwarenessSlider;
