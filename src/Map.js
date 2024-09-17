import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import {
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
} from "@mui/material";
import "./App.css";
import Location from "./Location";
import { getKnownDevices, getLocations, getLocation } from "./storage";

function Map({ ip }) {
  const location = useLocation();
  const { selectedDevice } = location.state || {};

  const [deviceName, setDeviceName] = useState(selectedDevice || "");
  const [knownDevices, setKnownDevices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [showAll, setShowAll] = useState(selectedDevice === undefined);

  useEffect(() => {
    let intervalId;

    async function fetchData() {
      if (deviceName === "" || showAll) {
        setDevices(await getLocations(ip));
        setKnownDevices(await getKnownDevices(ip));

        intervalId = setInterval(async () => {
          setDevices(await getLocations(ip));
          setKnownDevices(await getKnownDevices(ip));
        }, 15000);
      } else {
        setDevices(await getLocation(ip, deviceName));
        setKnownDevices(await getKnownDevices(ip));

        intervalId = setInterval(async () => {
          setDevices(await getLocation(ip, deviceName));
          setKnownDevices(await getKnownDevices(ip));
        }, 15000);
      }
    }

    fetchData();

    return () => clearInterval(intervalId);
  }, [ip, deviceName, showAll, selectedDevice]);

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
    <>
      <h2>Map</h2>
      <Paper elevation={3} className="paper" sx={{ display: "flex", alignItems: "center", width: "60vw" }}>
        <DeviceSelector />
        <FormControl>
          <FormControlLabel
            control={<Switch />}
            label="Show all devices"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
        </FormControl>
      </Paper>

      <Location devices={devices} showAll={showAll} />
    </>
  );
}

export default Map;
