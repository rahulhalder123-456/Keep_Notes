import React, { useState } from "react";
import { TextField, Fab, Paper, Zoom, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function CreateArea({ onAdd, mode }) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const submitNote = (event) => {
    event.preventDefault();
    if (note.title || note.content) {
      onAdd(note);
      setNote({ title: "", content: "" });
      setExpanded(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mb={6}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 800,
          background: mode === "dark"
            ? `
              linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%),
              rgba(255, 255, 255, 0.03)
            `
            : `
              linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)
            `,
          backdropFilter: "blur(30px)",
          borderRadius: 6,
          border: "2px solid",
          borderColor: mode === "dark"
            ? "rgba(102, 126, 234, 0.2)"
            : "rgba(255, 255, 255, 0.4)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: mode === "dark"
              ? "0 25px 50px rgba(102, 126, 234, 0.15)"
              : "0 25px 50px rgba(118, 75, 162, 0.15)",
            borderColor: mode === "dark"
              ? "rgba(102, 126, 234, 0.3)"
              : "rgba(118, 75, 162, 0.3)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
            opacity: isExpanded ? 1 : 0,
            transition: "opacity 0.3s ease"
          }
        }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={isExpanded ? 3 : 1}>
          <AutoAwesomeIcon
            sx={{
              color: mode === "dark" ? "#667eea" : "#764ba2",
              fontSize: 28,
              filter: "drop-shadow(0 0 10px rgba(102, 126, 234, 0.3))"
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: isExpanded ? 1 : 0.8,
              transition: "opacity 0.3s ease"
            }}
          >
            {isExpanded ? "Create Something Amazing" : "What's on your mind?"}
          </Typography>
        </Box>

        <form onSubmit={submitNote}>
          <Zoom in={isExpanded}>
            <Box mb={2}>
              <TextField
                name="title"
                label="✨ Give it a title..."
                fullWidth
                variant="outlined"
                value={note.title}
                onChange={handleChange}
                sx={{ borderRadius: 4 }}
              />
            </Box>
          </Zoom>

          <TextField
            name="content"
            label={isExpanded ? "💭 Let your thoughts flow..." : "📝 Start typing to create a note..."}
            fullWidth
            multiline
            rows={isExpanded ? 4 : 1}
            variant="outlined"
            value={note.content}
            onClick={() => setExpanded(true)}
            onChange={handleChange}
            sx={{ borderRadius: 4, mb: 2 }}
          />

          <Zoom in={isExpanded}>
            <Fab
              type="submit"
              color="primary"
              aria-label="add"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
            >
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateArea;
