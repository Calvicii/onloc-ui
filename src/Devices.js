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

function Devices() {
  const [ip, setIp] = useState("http://localhost:8118");

  return (
    <Paper elevation={3} className="paper">
      <List></List>
    </Paper>
  );
}

export default Devices;
