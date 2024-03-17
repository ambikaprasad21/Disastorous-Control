import styles from "./Volcano.module.css";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import axios from "axios";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import L from "leaflet";

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
    axios
      .get("https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/volcanolocs")
      .then((response) => {
        const fetchedVolcanoes = response.data.items;
        setVolcanoes(fetchedVolcanoes);

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
        </div>
        <Map position={mapCenter} volcanoes={volcanoes} />
      </div>
    </motion.div>
  );
}

export default Volcano;
