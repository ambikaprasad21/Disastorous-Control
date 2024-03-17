import { useMap, useMapEvents } from "react-leaflet";

function DetectClick({ newCenter, onMapClick }) {
  const map = useMap();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      map.setView([lat, lng], map.getZoom());
      onMapClick({ lat, lng });
      newCenter({ lat, lng });
    },
  });
  return null;
}

export default DetectClick;
