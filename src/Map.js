import "./App.css";
import Location from "./Location";
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
import { getKnownDevices, getLocations, getLocation } from "./Storage";

function Map({ ip }) {
  const [deviceName, setDeviceName] = useState("");
  const [knownDevices, setKnownDevices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [showAll, setShowAll] = useState(true);

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
    <>
      <Paper elevation={3} className="paper">
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
