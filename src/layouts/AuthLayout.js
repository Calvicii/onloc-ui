import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";

function AuthLayout({ children }) {
  const { token, user, handleLogout } = useAuth();
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const accountMenuState = Boolean(accountMenuAnchor);

  const handleAccountMenuClick = (e) => {
    setAccountMenuAnchor(e.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  if (user === null || user === undefined) {
    return <CircularProgress />;
  }

  return (
    <>
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
        <Box>
          <IconButton onClick={handleAccountMenuClick} sx={{ mr: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <p style={{ color: "white" }}>{user.username[0].toUpperCase()}</p>
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={accountMenuAnchor}
            open={accountMenuState}
            onClose={handleAccountMenuClose}
          >
            <MenuItem
              component={Link}
              to="/settings"
              onClick={handleAccountMenuClose}
            >
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleAccountMenuClose();
                handleLogout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
      {children}
    </>
  );
}

export default AuthLayout;
