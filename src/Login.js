import { useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  Typography,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import "./css/Auth.css";
import GuestLayout from "./layouts/GuestLayout";
import { useAuth } from "./context/AuthContext";

export default function Login({ ip }) {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    try {
      const result = await handleLogin(username, password);
      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestLayout>
      <Box>
        <Box
          sx={{
            margin: "auto",
            width: { xs: "80%", sm: "400px" },
          }}
        >
          <LockOutlinedIcon
            sx={{
              m: "auto",
              mb: 2,
              display: "block",
              padding: 1,
              fontSize: 40,
              color: "black",
              backgroundColor: "#90caf9",
              borderRadius: 9999,
            }}
          />
          <Typography
            variant="h5"
            component="h1"
            sx={{ mb: 1, textAlign: "center" }}
          >
            Log in to Onloc
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{
              mb: 2,
              textAlign: "center",
              fontSize: 14,
              color: "lightgrey",
            }}
          >
            Welcome user, please log in to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Username"
                name="username"
                type="text"
                required
                fullWidth
                variant="outlined"
                error={error !== ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
                variant="outlined"
                error={error !== ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Collapse in={error !== ""}>
              <Alert
                variant="outlined"
                severity="error"
                sx={{ mb: 2 }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setError("")}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {error}
              </Alert>
            </Collapse>

            <FormControl fullWidth>
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
                loading={loading}
                disabled={loading} // Disable button when loading
              >
                Log in
              </LoadingButton>
            </FormControl>
          </form>

          <Box sx={{ textAlign: "left", mt: 2 }}>
            <Link to="/register" className="submit-link">
              Don't have an account?
            </Link>
          </Box>
        </Box>
      </Box>
    </GuestLayout>
  );
}
