import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getLocations } from "./storage";
import { convertUnixToISO8601 } from "./utils";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

function Devices({ ip }) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    let intervalId;

    async function fetchData() {
      setDevices(await getLocations(ip));

      intervalId = setInterval(async () => {
        setDevices(await getLocations(ip));
      }, 15000);
    }

    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h2>Devices</h2>
      <Paper elevation={3} className="paper" sx={{ width: "60vw" }}>
        <List>
          {devices.map((device, index) => (
            <ListItem key={index}>
              <ListItemButton
                component={Link}
                to="/map"
                state={{ selectedDevice: device.device }}
              >
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText
                  primary={device.device}
                  secondary={`Last seen: ${convertUnixToISO8601(
                    device.timestamp
                  )}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default Devices;
