import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./Location.css";

function Location() {
  const [coords, setCoords] = useState([0, 0]);
  const [coordsId, setCoordsId] = useState(0);

  async function getCoords() {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/location/latest", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch coordinates");
      }

      const data = await response.json();
      setCoords([data.coords.latitude, data.coords.longitude]);
      setCoordsId(data.id);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }

  useEffect(() => {
    // Initial fetch
    getCoords();

    // Update coordinates every second
    const intervalId = setInterval(() => {
      getCoords();
      console.log("Location updated:", coords);
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p>
        {coordsId}: {coords[0]}, {coords[1]}
      </p>
      <MapContainer
        center={coords}
        zoom={16}
        style={{ height: "500px", width: "800px", borderRadius: 10 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>{coordsId}</Popup>
        </Marker>
        <MapUpdater coords={coords} />
      </MapContainer>
    </>
  );
}

// Component to update map center when coordinates change
function MapUpdater({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

export default Location;
