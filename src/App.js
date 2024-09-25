import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/App.css";
import Map from "./Map";
import Devices from "./Devices";
import Settings from "./Settings";
import Login from "./Login";
import Register from "./Register";
import { getApiIp } from "./utilities/storage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token, user } = useAuth();
  const [ip, setIp] = useState(getApiIp());

  useEffect(() => {
    setIp(getApiIp());
  }, []);

  const BaseRoute = () => {
    if (!token) {
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/map" />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<BaseRoute />} />
      <Route path="/map" element={<Map ip={ip} />} />
      <Route path="/devices" element={<Devices ip={ip} />} />
      <Route path="/settings" element={<Settings ip={ip} setIp={setIp} />} />
      <Route path="/login" element={<Login ip={ip} />} />
      <Route path="/register" element={<Register ip={ip} />} />
    </Routes>
  );
}

export default App;
