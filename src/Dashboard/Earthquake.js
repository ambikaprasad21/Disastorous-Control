import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const controls = useAnimation();
  const [refdiv, inViewdiv] = useInView();
  const mapPosition = [51.505, -0.09]; // Initial map position

  useEffect(() => {
    // Fetch earthquake data from USGS API
    async function getEarthquake() {
      const response = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );
      const data = await response.json();
      setEarthquakes(data.features);
    }

    getEarthquake();
  }, []);

  useEffect(() => {
    if (inViewdiv) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7 },
      });
    }
  }, [inViewdiv, controls]);

  return (
    <>
      <motion.div
        className={styles.section}
        animate={controls}
        ref={refdiv}
        initial={{ opacity: 0, x: -100 }}
      >
        <div className={styles.container}>
          <div className={styles.description}>
            <h2>Recent Earthquakes Map Activity</h2>
            <div className={styles.para}>
              <blockquote>
                <div className={styles.text}>
                  <p>
                    Stay informed about the latest seismic activities around the
                    world. Our Recent Earthquakes Tracker provides real-time
                    updates on recent earthquakes, including their magnitude,
                    location, and depth. Explore the dynamic map and gain
                    insights into seismic events to better understand Earth's
                    ever-changing landscape. Your safety is our priority, so
                    stay vigilant and aware with our comprehensive earthquake
                    monitoring system.
                  </p>
                </div>
              </blockquote>
            </div>
          </div>

          <Map position={mapPosition} earthquakes={earthquakes} />
        </div>
      </motion.div>
    </>
  );
};

export default Earthquake;
