import { Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import AuthLayout from "./layouts/AuthLayout";

function Settings({ ip, setIp }) {
  const [newIp, setNewIp] = useState(ip);

  const handleSave = () => {
    setIp(newIp);
    localStorage.setItem("apiIp", newIp);
  };

  return (
    <AuthLayout>
      <h2>Settings</h2>
      <Paper elevation={3} className="paper" sx={{ padding: 2, width: "60vw" }}>
        <TextField
          label="Onloc API's IP"
          value={newIp}
          onChange={(e) => setNewIp(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={ip === newIp}
        >
          Save
        </Button>
      </Paper>
    </AuthLayout>
  );
}

export default Settings;
