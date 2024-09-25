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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Auth.css";
import GuestLayout from "./layouts/GuestLayout";
import { useAuth } from "./context/AuthContext";

export default function Register({ ip }) {
  const { handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasErrors = false;

    if (username.length < 1) {
      setUsernameError("The username field is required");
      hasErrors = true;
    }

    if (password.length < 1) {
      setPasswordError("The password field is required");
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasErrors = true;
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      const result = await handleRegister(username, password);
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
            Register
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
            Welcome user, please register to continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Username"
                name="username"
                type="text"
                required
                fullWidth
                error={usernameError !== "" || error !== ""}
                helperText={usernameError}
                variant="outlined"
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
                error={passwordError !== "" || error !== ""}
                helperText={passwordError}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Confirm Password"
                name="confirm-password"
                type="password"
                required
                fullWidth
                error={confirmPasswordError !== "" || error !== ""}
                helperText={confirmPasswordError}
                variant="outlined"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              >
                Register
              </LoadingButton>
            </FormControl>
          </form>

          <Box sx={{ textAlign: "left", mt: 2 }}>
            <Link to="/login" className="submit-link">
              Already have an account?
            </Link>
          </Box>
        </Box>
      </Box>
    </GuestLayout>
  );
}
