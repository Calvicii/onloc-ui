import { TextField, Button, Box, FormControl, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  return (
    <Box>
      <Box
        sx={{
          margin: "auto",
          width: { xs: "80%", sm: "400px" }, // Responsive width for smaller screens
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
          sx={{ mb: 2, textAlign: "center", fontSize: 14, color: "lightgrey" }}
        >
          Welcome user, please register to continue
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Username"
            name="username"
            type="text"
            required
            fullWidth
            variant="outlined"
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
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Confirm Password"
            name="confirm-password"
            type="password"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Register
          </Button>
        </FormControl>

        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Link to="/login" className="submit-link">
            Already have an account?
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
