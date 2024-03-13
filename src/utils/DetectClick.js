import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

function DetectClick({ onMapClick }) {
  // useMapEvents({
  //   click: (e) => {
  //     const { lat, lng } = e.latlng;
  //     const map = e.target; // Accessing the map instance from the event
  //     const zoomLevel = map.getZoom(); // Getting the current zoom level
  //     map.setView([lat, lng], zoomLevel); // Setting the view with the current zoom level
  //     onMapClick({ lat, lng });
  //   },
  // });
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
