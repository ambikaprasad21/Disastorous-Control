import styles from "./InteractiveMap.module.css";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import React, { useEffect, useState } from "react";
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

const Map = ({ position, onMapClick }) => {
  return (
    <MapContainer
      center={position}
      zoom={2}
      minZoom={2}
      // zoomControl={false}
      style={{ height: "70vh" }}
      className={styles.map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {position && (
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
              `${position[0]?.toFixed(2) || ""}, ${
                position[1]?.toFixed(2) || ""
              }`}
          </Popup>
        </Marker>
      )}

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

  console.log(position);

  let [myPosition, setMyPosition] = useState(position || [51.505, -0.09]);

  useEffect(
    function () {
      if (position) {
        const lat = position.latitude;
        const lng = position.longitude;
        setMyPosition([lat, lng]);
      }
    },
    [position]
  );

  useEffect(
    function () {
      async function getLocation() {
        try {
          console.log(myPosition[0], myPosition[1]);
          const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${
              myPosition && myPosition[0]
            }&lon=${
              myPosition && myPosition[1]
            }&limit=1&appid=f49c0c5316f07e73f736e7539d1419a1`
          );

          const data = await response.json();
          console.log(data);

          if (!data) {
            throw new Error(
              "This is not any valid point, or you might have zoomed out to much come close"
            );
          }
          setName(data[0].name);

          setCountry(data[0].country);
          // setName(data.name || data.locality);
          // setCountry(data.countryName);
        } catch (err) {
          console.log(err);
          setMyPosition([51.505, -0.09]);
          setLocError(true);
        }
      }

      getLocation();
    },
    [myPosition]
  );

  useEffect(
    function () {
      async function getData() {
        if (myPosition) {
          setLoadingNewPos(true);
          try {
            const res1 = await fetch(
              ` https://api.openweathermap.org/data/2.5/weather?lat=${
                myPosition && myPosition[0]
              }&lon=${
                myPosition && myPosition[1]
              }&appid=f49c0c5316f07e73f736e7539d1419a1`
            );

            const res2 = await fetch(
              `http://api.openweathermap.org/data/2.5/air_pollution?lat=${
                myPosition && myPosition[0]
              }&lon=${
                myPosition && myPosition[1]
              }&appid=f49c0c5316f07e73f736e7539d1419a1`
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
          } catch (err) {
            console.log(err.message);
          } finally {
            setLoadingNewPos(false);
          }
        }
      }

      getData();
    },
    [myPosition]
  );

  useEffect(
    function () {
      setLocError(false);
    },
    [locError]
  );

  const handleMapClick = (coordinates) => {
    const { lat, lng } = coordinates;

    if (lat !== undefined && lng !== undefined) {
      setMyPosition([lat, lng]);
      setError(null);
    }
  };

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
          <Map
            position={myPosition ? myPosition : [51.505, -0.09]}
            onMapClick={handleMapClick}
          />
        </motion.div>

        <motion.div
          className={styles.details}
          ref={refdiv}
          animate={controls}
          initial={{ opacity: 0, x: 50 }}
        >
          {/* {locError && <p>{locError}</p>} */}
          {loadingNewPos ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h1 className={styles.city}>{`${name} ${country}`}</h1>
              {/* {myPosition && <p>{`${myPosition[0]}, ${myPosition[1]}`}</p>} */}
              {/* {isLoading && !error && <p>Loading...</p>} */}
              {/* {error && <p>{error}</p>} */}

              {
                <div className={styles.weatherInfo}>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Temperature:</span>
                    <span className={styles.value}>{temp}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Pressure:</span>
                    <span className={styles.value}>{pressure}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Humidity:</span>
                    <span className={styles.value}>{humidity}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Sea Level:</span>
                    <span className={styles.value}>{seaLevel}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Wind Speed:</span>
                    <span className={styles.value}>{windSpeed}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Time Zone:</span>
                    <span className={styles.value}>{timeZone}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      Air Quality Index (AQI):
                    </span>
                    <span className={styles.value}>{aqiValues[aqi]}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Carbon Monoxide:</span>
                    <span className={styles.value}>{co}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Nitrogen Monoxide:</span>
                    <span className={styles.value}>{no}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Nitrogen Dioxide:</span>
                    <span className={styles.value}>{no2}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Ozone:</span>
                    <span className={styles.value}>{o3}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Sulphur Dioxide:</span>
                    <span className={styles.value}>{so2}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      Fine Particles Matter (PM2.5):
                    </span>
                    <span className={styles.value}>{pm2_5}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>
                      Coarse Particulate Matter (PM10):
                    </span>
                    <span className={styles.value}>{pm10}</span>
                  </div>
                  <div className={styles.weatherInfoItem}>
                    <span className={styles.label}>Ammonia:</span>
                    <span className={styles.value}>{nh3}</span>
                  </div>
                </div>

                // <div>
                //   <p>Temp: {temp}</p>
                //   <p>pressure : {pressure}</p>
                //   <p>humidity: {humidity}</p>
                //   <p>seaLevel: {seaLevel}</p>
                //   <p>windSpeed: {windSpeed}</p>
                //   <p>timeZone: {timeZone}</p>
                //   <p>aqi: {aqiValues[aqi]}</p>
                //   <p>Carbon monoxide: {co}</p>
                //   <p>Nitrogen MonoOxide: {no}</p>
                //   <p>Nitrogen dioxide: {no2}</p>
                //   <p>Ozone: {o3}</p>
                //   <p>sulphur dioxide: {so2}</p>
                //   <p>fine particles matter: {pm2_5}</p>
                //   <p>course particulate matter: {pm10}</p>
                //   <p>Ammonia: {nh3}</p>
                // </div>
              }
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
});

function DetectClick({ onMapClick }) {
  const map = useMap();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      map.setView([lat, lng], map.getZoom());
      onMapClick({ lat, lng });
    },
  });
}

export default InteractiveMap;
