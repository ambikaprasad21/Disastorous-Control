import styles from "./MapWeth.module.css";

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

import DetectClick from "../utils/DetectClick";
import { usePosition } from "../Contexts/PositionContext";
import { useEffect, useState } from "react";

function MapWeth({ onMapClick }) {
  const { position, isLoading, error, setError } = usePosition();
  const [center, setCenter] = useState([51.505, -0.09]);

  const [newCenter, setNewCenter] = useState(center);

  useEffect(
    function () {
      if (position) {
        setCenter([position.latitude, position.longitude]);
        setNewCenter([position.latitude, position.longitude]);
      }
    },
    [position]
  );

  function handleNewCenter(coordinates) {
    const { lat, lng } = coordinates;

    if (lat && lng) {
      setNewCenter([lat, lng]);
    }
  }

  return (
    <MapContainer
      center={newCenter}
      zoom={5}
      minZoom={3}
      style={{ height: "80vh" }}
      className={styles.map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        position={newCenter}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          {`${newCenter[0].toFixed(2) || ""}, ${newCenter[1].toFixed(2) || ""}`}
        </Popup>
      </Marker>

      <ChangeCenter position={newCenter} />
      <DetectClick newCenter={handleNewCenter} onMapClick={onMapClick} />
    </MapContainer>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default MapWeth;
