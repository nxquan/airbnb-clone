"use client";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2X from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2X.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const Map = ({ center }: MapProps) => {
  return (
    <div className="mt-2">
      <MapContainer
        center={(center as LatLngExpression) || [51.505, -0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={true}
        className="h-[50vh] rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {center && (
          <Marker position={(center as LatLngExpression) || [51.505, -0.09]} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
