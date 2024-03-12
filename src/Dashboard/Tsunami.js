import styles from "./Tsunami.module.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

function Tsunami() {
  const position = [51.505, -0.09]; // Initial map position
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
  return (
    <motion.div
      className={styles.section}
      animate={controls}
      ref={refdiv}
      initial={{ opacity: 0, x: 100 }}
    >
      <div className={styles.container}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "50%", borderRadius: "10px" }}
          className={styles.map}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <p>Hello</p>
      </div>
    </motion.div>
  );
}

export default Tsunami;
