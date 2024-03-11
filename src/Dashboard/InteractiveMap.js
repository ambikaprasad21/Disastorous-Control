import styles from "./InteractiveMap.module.css";

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
  // const [clickedPosition, setClickedPosition] = useState(position);

  return (
    <MapContainer
      center={position}
      zoom={2}
      // zoomControl={false}
      style={{ height: "70dvh", width: "75%" }}
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
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);

  const aqiValues = ["abc", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

  console.log(position);

  let [myPosition, setMyPosition] = useState([51.505, -0.09]);

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

  // let myPosition = position ? [position.latitude, position.longitude] : null;
  const [clickedPosition, setClickedPosition] = useState(null);

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

            const revGeocoding = await fetch(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${
                myPosition && myPosition[0]
              }&lon=${
                myPosition && myPosition[1]
              }&limit=1&appid=f49c0c5316f07e73f736e7539d1419a1`
            );
            const data1 = await res1.json();
            const data2 = await res2.json();
            const cityName = await revGeocoding.json();

            setTemp(data1.main.temp);
            setPressure(data1.main.pressure);
            setHumidity(data1.main.humidity);
            setSealevel(data1.main.sea_level);
            setWindSpeed(data1.wind.speed);
            setTimeZone(data1.timezone);

            // console.log(data2.list[0].main.aqi);

            setAqi(data2.list[0].main.aqi);
            setCo(data2.list[0].components.co);
            setNo(data2.list[0].components.no);
            setNo2(data2.list[0].components.no2);
            setO3(data2.list[0].components.o3);
            setSo2(data2.list[0].components.so2);
            setPm2_5(data2.list[0].components.pm2_5);
            setpm10(data2.list[0].components.pm10);
            setnh3(data2.list[0].components.nh3);

            setName(cityName[0].name);
            setState(cityName[0].state);
            setCountry(cityName[0].country);
            // setCity(cityName);
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

  // Function to handle the map click event
  const handleMapClick = (coordinates) => {
    // console.log(coordinates);
    const { lat, lng } = coordinates;

    // Check if lat and lng are defined before updating state
    if (lat !== undefined && lng !== undefined) {
      setClickedPosition([lat, lng]);
      setMyPosition([lat, lng]);
      setError(null);
    }
  };

  // myPosition = clickedPosition ? [...clickedPosition] : null;

  return (
    <div className={styles.section}>
      <h1>Our Interactive Map Based Weather</h1>
      <div className={styles.container}>
        <Map
          position={myPosition ? myPosition : [51.505, -0.09]}
          onMapClick={handleMapClick}
        />

        <div className={styles.details}>
          {loadingNewPos ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h1>{`${name} ${state} ${country}`}</h1>
              {myPosition && <p>{`${myPosition[0]}, ${myPosition[1]}`}</p>}
              {isLoading && !error && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {!isLoading && !error && <h2>Information</h2>}
              {
                <>
                  <p>Temp: {temp}</p>
                  <p>pressure : {pressure}</p>
                  <p>humidity: {humidity}</p>
                  <p>seaLevel: {seaLevel}</p>
                  <p>windSpeed: {windSpeed}</p>
                  <p>timeZone: {timeZone}</p>
                  <p>aqi: {aqiValues[aqi]}</p>
                  <p>Carbon monoxide: {co}</p>
                  <p>Nitrogen MonoOxide: {no}</p>
                  <p>Nitrogen dioxide: {no2}</p>
                  <p>Ozone: {o3}</p>
                  <p>sulphur dioxide: {so2}</p>
                  <p>fine particles matter: {pm2_5}</p>
                  <p>course particulate matter: {pm10}</p>
                  <p>Ammonia: {nh3}</p>
                </>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
});

function DetectClick({ onMapClick }) {
  const map = useMap();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      // console.log(`Clicked at: Latitude ${lat}, Longitude ${lng}`);

      // Center the map around the clicked coordinates
      map.setView([lat, lng], map.getZoom());
      onMapClick({ lat, lng });
    },
  });
}

export default InteractiveMap;
