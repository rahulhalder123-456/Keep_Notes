// src/pages/Landing.jsx
import React from "react";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Welcome to Keep Notes
      </Typography>
      <Typography variant="h5" mb={4}>
        A sleek way to organize your thoughts ✨
      </Typography>
      <Button
        onClick={() => navigate("/notes")}
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "999px",
          paddingX: 4,
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        Enter App
      </Button>
    </motion.div>
  );
}
