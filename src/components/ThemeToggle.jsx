import React from "react";
import { Box, FormControlLabel, Switch } from "@mui/material";

function ThemeToggle({ mode, setMode }) {
  return (
    <Box display="flex" justifyContent="flex-end" pr={4} pt={2}>
      <FormControlLabel
        control={
          <Switch
            checked={mode === "dark"}
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
          />
        }
        label={mode === "dark" ? "Dark Mode" : "Light Mode"}
      />
    </Box>
  );
}

export default ThemeToggle;