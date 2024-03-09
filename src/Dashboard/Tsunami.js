import styles from "./Tsunami.module.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

function Tsunami() {
  const position = [51.505, -0.09]; // Initial map position
  return (
    <div className={styles.section}>
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
    </div>
  );
}

export default Tsunami;
