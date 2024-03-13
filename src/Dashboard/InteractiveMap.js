import styles from "./InteractiveMap.module.css";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import DetectClick from "../utils/DetectClick";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  getZoom,
  Marker,
  Popup,
} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import { usePosition } from "../Contexts/PositionContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const Map = ({ position, onMapClick }) => {
  return (
    <MapContainer
      center={position}
      zoom={5}
      enableHighAccuracy={true}
      // minZoom={5}
      // zoomControl={false}
      style={{ height: "80vh" }}
      className={styles.map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        position={position || [51.505, -0.09]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          {position &&
            `${position[0].toFixed(2) || ""}, ${position[1].toFixed(2) || ""}`}
        </Popup>
      </Marker>

      <ChangeCenter position={position} />
      <DetectClick onMapClick={onMapClick} />
    </MapContainer>
  );
};

const InteractiveMap = React.memo(({ onMapClick }) => {
  const [locError, setLocError] = useState(false);
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

  // city name
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);

  const aqiValues = ["abc", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

  // console.log(position);

  const [myPosition, setMyPosition] = useState(
    position ? [position.latitude, position.longitude] : [51.505, -0.09]
  );

  // Update myPosition when position context changes
  useEffect(() => {
    if (position) {
      setMyPosition([position.latitude, position.longitude]);
    }
  }, [position]);

  // useEffect(
  //   function () {
  //     if (position) {
  //       const lat = position.latitude;
  //       const lng = position.longitude;
  //       setMyPosition([lat, lng]);
  //     }
  //   },
  //   [position]
  // );

  useEffect(
    function () {
      // if (!myPosition) return;
      async function getLocWeather() {
        setLoadingNewPos(true);
        try {
          setLocError(false);
          // console.log(myPosition[0], myPosition[1]);
          const response = await fetch(
            `${BASE_URL}?latitude=${myPosition[0]}&longitude=${myPosition[1]}`
          );

          const res1 = await fetch(
            ` https://api.openweathermap.org/data/2.5/weather?lat=${myPosition[0]}&lon=${myPosition[1]}&units=metric&appid=f49c0c5316f07e73f736e7539d1419a1`
          );

          const res2 = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${myPosition[0]}&lon=${myPosition[1]}&appid=f49c0c5316f07e73f736e7539d1419a1`
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

          // console.log(data);

          if (!data.countryCode) {
            throw new Error(
              "This is not any valid point, or you might have zoomed out to much come close"
            );
          }

          setName(data.city || data.locality || "");
          setCountry(data.countryName);

          // setName(data[0].local_names.en);

          // setCountry(data[0].country);
        } catch (err) {
          // console.log(err);
          setMyPosition([51.505, -0.09]);
          setLocError(true);
        } finally {
          setLoadingNewPos(false);
        }
      }

      // async function getData() {
      //   setLoadingNewPos(true);
      //   try {
      //     const res1 = await fetch(
      //       ` https://api.openweathermap.org/data/2.5/weather?lat=${myPosition[0]}&lon=${myPosition[1]}&units=metric&appid=f49c0c5316f07e73f736e7539d1419a1`
      //     );

      //     const res2 = await fetch(
      //       `http://api.openweathermap.org/data/2.5/air_pollution?lat=${myPosition[0]}&lon=${myPosition[1]}&appid=f49c0c5316f07e73f736e7539d1419a1`
      //     );

      //     const data1 = await res1.json();
      //     const data2 = await res2.json();

      //     setTemp(data1.main.temp);
      //     setPressure(data1.main.pressure);
      //     setHumidity(data1.main.humidity);
      //     setSealevel(data1.main.sea_level);
      //     setWindSpeed(data1.wind.speed);
      //     setTimeZone(data1.timezone);

      //     setAqi(data2.list[0].main.aqi);
      //     setCo(data2.list[0].components.co);
      //     setNo(data2.list[0].components.no);
      //     setNo2(data2.list[0].components.no2);
      //     setO3(data2.list[0].components.o3);
      //     setSo2(data2.list[0].components.so2);
      //     setPm2_5(data2.list[0].components.pm2_5);
      //     setpm10(data2.list[0].components.pm10);
      //     setnh3(data2.list[0].components.nh3);
      //   } catch (err) {
      //     console.log(err.message);
      //   } finally {
      //     setLoadingNewPos(false);
      //   }
      // }

      // getData();

      getLocWeather();
    },
    [myPosition]
  );

  // const prevMyPositionRef = useRef(null);

  // useEffect(
  //   function () {
  //     async function getData() {
  //       setLoadingNewPos(true);
  //       try {
  //         const res1 = await fetch(
  //           ` https://api.openweathermap.org/data/2.5/weather?lat=${myPosition[0]}&lon=${myPosition[1]}&units=metric&appid=f49c0c5316f07e73f736e7539d1419a1`
  //         );

  //         const res2 = await fetch(
  //           `http://api.openweathermap.org/data/2.5/air_pollution?lat=${myPosition[0]}&lon=${myPosition[1]}&appid=f49c0c5316f07e73f736e7539d1419a1`
  //         );

  //         const data1 = await res1.json();
  //         const data2 = await res2.json();

  //         setTemp(data1.main.temp);
  //         setPressure(data1.main.pressure);
  //         setHumidity(data1.main.humidity);
  //         setSealevel(data1.main.sea_level);
  //         setWindSpeed(data1.wind.speed);
  //         setTimeZone(data1.timezone);

  //         setAqi(data2.list[0].main.aqi);
  //         setCo(data2.list[0].components.co);
  //         setNo(data2.list[0].components.no);
  //         setNo2(data2.list[0].components.no2);
  //         setO3(data2.list[0].components.o3);
  //         setSo2(data2.list[0].components.so2);
  //         setPm2_5(data2.list[0].components.pm2_5);
  //         setpm10(data2.list[0].components.pm10);
  //         setnh3(data2.list[0].components.nh3);
  //       } catch (err) {
  //         console.log(err.message);
  //       } finally {
  //         setLoadingNewPos(false);
  //       }
  //     }

  //     getData();
  //   },
  //   [myPosition]
  // );

  const handleMapClick = (coordinates) => {
    const { lat, lng } = coordinates;

    if (lat && lng) {
      setMyPosition([lat, lng]);
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
      <div className={styles.container}>
        <motion.div
          className={styles.mapContainer}
          ref={refMap}
          animate={controls}
          initial={{ opacity: 0, x: -70 }}
        >
          <Map position={myPosition} onMapClick={handleMapClick} />
        </motion.div>

        <motion.div
          className={styles.details}
          ref={refdiv}
          animate={controls}
          initial={{ opacity: 0, x: 50 }}
        >
          {isLoading && <h1>Loading...</h1>}
          {loadingNewPos && <h1>Loading...</h1>}

          {/* {loadingNewPos && <h1>Loading...</h1>} */}
          {!isLoading && !loadingNewPos && (
            <>
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
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
});

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// function DetectClick({ onMapClick }) {
//   const map = useMap();
//   useMapEvents({
//     click: (e) => {
//       const { lat, lng } = e.latlng;
//       map.setView([lat, lng], map.getZoom());
//       onMapClick({ lat, lng });
//     },
//   });
// }

export default InteractiveMap;
