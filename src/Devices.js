import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getKnownDevices, getLocations } from "./storage";
import { convertUnixToISO8601 } from "./utils";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

function Devices({ ip }) {
  const [knownDevices, setKnownDevices] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setKnownDevices(await getKnownDevices(ip));
      setDevices(await getLocations(ip));
    }

    fetchData();
  }, []);

  return (
    <>
      <h2>Devices</h2>
      <Paper elevation={3} className="paper" sx={{ width: "60vw" }}>
        <List>
          {devices.map((device, index) => (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary={device.device} secondary={`Last seen: ${convertUnixToISO8601(device.timestamp)}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default Devices;
