// src/components/Note.jsx
import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Note({ title, content, id, isPinned, onDelete, onTogglePin }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box my={2} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Paper
        elevation={isPinned ? 6 : 3}
        sx={{
          p: 2,
          borderRadius: 4,
          backgroundColor: isPinned ? "rgba(255, 251, 200, 0.7)" : "background.paper",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            transform: "scale(1.015)",
          },
        }}
      >
        <Box position="absolute" top={8} right={48}>
          <IconButton onClick={() => onTogglePin(id)} color="primary">
            {isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
          </IconButton>
        </Box>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body1">{content}</Typography>
        <Box position="absolute" bottom={8} right={8}>
          <IconButton onClick={() => onDelete(id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default Note;
