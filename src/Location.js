import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./Location.css";
import { convertUnixToISO8601 } from "./utils";
import { Paper } from "@mui/material";

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
          style={{ height: "60vh", width: "100%", borderRadius: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[devices[0].coords.latitude, devices[0].coords.longitude]}
          >
            <Popup className="popup">
              <p>{`${devices[0].device}\n(${devices[0].coords.latitude}, ${devices[0].coords.longitude})\n${convertUnixToISO8601(devices[0].timestamp)}`}</p>
            </Popup>
          </Marker>
          <MapUpdater
            coords={[devices[0].coords.latitude, devices[0].coords.longitude]}
          />
        </MapContainer>
      </Paper>
    );
  }

  if (devices.length >= 1 && showAll) {
    return (
      <Paper elevation={3} className="paper">
        <MapContainer
          center={[devices[0].coords.latitude, devices[0].coords.longitude]}
          zoom={16}
          style={{ height: "60vh", width: "100%", borderRadius: 10 }}
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
                <p>{`${device.device}\n(${device.coords.latitude}, ${device.coords.longitude})\n${convertUnixToISO8601(device.timestamp)}`}</p>
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
        style={{ height: "60vh", width: "100%", borderRadius: 10 }}
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
