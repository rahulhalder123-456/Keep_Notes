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

function Note({ title, content, id, isPinned, color, onDelete, onTogglePin, mode }) {
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

  // Handle pin toggle with event prevention for drag
  const handlePinToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(id);
  };

  // Handle delete with event prevention for drag  
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <Box my={2} ref={setNodeRef} style={style}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          background: color || (mode === "dark" 
            ? "rgba(255, 255, 255, 0.05)" 
            : "rgba(255, 255, 255, 0.9)"),
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: mode === "dark" 
            ? "rgba(255, 255, 255, 0.1)" 
            : "rgba(255, 255, 255, 0.3)",
          position: "relative",
          cursor: "grab",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: mode === "dark"
              ? "0 20px 40px rgba(0, 0, 0, 0.3)"
              : "0 20px 40px rgba(0, 0, 0, 0.15)",
            "& .note-actions": {
              opacity: 1,
              transform: "translateY(0)",
            }
          },
          "&:active": {
            cursor: "grabbing"
          },
          ...(isPinned && {
            boxShadow: mode === "dark"
              ? "0 0 20px rgba(255, 215, 0, 0.3)"
              : "0 0 20px rgba(255, 193, 7, 0.3)",
            border: `2px solid ${mode === "dark" ? "rgba(255, 215, 0, 0.5)" : "rgba(255, 193, 7, 0.5)"}`,
          })
        }}
      >
        {/* Drag handle area - everything except buttons */}
        <Box 
          {...attributes} 
          {...listeners}
          sx={{ 
            position: "absolute",
            top: 0,
            left: 0,
            right: 60, // Leave space for buttons
            bottom: 50, // Leave space for delete button
            zIndex: 1,
          }}
        />
        
        {/* Pin button */}
        <IconButton 
          onClick={handlePinToggle} 
          className="note-actions"
          sx={{ 
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            opacity: isPinned ? 1 : 0,
            transform: isPinned ? "translateY(0)" : "translateY(-10px)",
            transition: "all 0.3s ease",
            background: isPinned 
              ? (mode === "dark" ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 193, 7, 0.1)")
              : (mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"),
            backdropFilter: "blur(10px)",
            "&:hover": {
              background: isPinned 
                ? (mode === "dark" ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 193, 7, 0.2)")
                : (mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"),
              transform: "scale(1.1)",
            }
          }}
        >
          {isPinned ? 
            <PushPinIcon sx={{ 
              color: mode === "dark" ? "#FFD700" : "#FF8F00",
              fontSize: 20 
            }} /> : 
            <PushPinOutlinedIcon sx={{ 
              color: mode === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
              fontSize: 20 
            }} />
          }
        </IconButton>

        {/* Note Content */}
        <Box sx={{ pr: 2, pb: 2 }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: mode === "dark" ? "#fff" : "#1a1a1a",
              fontSize: "1.1rem",
              lineHeight: 1.3,
              mb: 2,
              wordBreak: "break-word"
            }}
          >
            {title || "Untitled"}
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              color: mode === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)",
              lineHeight: 1.6,
              fontSize: "0.95rem",
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {content}
          </Typography>
        </Box>
        
        {/* Delete button */}
        <IconButton 
          onClick={handleDelete} 
          className="note-actions"
          sx={{ 
            position: "absolute",
            bottom: 12,
            right: 12,
            zIndex: 10,
            opacity: 0,
            transform: "translateY(10px)",
            transition: "all 0.3s ease",
            background: mode === "dark" ? "rgba(244, 67, 54, 0.2)" : "rgba(244, 67, 54, 0.1)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              background: mode === "dark" ? "rgba(244, 67, 54, 0.3)" : "rgba(244, 67, 54, 0.2)",
              transform: "scale(1.1)",
            }
          }}
        >
          <DeleteIcon sx={{ 
            color: mode === "dark" ? "#ff6b6b" : "#d32f2f",
            fontSize: 20 
          }} />
        </IconButton>

        {/* Decorative elements for pinned notes */}
        {isPinned && (
          <Box
            sx={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 24,
              height: 24,
              background: mode === "dark" 
                ? "linear-gradient(45deg, #FFD700, #FFA500)"
                : "linear-gradient(45deg, #FF8F00, #FF6F00)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
                "100%": { transform: "scale(1)" }
              }
            }}
          >
            ⭐
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Note;