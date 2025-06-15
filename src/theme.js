import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") => {
  const resolvedMode = mode === "dark" ? "dark" : "light"; // fallback if 'auto' or unknown

  return createTheme({
    palette: {
      mode: resolvedMode,
      primary: {
        main: resolvedMode === "dark" ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: resolvedMode === "dark" ? "#f48fb1" : "#9c27b0",
      },
      background: {
        default: resolvedMode === "dark" ? "#121212" : "#f5f5f5",
        paper: resolvedMode === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: resolvedMode === "dark" ? "#ffffff" : "#000000",
        secondary: resolvedMode === "dark" ? "#cccccc" : "#444444",
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            transition: "all 0.3s ease",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "999px",
            textTransform: "uppercase",
          },
        },
      },
    },
  });
};
