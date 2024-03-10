import styles from "./InteractiveMap.module.css";

import React, { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

const Map = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={2}
      zoomControl={false}
      style={{ height: "400px", width: "75%", borderRadius: "10px" }}
      className={styles.map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* {earthquakes.map((quake, index) => (
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
</Marker> */}
      {/* ))} */}
    </MapContainer>
  );
};

function InteractiveMap() {
  const position = [51.505, -0.09];
  return (
    <div className={styles.container}>
      <h1>Our Interactive Map Based Weather</h1>
      <div className={styles.section}>
        <Map position={position} />
        <div className={styles.details}>
          <h2>Information</h2>
        </div>
      </div>
    </div>
  );
}

export default InteractiveMap;
