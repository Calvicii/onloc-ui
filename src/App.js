import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";
import Devices from "./Devices";
import Settings from "./Settings";
import { AppBar, Box, Button, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const defaultIp = process.env.ONLOC_API_IP || "http://localhost:8118";

function App() {
  const [ip, setIp] = useState(localStorage.getItem("apiIp") || defaultIp);

  useEffect(() => {
    setIp(localStorage.getItem("apiIp") || defaultIp);
  }, []);

  return (
    <Router>
      <AppBar
        className="appBar"
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 70,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              paddingLeft: 20,
            }}
          >
            <h1>Onloc</h1>
          </Link>
          <Button
            component={Link}
            to="/map"
            sx={{ color: "white", marginLeft: 5 }}
          >
            Map
          </Button>
          <Button
            component={Link}
            to="/devices"
            sx={{ color: "white", marginLeft: 2 }}
          >
            Devices
          </Button>
        </Box>
        <IconButton component={Link} to="/settings" sx={{ marginRight: 2 }}>
          <SettingsIcon />
        </IconButton>
      </AppBar>

      <Routes>
        <Route path="/" element={<Navigate to="/map" />} />
        <Route path="/map" element={<Map ip={ip} />} />
        <Route path="/devices" element={<Devices ip={ip} />} />
        <Route path="/settings" element={<Settings ip={ip} setIp={setIp} />} />
      </Routes>
    </Router>
  );
}

export default App;
