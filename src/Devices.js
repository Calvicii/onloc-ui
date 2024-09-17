import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getKnownDevices } from "./Storage";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

function Devices({ ip }) {
  const [knownDevices, setKnownDevices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setKnownDevices(await getKnownDevices(ip));
    }

    fetchData();
  }, []);

  return (
    <>
      <h2>Devices</h2>
      <Paper elevation={3} className="paper" sx={{ width: "60vw" }}>
        <List>
          {knownDevices.map((device, index) => (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary={device} secondary="test" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default Devices;
