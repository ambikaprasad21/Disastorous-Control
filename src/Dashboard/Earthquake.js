import React, { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import styles from "./Earthquake.module.css";

const Map = ({ position, earthquakes }) => {
  return (
    <MapContainer
      center={position}
      zoom={2}
      style={{ height: "400px", width: "50%", borderRadius: "10px" }}
      className={styles.map}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {earthquakes.map((quake, index) => (
        <Marker
          key={index}
          position={[
            quake.geometry.coordinates[1],
            quake.geometry.coordinates[0],
          ]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            <strong>{quake.properties.place}</strong>
            <br />
            Magnitude: {quake.properties.mag}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const Earthquake = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const mapPosition = [51.505, -0.09]; // Initial map position

  useEffect(() => {
    // Fetch earthquake data from USGS API
    axios
      .get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      )
      .then((response) => {
        const fetchedEarthquakes = response.data.features;
        setEarthquakes(fetchedEarthquakes);
      })
      .catch((error) => {
        console.error("Error fetching earthquake data:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.description}>
            <h2>Recent Earthquakes Map Activity</h2>
            <div className={styles.para}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={styles.quote}
              >
                <path
                  fill="white"
                  d="M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
                />
              </svg>
              <div className={styles.text}>
                <p>
                  Stay informed about the latest seismic activities around the
                  world. Our Recent Earthquakes Tracker provides real-time
                  updates on recent earthquakes, including their magnitude,
                  location, and depth. Explore the dynamic map and gain insights
                  into seismic events to better understand Earth's ever-changing
                  landscape. Your safety is our priority, so stay vigilant and
                  aware with our comprehensive earthquake monitoring system.
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={styles["last-quote"]}
            >
              <g>
                <path
                  fill="white"
                  d="M14.417 6.679C15.447 7.773 16 9 16 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C9.591 12.322 8.17 10.841 8.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z"
                />
              </g>
            </svg>
          </div>
          <Map position={mapPosition} earthquakes={earthquakes} />
        </div>
      </div>
    </>
  );
};

export default Earthquake;
