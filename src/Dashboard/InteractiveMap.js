import styles from "./InteractiveMap.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";



import React, { useEffect,  useState } from "react";


import { usePosition } from "../Contexts/PositionContext";
import MapWeth from "./MapWeth";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const api = process.env.REACT_APP_weather_api;

function InteractiveMap() {
  const [locError, setLocError] = useState("");
  const { position, isLoading, error, setError } = usePosition();

  const [loadingNewPos, setLoadingNewPos] = useState(false);
  const [temp, setTemp] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [seaLevel, setSealevel] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [timeZone, setTimeZone] = useState(null);

  // pollution
  const [aqi, setAqi] = useState(null);
  const [co, setCo] = useState(null);
  const [no, setNo] = useState(null);
  const [no2, setNo2] = useState(null);
  const [o3, setO3] = useState(null);
  const [so2, setSo2] = useState(null);
  const [pm2_5, setPm2_5] = useState(null); //Fine Particles Matter
  const [pm10, setpm10] = useState(null); //Coarse particulate matter
  const [nh3, setnh3] = useState(null); //ammonia

  const [openDetial, setOpenDetail] = useState(true);

  // city name
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);

  const aqiValues = ["abc", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

 

  const [clickPosition, setClickPosition] = useState([]);
  const [myPosition, setMyPosition] = useState([51.505, -0.09]);

  useEffect(
    function () {
      
      async function getLocWeather() {
        setLoadingNewPos(true);
        try {
          setLocError("");

          let lat, lng;

          if (clickPosition && clickPosition.length === 2) {
          
            [lat, lng] = clickPosition;
          } else if (isLoading) {
            return;
          } else if (position && position.latitude && position.longitude) {
            
            lat = position.latitude;
            lng = position.longitude;
          } else {
            
            [lat, lng] = [51.505, -0.09];
          }
          const response = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );

          const res1 = await fetch(
            ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${api}`
          );

          const res2 = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${api}`
          );

          const data1 = await res1.json();
          const data2 = await res2.json();

          setTemp(data1.main.temp);
          setPressure(data1.main.pressure);
          setHumidity(data1.main.humidity);
          setSealevel(data1.main.sea_level);
          setWindSpeed(data1.wind.speed);
          setTimeZone(data1.timezone);

          setAqi(data2.list[0].main.aqi);
          setCo(data2.list[0].components.co);
          setNo(data2.list[0].components.no);
          setNo2(data2.list[0].components.no2);
          setO3(data2.list[0].components.o3);
          setSo2(data2.list[0].components.so2);
          setPm2_5(data2.list[0].components.pm2_5);
          setpm10(data2.list[0].components.pm10);
          setnh3(data2.list[0].components.nh3);

          const data = await response.json();


          if (!data.countryCode) {
            throw new Error(
              "This is not any valid point, or you might have zoomed out to much come close"
            );
          }

          setName(data.city || data.locality || "");
          setCountry(data.countryName || "");
        } catch (err) {
          console.log(err);
          setMyPosition([51.505, -0.09]);
          setLocError(err.message);
        } finally {
          setLoadingNewPos(false);
        }
      }

      getLocWeather();
    },
    [position, clickPosition]
  );

  const handleMapClick = (coordinates) => {
    const { lat, lng } = coordinates;

    if (lat && lng) {
      setClickPosition([lat, lng]);
      setOpenDetail(true);
      setError(null);
    }
  };

  //Framer Animation

  const controls = useAnimation();
  const [refdiv, inViewdiv] = useInView();
  const [refh1, inViewh1] = useInView();
  const [refMap, inViewMap] = useInView();

  useEffect(() => {
    if (inViewh1) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, duration: 1 },
      });
    }

    if (inViewdiv) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7 },
      });
    }

    if (inViewMap) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7 },
      });
    }
  }, [inViewh1, inViewdiv, inViewMap, controls]);


  return (
    <motion.div className={styles.section}>
      <motion.h1
        ref={refh1}
        animate={controls}
        initial={{ opacity: 0, y: 70 }}
        className={styles.heading}
      >
        Our Interactive Map Based Weather
      </motion.h1>
      <div
        className={`${styles.container} ${
          openDetial ? styles["show-details"] : ""
        }`}
      >
        <motion.div
          className={styles.mapContainer}
          ref={refMap}
          animate={controls}
          initial={{ opacity: 0, x: -70 }}
        >
          <MapWeth onMapClick={handleMapClick} />
        </motion.div>
        <button
          className={styles["open-Details"]}
          onClick={() => {
            console.log("clicked");
            setOpenDetail((e) => !e);
          }}
        >
          <FontAwesomeIcon
            icon={openDetial ? faXmark : faBars}
            className={styles.icon}
          />
        </button>
        <motion.div
          className={styles.details}
          ref={refdiv}
          animate={controls}
          initial={{ opacity: 0, x: 50 }}
        >
          {isLoading && <h1>Loading...</h1>}
          {loadingNewPos && <h1>Loading...</h1>}
          {!loadingNewPos && locError && <p>{locError}</p>}

          {!isLoading && !loadingNewPos && !locError && (
            <div className={styles["animate-details"]}>
              <h1 className={styles.city}>{`${name} ${country}`}</h1>

              {
                <div className={styles.weatherInfo}>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img src="./images/weather/hot.png" alt="temperature" />
                      <p>Temperature:</p>
                    </span>
                    <span className={styles.value}>{temp} &nbsp;&deg;C</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/pressure-gauge.png"
                        alt="pressure"
                      />
                      <p>Pressure:</p>
                    </span>
                    <span className={styles.value}>{pressure} &nbsp;hPa</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img src="./images/weather/cloud.png" alt="humidity" />
                      <p>Humidity:</p>
                    </span>
                    <span className={styles.value}>{humidity} &nbsp;%</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/sea-level.png"
                        alt="sea level"
                      />
                      <p>Sea Level:</p>
                    </span>
                    <span className={styles.value}>{seaLevel} &nbsp;hPa</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img src="./images/weather/wind.png" alt="wind" />
                      <p>Wind Speed:</p>
                    </span>
                    <span className={styles.value}>
                      {windSpeed} &nbsp; m/sec
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/time-zone.png"
                        alt="time zone"
                      />
                      <p>Time Zone:</p>
                    </span>
                    <span className={styles.value}>{timeZone}&nbsp;UTC</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/air-quality-sensor.png"
                        alt="air quality index"
                      />
                      <p>Air Quality Index (AQI):</p>
                    </span>
                    <span className={styles.value}>
                      {aqiValues[aqi]}&nbsp;AQI
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/gas-detector.png"
                        alt="carbon monoxide"
                      />
                      <p>Carbon Monoxide:</p>
                    </span>
                    <span className={styles.value}>
                      {co}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/nitrogen.png"
                        alt="nitrogen monodie"
                      />
                      <p>Nitrogen Monoxide:</p>
                    </span>
                    <span className={styles.value}>
                      {no}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/dioxide.png"
                        alt="nitrogen dioxide"
                      />
                      <p>Nitrogen Dioxide:</p>
                    </span>
                    <span className={styles.value}>
                      {no2}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img src="./images/weather/ozone.png" alt="ozone" />
                      <p>Ozone:</p>
                    </span>
                    <span className={styles.value}>
                      {o3}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/fire.png"
                        alt="sulphur dioxide"
                      />
                      <p>Sulphur Dioxide:</p>
                    </span>
                    <span className={styles.value}>
                      {so2}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/pm2.5.png"
                        alt="fine particles"
                      />
                      <p>Fine Particles Matter (PM2.5):</p>
                    </span>
                    <span className={styles.value}>
                      {pm2_5}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img
                        src="./images/weather/pm10.png"
                        alt="course particles"
                      />
                      <p>Coarse Particulate Matter (PM10):</p>
                    </span>
                    <span className={styles.value}>
                      {pm10}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      <img src="./images/weather/ammonia.png" alt="ammonia" />
                      <p>Ammonia:</p>
                    </span>
                    <span className={styles.value}>
                      {nh3}&nbsp;&#956;g/m<sup>3</sup>
                    </span>
                  </div>
                </div>
              }
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}



export default InteractiveMap;
