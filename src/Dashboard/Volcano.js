import styles from "./Volcano.module.css";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
// import { Icon } from "leaflet";
import axios from "axios";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import L from "leaflet"; // Import Leaflet library
// import customMarker from "./images/volcano_marker.png";

// Create a custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: "./images/volcano_marker.png",
  iconSize: [30, 50],
  iconAnchor: [12, 41],
});

const Map = ({ position, volcanoes }) => {
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

      {volcanoes.map((volcano) => (
        <Marker
          key={volcano.id}
          position={[volcano.latitude, volcano.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>{volcano.name}</strong>
            <br />
            Country: {volcano.country}
            <br />
            Elevation: {volcano.elevation} meters
            <br />
            Morphology: {volcano.morphology}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

function Volcano() {
  const [volcanoes, setVolcanoes] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);

  const controls = useAnimation();
  const [refdiv, inViewdiv] = useInView();

  useEffect(() => {
    if (inViewdiv) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7 },
      });
    }
  }, [inViewdiv, controls]);

  useEffect(() => {
    // Fetch volcano data from the provided API
    axios
      .get("https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/volcanolocs")
      .then((response) => {
        const fetchedVolcanoes = response.data.items;
        setVolcanoes(fetchedVolcanoes);

        // Find the center of the map based on the first volcano's coordinates
        if (fetchedVolcanoes.length > 0) {
          setMapCenter([
            fetchedVolcanoes[0].latitude,
            fetchedVolcanoes[0].longitude,
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching volcano data:", error);
      });
  }, []);
  return (
    <motion.div
      className={styles.section}
      animate={controls}
      ref={refdiv}
      initial={{ opacity: 0, x: -100 }}
    >
      <div className={styles.container}>
        <div className={styles.description}>
          <h2>Valcanos</h2>
          <div className={styles.para}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={styles.quote}
            >
              <g>
                <path
                  fill="white"
                  d="M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
                />
              </g>
            </svg> */}
            <blockquote>
              <div className={styles.text}>
                <p>
                  Keep a watchful eye on the planet's volcanic activity with our
                  Recent Volcanic Eruptions Alert. Stay informed about the
                  latest volcanic eruptions worldwide, featuring details on
                  eruption intensity, affected regions, and potential risks.
                  Explore an interactive map to visualize the active volcanoes
                  and their recent activities. Our goal is to provide timely
                  information to help you understand volcanic events and their
                  potential impacts. Stay prepared and informed with our
                  comprehensive volcanic eruptions tracking system.
                </p>
              </div>
            </blockquote>
          </div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles["last-quote"]}
            // style={{}}
          >
            <g>
              <path
                fill="white"
                d="M14.417 6.679C15.447 7.773 16 9 16 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C9.591 12.322 8.17 10.841 8.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z"
              />
            </g>
          </svg> */}
        </div>
        <Map position={mapCenter} volcanoes={volcanoes} />
      </div>
    </motion.div>
  );
}

export default Volcano;
