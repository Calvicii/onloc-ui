import "./App.css";
import Location from "./Location";
import { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
} from "@mui/material";

function App() {
  const [ip, setIp] = useState("http://localhost:8118");
  const [deviceName, setDeviceName] = useState(null);
  const [knownDevices, setKnownDevices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [showAll, setShowAll] = useState(false);

  async function getKnownDevices() {
    try {
      const response = await fetch(`${ip}/api/location/devices`, {
        method: "GET",
      });

      if (!response.ok) {
        setKnownDevices([]);
        throw new Error("Failed to fetch devices");
      }

      const data = await response.json();
      setKnownDevices(data);
    } catch (error) {
      setKnownDevices([]);
      console.error(`Error fetching devices: ${error}`);
    }
  }

  async function getLocations() {
    try {
      const response = await fetch(`${ip}/api/location/latest`, {
        method: "GET",
      });

      if (!response.ok) {
        setDevices([]);
        throw new Error("Failed to fetch coordinates");
      }

      const data = await response.json();
      setDevices(data);
    } catch (error) {
      setDevices([]);
      console.error(`Error fetching coordinates: ${error}`);
    }
  }

  async function getLocation() {
    try {
      const response = await fetch(`${ip}/api/location/latest/${deviceName}`, {
        method: "GET",
      });

      if (!response.ok) {
        setDevices([]);
        throw new Error("Failed to fetch coordinates");
      }

      const data = await response.json();
      setDevices([data]);
    } catch (error) {
      setDevices([]);
      console.error(`Error fetching coordinates: ${error}`);
    }
  }

  useEffect(() => {
    let intervalId;

    // Initial fetch and periodic updates
    if (deviceName === null || showAll) {
      getLocations();
      getKnownDevices();

      console.log(devices);
      

      intervalId = setInterval(() => {
        getLocations();
        getKnownDevices();
      }, 15000);
    } else {
      getLocation();
      getKnownDevices();

      intervalId = setInterval(() => {
        getLocation();
        getKnownDevices();
      }, 15000);
    }

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [ip, deviceName, showAll]);

  function DeviceSelector() {
    return (
      <FormControl sx={{ width: 225, marginRight: 2 }}>
        <InputLabel id="device-selector-label">Device</InputLabel>
        <Select
          id="device-selector"
          label="Device"
          labelId="device-selector-label"
          value={deviceName}
          disabled={showAll}
          onChange={(e) => setDeviceName(e.target.value)} // Handle selection
        >
          {knownDevices.map((device) => (
            <MenuItem key={device} value={device}>
              {device}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <div className="App">
      <Paper elevation={3} id="location">
        <TextField
          style={{ marginRight: 10 }}
          label="Onloc API's IP"
          value={ip}
          variant="outlined"
          onChange={(value) => setIp(value.target.value)}
        />
        <DeviceSelector />
        <FormControl>
          <FormControlLabel
            sx={{ marginTop: 1 }}
            control={<Switch />}
            label="Show all devices"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
        </FormControl>
      </Paper>
      <Location devices={devices} showAll={showAll} />
    </div>
  );
}

export default App;
