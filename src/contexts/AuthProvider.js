import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, login, logout, register } from "../api";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import Logo from "../assets/images/foreground.svg";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // Snackbar
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  function handleHideSnackbar() {
    setSnackbarStatus(false);
  }
  function throwMessage(message, severity) {
    setSeverity(severity);
    setMessage(message);
    setSnackbarStatus(true);
  }

  useEffect(() => {
    async function fetchUserInfo() {
      if (token && !user) {
        const data = await userInfo(token);
        if (data.id) {
          setUser(data);
        }
        if (data.error) {
          throwMessage(data.message, SeverityEnum.ERROR);
          logoutAction();
        }
      }
    }
    fetchUserInfo();
  }, [token]);

  async function loginAction(credentials) {
    const data = await login(credentials.username, credentials.password);

    if (data.token && data.user) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    }

    return data;
  }

  async function registerAction(credentials) {
    const data = await register(
      credentials.username,
      credentials.password,
      credentials.password_confirmation
    );

    if (data.token && data.user) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
      throwMessage("Welcome to Onloc!", SeverityEnum.SUCCESS);
    }

    return data;
  }

  function logoutAction() {
    logout(token);
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        throwMessage,
        SeverityEnum,
        loginAction,
        registerAction,
        logoutAction,
      }}
    >
      {token && !user ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h1"
              sx={{ fontFamily: "Nunito", fontSize: 48 }}
            >
              Onloc
            </Typography>
            <img src={Logo} width={60} />
          </Box>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarStatus}
        autoHideDuration={5000}
        onClose={handleHideSnackbar}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const SeverityEnum = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};
