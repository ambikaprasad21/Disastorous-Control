import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

function DetectClick({ onMapClick }) {
  const map = useMap();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      map.setView([lat, lng], map.getZoom());
      onMapClick({ lat, lng });
    },
  });
  return null;
}

export default DetectClick;
