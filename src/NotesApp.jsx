// src/NotesApp.jsx
import React, { useState, useMemo } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  TextField,
  Typography,
  Grid,
  Chip
} from "@mui/material";
import { getTheme } from "./theme";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import ThemeToggle from "./components/ThemeToggle";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

function NotesApp() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [mode, setMode] = useState("dark"); // Default to dark for modern feel
  const [searchTerm, setSearchTerm] = useState("");

  const resolvedMode = mode === "auto"
  ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  : mode;

const theme = useMemo(() => getTheme(resolvedMode), [resolvedMode]);


  const colors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  ];

  const darkColors = [
    "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.15) 100%)",
    "linear-gradient(135deg, rgba(240, 147, 251, 0.2) 0%, rgba(245, 87, 108, 0.15) 100%)",
    "linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.15) 100%)",
    "linear-gradient(135deg, rgba(67, 233, 123, 0.2) 0%, rgba(56, 249, 215, 0.15) 100%)",
    "linear-gradient(135deg, rgba(250, 112, 154, 0.2) 0%, rgba(254, 225, 64, 0.15) 100%)",
    "linear-gradient(135deg, rgba(168, 237, 234, 0.2) 0%, rgba(254, 214, 227, 0.15) 100%)",
    "linear-gradient(135deg, rgba(255, 154, 158, 0.2) 0%, rgba(254, 207, 239, 0.15) 100%)",
    "linear-gradient(135deg, rgba(255, 236, 210, 0.2) 0%, rgba(252, 182, 159, 0.15) 100%)",
  ];

  const addNote = (newNote) => {
    const colorOptions = mode === "dark" ? darkColors : colors;
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setNotes((prev) => [...prev, {
      ...newNote,
      isPinned: false,
      id: uuidv4(),
      color: randomColor,
      createdAt: new Date().toISOString()
    }]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setNotes((prevNotes) => {
        const oldIndex = prevNotes.findIndex((note) => note.id === active.id);
        const newIndex = prevNotes.findIndex((note) => note.id === over.id);
        return arrayMove(prevNotes, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const filteredNotes = useMemo(
    () => notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [notes, searchTerm]
  );

  const pinned = filteredNotes.filter((note) => note.isPinned);
  const others = filteredNotes.filter((note) => !note.isPinned);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: mode === "dark"
            ? `
              radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 50%, #0f0f23 100%),
              linear-gradient(180deg, transparent 0%, rgba(102, 126, 234, 0.05) 100%)
            `
            : `
              radial-gradient(ellipse at top, #667eea 0%, #764ba2 50%, #f093fb 100%),
              linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)
            `,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mode === "dark"
              ? `
                radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(67, 233, 123, 0.05) 0%, transparent 70%)
              `
              : `
                radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)
              `,
            pointerEvents: "none",
            animation: "float 20s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-20px)" }
            }
          }
        }}
      >
        <Header />
        <ThemeToggle mode={mode} setMode={setMode} />

        <Container maxWidth="lg" sx={{ pt: 5, position: "relative", zIndex: 1 }}>
          {/* Stats Section */}
          <Box
            display="flex"
            gap={2}
            mb={4}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Chip
              label={`📝 ${notes.length} Total Notes`}
              sx={{
                background: mode === "dark"
                  ? "rgba(102, 126, 234, 0.2)"
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                color: mode === "dark" ? "#667eea" : "#764ba2",
                fontWeight: "bold",
                fontSize: "0.9rem",
                height: 40,
                border: "1px solid",
                borderColor: mode === "dark"
                  ? "rgba(102, 126, 234, 0.3)"
                  : "rgba(118, 75, 162, 0.3)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
                },
                transition: "all 0.3s ease"
              }}
            />
            {pinned.length > 0 && (
              <Chip
                label={`📌 ${pinned.length} Pinned`}
                sx={{
                  background: mode === "dark"
                    ? "rgba(255, 215, 0, 0.2)"
                    : "rgba(255, 193, 7, 0.2)",
                  backdropFilter: "blur(20px)",
                  color: mode === "dark" ? "#FFD700" : "#FF8F00",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  height: 40,
                  border: "1px solid",
                  borderColor: mode === "dark"
                    ? "rgba(255, 215, 0, 0.3)"
                    : "rgba(255, 193, 7, 0.3)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)"
                  },
                  transition: "all 0.3s ease"
                }}
              />
            )}
          </Box>

          <CreateArea onAdd={addNote} mode={mode} />

          {/* Enhanced Search Bar */}
          <Box my={5}>
            <TextField
              fullWidth
              variant="outlined"
              label="🔍 Search your thoughts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 6,
                  backgroundColor: mode === "dark"
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(30px)",
                  border: "2px solid",
                  borderColor: mode === "dark"
                    ? "rgba(102, 126, 234, 0.2)"
                    : "rgba(118, 75, 162, 0.2)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: mode === "dark"
                      ? "rgba(102, 126, 234, 0.4)"
                      : "rgba(118, 75, 162, 0.4)",
                    transform: "translateY(-2px)",
                    boxShadow: mode === "dark"
                      ? "0 20px 40px rgba(102, 126, 234, 0.15)"
                      : "0 20px 40px rgba(118, 75, 162, 0.15)",
                  },
                  "&.Mui-focused": {
                    borderColor: mode === "dark" ? "#667eea" : "#764ba2",
                    transform: "translateY(-4px)",
                    boxShadow: mode === "dark"
                      ? "0 25px 50px rgba(102, 126, 234, 0.2)"
                      : "0 25px 50px rgba(118, 75, 162, 0.2)",
                  }
                },
                "& .MuiInputLabel-root": {
                  color: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                },
                "& .MuiOutlinedInput-input": {
                  color: mode === "dark" ? "#fff" : "#000",
                  fontSize: "1.2rem",
                  padding: "20px 16px",
                  fontWeight: 500,
                }
              }}
            />
          </Box>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {pinned.length > 0 && (
              <Box mb={8}>
                <Box
                  display="flex"
                  alignItems="center"
                  mb={4}
                  sx={{
                    "&::before": {
                      content: '""',
                      flex: 1,
                      height: "2px",
                      background: mode === "dark"
                        ? "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.5), transparent)",
                      marginRight: 2
                    },
                    "&::after": {
                      content: '""',
                      flex: 1,
                      height: "2px",
                      background: mode === "dark"
                        ? "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.5), transparent)",
                      marginLeft: 2
                    }
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="800"
                    sx={{
                      background: mode === "dark"
                        ? "linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B)"
                        : "linear-gradient(45deg, #667eea, #764ba2, #f093fb)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      fontSize: "2rem",
                      letterSpacing: "-1px",
                      textShadow: mode === "dark"
                        ? "0 0 30px rgba(255, 215, 0, 0.3)"
                        : "0 0 30px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    ⭐ Pinned Collection
                  </Typography>
                </Box>
                <SortableContext items={pinned.map((note) => note.id)} strategy={rectSortingStrategy}>
                  <Grid container spacing={4}>
                    {pinned.map((note) => (
                      <Grid item xs={12} key={note.id}> {/* Changed sm, md, lg to xs={12} */}
                        <Note
                          id={note.id}
                          title={note.title}
                          content={note.content}
                          isPinned={note.isPinned}
                          color={note.color}
                          onDelete={deleteNote}
                          onTogglePin={togglePin}
                          mode={mode}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </SortableContext>
              </Box>
            )}

            {others.length > 0 && (
              <Box>
                {pinned.length > 0 && (
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={4}
                    mt={6}
                    sx={{
                      "&::before": {
                        content: '""',
                        flex: 1,
                        height: "2px",
                        background: mode === "dark"
                          ? "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)"
                          : "linear-gradient(90deg, transparent, rgba(118, 75, 162, 0.5), transparent)",
                        marginRight: 2
                      },
                      "&::after": {
                        content: '""',
                        flex: 1,
                        height: "2px",
                        background: mode === "dark"
                          ? "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)"
                          : "linear-gradient(90deg, transparent, rgba(118, 75, 162, 0.5), transparent)",
                        marginLeft: 2
                      }
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="800"
                      sx={{
                        background: mode === "dark"
                          ? "linear-gradient(45deg, #64B5F6, #42A5F5, #2196F3)"
                          : "linear-gradient(45deg, #667eea, #764ba2, #4facfe)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        fontSize: "2rem",
                        letterSpacing: "-1px",
                      }}
                    >
                      🗂️ My Thoughts
                    </Typography>
                  </Box>
                )}
                <SortableContext items={others.map((note) => note.id)} strategy={rectSortingStrategy}>
                  <Grid container spacing={4}>
                    {others.map((note) => (
                      <Grid item xs={12} key={note.id}> {/* Changed sm, md, lg to xs={12} */}
                        <Note
                          id={note.id}
                          title={note.title}
                          content={note.content}
                          isPinned={note.isPinned}
                          color={note.color}
                          onDelete={deleteNote}
                          onTogglePin={togglePin}
                          mode={mode}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </SortableContext>
              </Box>
            )}

            {filteredNotes.length === 0 && (
              <Box
                textAlign="center"
                py={12}
                sx={{
                  background: mode === "dark"
                    ? `
                      linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%),
                      rgba(255, 255, 255, 0.02)
                    `
                    : `
                      linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)
                    `,
                  backdropFilter: "blur(30px)",
                  borderRadius: 8,
                  border: "2px solid",
                  borderColor: mode === "dark"
                    ? "rgba(102, 126, 234, 0.1)"
                    : "rgba(255, 255, 255, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: mode === "dark"
                      ? "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                    animation: "shimmer 3s infinite",
                  },
                  "@keyframes shimmer": {
                    "0%": { left: "-100%" },
                    "100%": { left: "100%" }
                  }
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    background: mode === "dark"
                      ? "linear-gradient(45deg, #667eea, #764ba2)"
                      : "linear-gradient(45deg, #764ba2, #667eea)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 3
                  }}
                >
                  {searchTerm ? '🔍 No matches found' : '✨ Your creative space awaits'}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: mode === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
                    fontWeight: 500,
                    maxWidth: 400,
                    mx: "auto",
                    lineHeight: 1.6
                  }}
                >
                  {searchTerm
                    ? 'Try different keywords or browse all notes'
                    : 'Start capturing your brilliant ideas and watch them come to life'}
                </Typography>
              </Box>
            )}
          </DndContext>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default NotesApp;