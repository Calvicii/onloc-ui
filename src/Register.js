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

function Register() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [error, setError] = useState(false);

  const [isSetup, setIsSetup] = useState(true);
  const [registration, setRegistration] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      const response = await getStatus();
      if (!JSON.parse(response.isSetup)) {
        setIsSetup(false);
      }
      if (!JSON.parse(response.registration)) {
        setRegistration(false);
        if (JSON.parse(response.isSetup)) {
          navigate("/login");
        }
      }
    }
    fetchStatus();
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((show) => !show);

  const handleRegister = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setPasswordConfirmationError("");
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

    if (passwordConfirmation.trim() === "") {
      setPasswordConfirmationError("Password confirmation is required");
      formIsValid = false;
    }

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError("Passwords do not match");
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    let crendentials = {
      username: username,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    const response = await auth.registerAction(crendentials);
    if (response.error && response.message) {
      setError(true);
      auth.throwMessage(response.message, auth.SeverityEnum.ERROR);
    }
  };

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
            {isSetup
              ? "Register an account."
              : "Setup this server by registering an admin account."}
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
            onSubmit={handleRegister}
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
                        title={
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
            <TextField
              fullWidth
              label="Password Confirmation"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              type={showPasswordConfirmation ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        title={
                          showPasswordConfirmation
                            ? "Hide the password"
                            : "Display the password"
                        }
                        onClick={handleClickShowPasswordConfirmation}
                      >
                        {showPasswordConfirmation ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={error || passwordConfirmationError !== ""}
              helperText={passwordConfirmationError}
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={handleRegister}
            >
              Register
            </Button>
            {isSetup ? (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Login
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

export default Register;