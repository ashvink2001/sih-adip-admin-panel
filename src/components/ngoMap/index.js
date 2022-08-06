import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const NgoMap = ({ nogDetail }) => {
  const [location, setLocation] = useState({
    lat: "10.3761497",
    lng: "77.9898923",
    placeName: "Please Select Camp",
  });
  useEffect(() => {
    console.log(nogDetail);
    if (nogDetail && Object.keys(nogDetail).length > 0) {
      setLocation(nogDetail);
    }
  }, [nogDetail]);

  return (
    <>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[location.lat, location.lng]}
          draggable={true}
          animate={true}
        >
          <Popup>{location.placeName}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default NgoMap;
