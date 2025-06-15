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

  const addNote = (newNote) => {
    setNotes((prev) => [...prev, { ...newNote, isPinned: false, id: uuidv4() }]);
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
      <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
        <Header />
        <ThemeToggle mode={mode} setMode={setMode} />
        <Container maxWidth="md" sx={{ pt: 5 }}>
          <CreateArea onAdd={addNote} />

          <Box my={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="🔍 Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                borderRadius: 2,
                backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffffaa",
                backdropFilter: "blur(10px)",
              }}
            />
          </Box>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {pinned.length > 0 && (
              <>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  📌 Pinned
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
                          onDelete={deleteNote}
                          onTogglePin={togglePin}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </SortableContext>
              </>
            )}

            {others.length > 0 && (
              <>
                {pinned.length > 0 && (
                  <Typography variant="h5" fontWeight="bold" mt={5} gutterBottom>
                    📂 Other Notes
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
                          onDelete={deleteNote}
                          onTogglePin={togglePin}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </SortableContext>
              </>
            )}
          </DndContext>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default NotesApp;