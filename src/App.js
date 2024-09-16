import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Map from "./Map";
import { AppBar, Button } from "@mui/material";

function App() {
  return (
    <Router>
      <AppBar
        className="appBar"
        sx={{ flexDirection: "row", alignItems: "center" }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
      </AppBar>

      <Routes>
        <Route path="/" element={<Navigate to="/map" />} />
        <Route path="/map" element={<Map></Map>} />
        <Route path="/devices" element={<p>Devices</p>} />
      </Routes>
    </Router>
  );
}

export default App;
