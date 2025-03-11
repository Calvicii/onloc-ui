import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "./assets/images/foreground.svg";
import { useAuth } from "./contexts/AuthProvider";
import { getStatus } from "./api";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [isSetup, setIsSetup] = useState(true);
  const [registration, setRegistration] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      const response = await getStatus();
      if (response.isSetup === false) {
        setIsSetup(false);
      }
      if (response.registration === true) {
        setRegistration(true);
      }
    }
    fetchStatus();
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setError(false);

    let formIsValid = true;

    if (username.trim() === "") {
      setUsernameError("Username is required");
      formIsValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    let crendentials = {
      username: username,
      password: password,
    };

    const response = await auth.loginAction(crendentials);
    if (response.error && response.message) {
      setError(true);
      auth.throwMessage(response.message, auth.Severity.ERROR);
    }
  };

  if (!isSetup) {
    navigate("/register");
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          height: "100vh",
        }}
      >
        <Card
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 8,
            py: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: 48, fontFamily: "Nunito", fontWeight: 700 }}
          >
            Onloc
          </Typography>
          <Typography variant="p" sx={{ my: 2 }}>
            Login to start tracking your devices.
          </Typography>
          <img src={Logo} />
        </Card>
        <Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              m: 0,
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: 48, fontFamily: "Nunito", fontWeight: 700 }}
            >
              Onloc
            </Typography>
            <img src={Logo} width={60} />
          </Box>
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              error={error || usernameError !== ""}
              helperText={usernameError}
              required
            />
            <TextField
              fullWidth
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "Hide the password"
                            : "Display the password"
                        }
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={error || passwordError !== ""}
              helperText={passwordError}
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
            {registration ? (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            ) : (
              ""
            )}
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Login;
