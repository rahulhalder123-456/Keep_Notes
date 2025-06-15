import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={isScrolled ? 6 : 0}
      sx={{
        backdropFilter: "blur(20px)",
        background: isScrolled
          ? "linear-gradient(90deg, rgba(255,255,255,0.75), rgba(240,240,240,0.8))"
          : "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(245,245,255,0.9))",
        borderBottom: "1px solid rgba(220,220,220,0.4)",
        transition: "all 0.3s ease-in-out",
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ py: 1.4, px: { xs: 2, sm: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Gradient Logo Icon */}
          <Box
            sx={{
              p: 1.3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #1a73e8, #ff4d4d)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(255, 77, 77, 0.15)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 24px rgba(26,115,232,0.3)",
              },
            }}
          >
            <LightbulbIcon sx={{ color: "#fff", fontSize: 28 }} />
          </Box>

          {/* Title and Tagline */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                background: "linear-gradient(135deg, #1a73e8, #ff4d4d)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
              }}
            >
              Keep Notes
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.85rem",
                color: "#5f6368",
              }}
            >
              Ideas that stay, organized your way
            </Typography>
          </Box>

          {/* Status Indicator */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.6,
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(26,115,232,0.1), rgba(255,77,77,0.1))",
              border: "1px solid rgba(200, 200, 255, 0.2)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1a73e8, #ff4d4d)",
                boxShadow: "0 0 8px rgba(255, 77, 77, 0.4)",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1a73e8, #ff4d4d)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Online
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
