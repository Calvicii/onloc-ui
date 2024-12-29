import { useAuth } from "./contexts/AuthProvider";
import MainAppBar from "./components/MainAppBar";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { divIcon } from "leaflet";
import "./leaflet.css";
import { useEffect, useState } from "react";
import { getDevices } from "./api";
import { formatISODate, stringToHexColor } from "./utils";
import Symbol from "./components/Symbol";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import { useNavigate } from "react-router-dom";
import "./Map.css";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    async function fetchDevices() {
      const data = await getDevices(auth.token);
      if (data) {
        setDevices(data);
        const sortedDevices = data.sort(
          (a, b) =>
            new Date(b.latest_location.created_at) -
            new Date(a.latest_location.created_at)
        );
        if (selectedDevice === null) {
          setSelectedDevice(sortedDevices[0]);
        }
      }
    }
    if (selectedDevice === null) fetchDevices();

    const updateInterval = setInterval(() => fetchDevices(), 60000);
    return () => clearInterval(updateInterval);
  }, [auth.token, selectedDevice]);

  return (
    <>
      <MainAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 1,
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: 1,
            position: "relative",
          }}
        >
          <Box
            sx={{
              zIndex: 500,
              position: "absolute",
              width: { xs: "calc(100% - 40px)", sm: "40%", md: "30%" },
              height: { xs: 128, sm: "calc(100% - 40px)" },
              left: 20,
              top: 20,
            }}
          >
            <Paper
              sx={{
                overflow: "scroll",
                height: "100%",
                padding: 2,
              }}
            >
              <DeviceList
                devices={devices}
                selectedDevice={selectedDevice}
                setSelectedDevice={setSelectedDevice}
                navigate={navigate}
              />
            </Paper>
          </Box>
          <MapContainer zoom={4} scrollWheelZoom={true}>
            <MapUpdater device={selectedDevice} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers devices={devices} setSelectedDevice={setSelectedDevice} />
          </MapContainer>
        </Box>
      </Box>
    </>
  );
}

function DeviceList({ devices, selectedDevice, setSelectedDevice, navigate }) {
  const sortedDevices = devices.sort(
    (a, b) =>
      new Date(b.latest_location.created_at) -
      new Date(a.latest_location.created_at)
  );
  if (devices) {
    return sortedDevices.map((device) => {
      return (
        <DeviceCard
          key={device.id}
          device={device}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          navigate={navigate}
        />
      );
    });
  }
}

function DeviceCard({ device, selectedDevice, setSelectedDevice, navigate }) {
  return (
    <Card elevation={3} sx={{ mb: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Symbol name={device.icon} color={stringToHexColor(device.name)} />
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontSize: { xs: 16, md: 24 } }}
            >
              {device.name}
            </Typography>
            {device.latest_location ? (
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  color: "text.secondary",
                }}
              >
                Latest location:{" "}
                {formatISODate(device.latest_location.created_at)}
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <IconButton
            title="Locate device"
            onClick={() => {
              setSelectedDevice(device);
            }}
          >
            {device.id === selectedDevice.id ? (
              <MyLocationOutlinedIcon />
            ) : (
              <LocationSearchingOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            title="Go to details"
            onClick={() => {
              navigate("/devices");
            }}
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

function Markers({ devices, setSelectedDevice }) {
  if (devices) {
    return devices.map((device) => {
      if (device.latest_location) {
        const icon = new divIcon({
          html: `<div class="pin" style="background-color: ${stringToHexColor(
            device.name
          )};"></div><div class="pin-details">${device.name}</div>`,
          className: "device-div-icon",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });
        return (
          <Box key={device.latest_location.id}>
            <Marker
              icon={icon}
              position={[
                device.latest_location.latitude,
                device.latest_location.longitude,
              ]}
              eventHandlers={{
                click: () => setSelectedDevice(device),
              }}  
            ></Marker>
            <Circle
              center={[
                device.latest_location.latitude,
                device.latest_location.longitude,
              ]}
              pathOptions={{
                fillColor: stringToHexColor(device.name),
                color: stringToHexColor(device.name),
              }}
              radius={device.latest_location.accuracy}
            />
          </Box>
        );
      }
    });
  }
}

function MapUpdater({ device }) {
  const map = useMap();

  useEffect(() => {
    if (device) {
      const { latitude, longitude } = device.latest_location;
      map.setView([latitude, longitude], 20);
    }
  }, [device, map]);

  return null;
}

export default App;
