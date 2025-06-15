// src/pages/Landing.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0a0a0a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated Grid Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        animation: "gridMove 20s linear infinite",
        zIndex: 0
      }} />

      {/* Dynamic Mouse Follower */}
      <motion.div
        animate={{
          x: mousePos.x - 400,
          y: mousePos.y - 400,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.04) 30%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(40px)",
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: "200px",
          height: "200px",
          background: "linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          rotate: -360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "150px",
          height: "150px",
          background: "linear-gradient(45deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))",
          borderRadius: "50%",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      {/* Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "80px 60px",
          textAlign: "center",
          zIndex: 1,
          maxWidth: "900px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          position: "relative",
        }}
      >
        {/* Neon Border Effect */}
        <div style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          right: "-2px",
          bottom: "-2px",
          background: "linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.3), transparent, rgba(255, 0, 255, 0.3), transparent)",
          borderRadius: "24px",
          animation: "borderGlow 3s linear infinite",
          zIndex: -1,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography
            variant="h1"
            sx={{
              background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 25%, #00ffff 50%, #ff00ff 75%, #00ffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
              animation: "gradientShift 3s ease infinite",
              fontSize: { xs: "3rem", md: "5.5rem" },
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 3,
              textShadow: "0 0 30px rgba(0, 255, 255, 0.5)",
              fontFamily: "'Space Grotesk', monospace",
            }}
          >
            Keep Notes
          </Typography>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: 300,
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                maxWidth: "700px",
                margin: "0 auto",
                mb: 6,
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Next-generation note-taking with{" "}
              <span style={{
                background: "linear-gradient(45deg, #00ffff, #ff00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
              }}>
                AI-powered insights
              </span>{" "}
              and seamless collaboration
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Button
              onClick={() => navigate("/notes")}
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)",
                color: "black",
                paddingX: 8,
                paddingY: 2,
                borderRadius: "50px",
                fontWeight: 800,
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                border: "2px solid transparent",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "transparent",
                  color: "#00ffff",
                  border: "2px solid #00ffff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 40px rgba(0, 255, 255, 0.3)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                  animation: "shimmer 2s infinite",
                },
              }}
            >
              Launch App →
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}