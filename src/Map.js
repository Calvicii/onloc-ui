import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import "./css/App.css";
import Location from "./components/Location";
import { getDevices, getLocations } from "./utilities/api";
import AuthLayout from "./layouts/AuthLayout";

function Map({ ip }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Adjusted to handle 0 correctly
  const initialDeviceId = queryParams.get("deviceId");
  const [selectedDeviceId, setSelectedDeviceId] = useState(initialDeviceId !== null ? parseInt(initialDeviceId) : null);
  const [knownDevices, setKnownDevices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showAll, setShowAll] = useState(selectedDeviceId === null);

  useEffect(() => {
    let intervalId;

    async function fetchData() {
      setLocations(await getLocations(ip));
      setKnownDevices(await getDevices(ip));

      intervalId = setInterval(async () => {
        setLocations(await getLocations(ip));
        setKnownDevices(await getDevices(ip));
      }, 15000);
    }

    fetchData();

    return () => clearInterval(intervalId);
  }, [ip, selectedDeviceId, showAll]);

  function DeviceSelector() {
    return (
      <FormControl sx={{ width: 225, marginRight: 2 }}>
        <InputLabel id="device-selector-label">Device</InputLabel>
        <Select
          id="device-selector"
          label="Device"
          labelId="device-selector-label"
          value={selectedDeviceId !== null && knownDevices.length > 0 ? selectedDeviceId : ""}
          disabled={showAll}
          onChange={(e) => setSelectedDeviceId(e.target.value === "" ? null : e.target.value)}
          endAdornment={
            <IconButton
              onClick={() => setSelectedDeviceId(null)}
              disabled={showAll}
              sx={{ display: selectedDeviceId === null ? "none" : "", right: 10 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          }
        >
          {knownDevices.map((device) => (
            <MenuItem key={device.id} value={device.id}>
              {device.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <AuthLayout>
      <h2>Map</h2>
      <Paper
        elevation={3}
        className="paper"
        sx={{ display: "flex", alignItems: "center", width: "60vw" }}
      >
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

      <Location
        selectedDeviceId={selectedDeviceId}
        locations={locations}
        showAll={showAll}
      />
    </AuthLayout>
  );
}

export default Map;
