import "leaflet/dist/leaflet.css";
import { decode } from "@mapbox/polyline";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

export default function Map({ route }) {
  const polyline = decode(route);
  const limeOptions = { color: "blue" };

  function findCenter(route) {
    const lat =
      polyline.reduce((acc, point) => acc + point[0], 0) / polyline.length;
    const lng =
      polyline.reduce((acc, point) => acc + point[1], 0) / polyline.length;
    return [lat, lng];
  }
  const center = findCenter(route);

  return (
    <MapContainer
      style={{ height: 300 }}
      center={center}
      zoom={14}
      scrollWheelZoom={false}
    >
      <Polyline pathOptions={limeOptions} positions={polyline} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
