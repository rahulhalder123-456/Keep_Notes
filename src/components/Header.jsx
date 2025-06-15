import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function Header() {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box 
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <Box
            sx={{
              p: 1.5,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
            }}
          >
            <LightbulbIcon sx={{ color: "white", fontSize: 28 }} />
          </Box>
          <Box>
            <Typography 
              variant="h5" 
              component="div"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px"
              }}
            >
              Keeper Notes
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.85rem",
                fontWeight: 500
              }}
            >
              Organize your thoughts beautifully ✨
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;