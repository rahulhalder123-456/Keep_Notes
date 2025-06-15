// src/NotesApp.jsx
import React, { useState, useMemo } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  TextField,
  Typography,
  Grid
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
  const [mode, setMode] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const colors = [
    "linear-gradient(135deg, #ffeef8 0%, #f8d7da 100%)", // Pink
    "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)", // Blue  
    "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)", // Green
    "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)", // Yellow
    "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)", // Purple
    "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)", // Indigo
  ];

  const darkColors = [
    "linear-gradient(135deg, rgba(233, 30, 99, 0.2) 0%, rgba(233, 30, 99, 0.1) 100%)",
    "linear-gradient(135deg, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.1) 100%)",
    "linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)",
    "linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 193, 7, 0.1) 100%)",
    "linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(156, 39, 176, 0.1) 100%)",
    "linear-gradient(135deg, rgba(63, 81, 181, 0.2) 0%, rgba(63, 81, 181, 0.1) 100%)",
  ];

  const addNote = (newNote) => {
    const colorOptions = mode === "dark" ? darkColors : colors;
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setNotes((prev) => [...prev, { 
      ...newNote, 
      isPinned: false, 
      id: uuidv4(),
      color: randomColor 
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
            ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mode === "dark"
              ? "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
            pointerEvents: "none",
          }
        }}
      >
        <Header />
        <ThemeToggle mode={mode} setMode={setMode} />
        <Container maxWidth="lg" sx={{ pt: 5, position: "relative", zIndex: 1 }}>
          <CreateArea onAdd={addNote} />

          <Box my={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="🔍 Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: mode === "dark" 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid",
                  borderColor: mode === "dark" 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(255, 255, 255, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: mode === "dark" 
                      ? "rgba(255, 255, 255, 0.2)" 
                      : "rgba(255, 255, 255, 0.5)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  },
                  "&.Mui-focused": {
                    borderColor: "#667eea",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                  }
                },
                "& .MuiInputLabel-root": {
                  color: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                },
                "& .MuiOutlinedInput-input": {
                  color: mode === "dark" ? "#fff" : "#000",
                  fontSize: "1.1rem",
                  padding: "18px 14px",
                }
              }}
            />
          </Box>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {pinned.length > 0 && (
              <Box mb={6}>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{
                    background: mode === "dark" 
                      ? "linear-gradient(45deg, #FFD700, #FFA500)"
                      : "linear-gradient(45deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3
                  }}
                >
                  📌 Pinned Notes
                </Typography>
                <SortableContext items={pinned.map((note) => note.id)} strategy={rectSortingStrategy}>
                  <Grid container spacing={3}>
                    {pinned.map((note) => (
                      <Grid item xs={12} sm={6} md={4} key={note.id}>
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
                  <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      background: mode === "dark" 
                        ? "linear-gradient(45deg, #64B5F6, #42A5F5)"
                        : "linear-gradient(45deg, #667eea, #764ba2)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text", 
                      WebkitTextFillColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 5,
                      mb: 3
                    }}
                  >
                    📂 All Notes
                  </Typography>
                )}
                <SortableContext items={others.map((note) => note.id)} strategy={rectSortingStrategy}>
                  <Grid container spacing={3}>
                    {others.map((note) => (
                      <Grid item xs={12} sm={6} md={4} key={note.id}>
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
                py={8}
                sx={{
                  background: mode === "dark"
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor: mode === "dark" 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : "rgba(255, 255, 255, 0.3)",
                }}
              >
                <Typography 
                  variant="h5" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ opacity: 0.8 }}
                >
                  {searchTerm ? '🔍 No notes found' : '📝 No notes yet'}
                </Typography>
                <Typography color="text.secondary" sx={{ opacity: 0.6 }}>
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first note to get started'}
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