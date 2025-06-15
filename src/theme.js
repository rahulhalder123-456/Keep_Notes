import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f2f4f8",
              paper: "#ffffffcc"
            },
            primary: {
              main: "#4a90e2"
            }
          }
        : {
            background: {
              default: "#121212",
              paper: "#1f1f1fcc"
            },
            primary: {
              main: "#90caf9"
            }
          }),
    },
    typography: {
      fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
          }
        }
      }
    }
  });