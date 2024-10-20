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
  IconButton,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { addDevice, getDevices, getLocation } from "./utilities/api";
import { convertUnixToISO8601 } from "./utilities/utils";
import AuthLayout from "./layouts/AuthLayout";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./css/Devices.css";

function Devices({ ip }) {
  const { user } = useAuth();

  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [deviceToDelete, setDeviceToDelete] = useState({});
  const [createDeviceModalStatus, setCreateDeviceModalStatus] = useState(false);
  const [deleteDeviceModalStatus, setDeleteDeviceModalStatus] = useState(false);

  function handleCreateDeviceModalOpen() {
    setCreateDeviceModalStatus(true);
  }

  function handleCreateDeviceModalClose() {
    setCreateDeviceModalStatus(false);
    setNewDeviceName("");
  }

  function handleDeleteDeviceModalOpen(device) {
    setDeviceToDelete(device);
    setDeleteDeviceModalStatus(true);
  }

  function handleDeleteDeviceModalClose() {
    setDeleteDeviceModalStatus(false);
  }

  useEffect(() => {
    let intervalId;

    async function fetchData() {
      setDevices(await getDevices(ip));

      intervalId = setInterval(async () => {
        setDevices(await getDevices(ip));
      }, 15000);
    }

    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  async function createDevice() {
    addDevice(user.id, newDeviceName);
    handleCreateDeviceModalClose();
    setDevices(await getDevices(ip));
  }

  async function deleteDevice() {
    console.log("delete");
    handleDeleteDeviceModalClose();
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
          {devices.map((device, index) => {
            return (
              <ListItem key={device.id}>
                <ListItemButton
                  sx={{ borderRadius: 2 }}
                  component={Link}
                  to={`/map?deviceId=${device.id}`}
                >
                  <ListItemIcon>
                    <PhoneAndroidIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={device.name}
                    secondary={
                      device.lastSeen
                        ? `Last seen on ${convertUnixToISO8601(device.lastSeen)}`
                        : ""
                    }
                  />
                </ListItemButton>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={() => handleDeleteDeviceModalOpen(device)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
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
      <Modal
        onClose={handleDeleteDeviceModalClose}
        open={deleteDeviceModalStatus}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper className="create-device-modal">
          <h3 style={{ marginBottom: 0 }}>Delete {deviceToDelete.name}?</h3>
          <p style={{ marginTop: 0 }}>This action is irreversible</p>
          <Box>
            <Button
              onClick={handleDeleteDeviceModalClose}
              sx={{ color: "white", mt: 2, mr: 1 }}
            >
              Cancel
            </Button>
            <Button onClick={deleteDevice} color="error" sx={{ mt: 2 }}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Modal>
    </AuthLayout>
  );
}

export default Devices;
