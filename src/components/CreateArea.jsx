import React, { useState } from "react";
import { TextField, Fab, Paper, Zoom, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function CreateArea({ onAdd }) {
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
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={4} sx={{ p: 3, width: "100%", maxWidth: 700, backdropFilter: "blur(6px)" }}>
        <form>
          {isExpanded && (
            <TextField
              name="title"
              label="Title"
              fullWidth
              margin="dense"
              variant="outlined"
              value={note.title}
              onChange={handleChange}
            />
          )}
          <TextField
            name="content"
            label="Take a note..."
            fullWidth
            multiline
            rows={isExpanded ? 3 : 1}
            margin="dense"
            variant="outlined"
            value={note.content}
            onClick={() => setExpanded(true)}
            onChange={handleChange}
          />
          <Zoom in={isExpanded}>
            <Box textAlign="right" mt={1}>
              <Fab color="primary" size="medium" onClick={submitNote}>
                <AddIcon />
              </Fab>
            </Box>
          </Zoom>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateArea;