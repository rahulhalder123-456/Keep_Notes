import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function Header() {
  return (
    <AppBar position="sticky" elevation={3} color="primary">
      <Toolbar>
        <LightbulbIcon sx={{ mr: 1 }} />
        <Typography variant="h6" noWrap component="div">
          Keeper Notes
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;