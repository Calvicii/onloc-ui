import { Link } from "react-router-dom";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Fab,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { getLocations } from "./utilities/storage";
import { addDevice, getDevices } from "./utilities/api";
import { convertUnixToISO8601 } from "./utilities/utils";
import AuthLayout from "./layouts/AuthLayout";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AddIcon from "@mui/icons-material/Add";
import "./css/Devices.css";

function Devices({ ip }) {
  const { user } = useAuth();

  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [createDeviceModalStatus, setCreateDeviceModalStatus] = useState(false);

  function handleCreateDeviceModalOpen() {
    setCreateDeviceModalStatus(true);
  }

  function handleCreateDeviceModalClose() {
    setCreateDeviceModalStatus(false);
    setNewDeviceName("");
  }

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

  function createDevice() {
    addDevice(user.id, newDeviceName);
    handleCreateDeviceModalClose();
  }

  return (
    <AuthLayout>
      <div className="devices-header">
        <h2>Devices</h2>
        <Fab
          onClick={handleCreateDeviceModalOpen}
          size="small"
          aria-label="add"
          sx={{ ml: 1 }}
        >
          <AddIcon />
        </Fab>
      </div>
      <Paper elevation={3} className="paper" sx={{ width: "60vw" }}>
        <List>
          {devices.map((device, index) => (
            <ListItem key={index}>
              <ListItemButton
                component={Link}
                to="/map"
                state={{ selectedDevice: device.deviceId }}
              >
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText
                  primary={device.deviceId}
                  secondary={`Last seen on ${convertUnixToISO8601(
                    device.timestamp
                  )}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Modal
        onClose={handleCreateDeviceModalClose}
        open={createDeviceModalStatus}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper className="create-device-modal">
          <h3>New Device</h3>
          <TextField
            value={newDeviceName}
            onChange={(e) => setNewDeviceName(e.target.value)}
            variant="filled"
            label="Name"
          />
          <Button onClick={createDevice} sx={{ color: "white", mt: 2 }}>
            Add
          </Button>
        </Paper>
      </Modal>
    </AuthLayout>
  );
}

export default Devices;
