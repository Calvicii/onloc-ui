import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./../css/Location.css";
import { convertUnixToISO8601 } from "../utilities/utils";
import { Paper } from "@mui/material";

function Location({ selectedDeviceId, locations, showAll }) {
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    if (selectedDeviceId !== null) {
      setFilteredLocations(
        locations.filter((location) => location.deviceId === selectedDeviceId)
      );
    }
  }, [selectedDeviceId, locations]);

  if (locations[0] === undefined || locations[0] === null) {
    return null;
  }

  if (!showAll && selectedDeviceId !== null && filteredLocations.length > 0) {
    return (
      <Paper elevation={3} className="paper">
        <MapContainer
          center={[locations[0].coords.latitude, locations[0].coords.longitude]}
          zoom={16}
          style={{ height: "60vh", width: "100%", borderRadius: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[
              locations[0].coords.latitude,
              locations[0].coords.longitude,
            ]}
          >
            <Popup className="popup">
              <p>{`${locations[0].deviceId}\n(${locations[0].coords.latitude}, ${locations[0].coords.longitude})\n${convertUnixToISO8601(locations[0].timestamp)}`}</p>
            </Popup>
          </Marker>
          <MapUpdater
            coords={[
              locations[0].coords.latitude,
              locations[0].coords.longitude,
            ]}
          />
        </MapContainer>
      </Paper>
    );
  }

  if (showAll) {
    return (
      <Paper elevation={3} className="paper">
        <MapContainer
          center={[locations[0].coords.latitude, locations[0].coords.longitude]}
          zoom={16}
          style={{ height: "60vh", width: "100%", borderRadius: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.coords.latitude, location.coords.longitude]}
            >
              <Popup>
                <p>{`${location.deviceId}\n(${location.coords.latitude}, ${location.coords.longitude})\n${convertUnixToISO8601(location.timestamp)}`}</p>
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
        center={[locations[0].coords.latitude, locations[0].coords.longitude]}
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
