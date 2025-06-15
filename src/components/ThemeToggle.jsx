import React from "react";
import { IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const themes = {
  light: {
    icon: Brightness7,
    color: "#FFD600",
  },
  dark: {
    icon: Brightness4,
    color: "#00E5FF",
  },
};

function ThemeToggle({ mode, setMode }) {
  const current = themes[mode];
  const nextMode = mode === "light" ? "dark" : "light";
  const handleToggle = () => setMode(nextMode);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        px: 2,
        py: 1,
      }}
    >
      <IconButton
        onClick={handleToggle}
        sx={{
          backgroundColor: `${current.color}22`,
          color: current.color,
          borderRadius: "50%",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: `${current.color}44`,
            transform: "scale(1.1)",
          },
        }}
      >
        {React.createElement(current.icon, { fontSize: "medium" })}
      </IconButton>
    </Box>
  );
}

export default ThemeToggle;
