import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./Location.css";
import { colors, Paper } from "@mui/material";

function Location({ devices, showAll }) {
  if (devices[0] === undefined || devices[0] === null) {
    return null;
  }

  if (!showAll && devices.length === 1) {
    return (
      <Paper elevation={3} className="paper">
        <MapContainer
          center={[devices[0].coords.latitude, devices[0].coords.longitude]}
          zoom={16}
          style={{ height: "500px", width: "800px", borderRadius: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[devices[0].coords.latitude, devices[0].coords.longitude]}
          >
            <Popup className="popup">
              {devices[0].device} ({devices[0].coords.latitude},{" "}
              {devices[0].coords.longitude})
            </Popup>
          </Marker>
          <MapUpdater
            coords={[devices[0].coords.latitude, devices[0].coords.longitude]}
          />
        </MapContainer>
      </Paper>
    );
  }

  if (devices.length > 1 && showAll) {
    return (
      <Paper elevation={3} className="paper">
        <MapContainer
          center={[devices[0].coords.latitude, devices[0].coords.longitude]}
          zoom={16}
          style={{ height: "500px", width: "800px", borderRadius: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {devices.map((device, index) => (
            <Marker
              key={index}
              position={[device.coords.latitude, device.coords.longitude]}
            >
              <Popup>
                {device.device} ({device.coords.latitude},{" "}
                {device.coords.longitude})
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className="paper">
      <MapContainer
        center={[devices[0].coords.latitude, devices[0].coords.longitude]}
        zoom={16}
        style={{ height: "500px", width: "800px", borderRadius: 10 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Paper>
  );
}

function MapUpdater({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

export default Location;
