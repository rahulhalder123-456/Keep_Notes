// src/components/Note.jsx
import React, { useState } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Collapse,
  Chip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Note({ title, content, id, isPinned, color, onDelete, onTogglePin, mode }) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const isLongContent = content && content.length > 150;
  const shouldShowExpandButton = isLongContent && !isExpanded;
  const displayContent = shouldShowExpandButton ? content.substring(0, 150) + "..." : content;

  const handlePinToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  const handleExpandToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      my={2}
      ref={setNodeRef}
      style={style}
      sx={{
        width: "100%", // Changed to 100% to take full width of its Grid item parent
        // Removed minWidth and maxWidth
        flexGrow: 1,
        display: "flex"
      }}
    >
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "240px",
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
            border: `2px solid ${mode === "dark" ? "rgba(255, 215, 0, 0.5)" : "rgba(255, 193, 7, 0.5)"}`
          })
        }}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 60,
            bottom: isLongContent ? 90 : 50,
            zIndex: 1,
          }}
        />

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
            <PushPinIcon sx={{ color: mode === "dark" ? "#FFD700" : "#FF8F00", fontSize: 20 }} />
            :
            <PushPinOutlinedIcon sx={{ color: mode === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)", fontSize: 20 }} />
          }
        </IconButton>

        <Box sx={{ pr: 2, pb: isLongContent ? 6 : 2 }}>
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
              whiteSpace: "pre-wrap",
              mb: isLongContent ? 2 : 0
            }}
          >
            {isExpanded ? content : displayContent}
          </Typography>

          {isLongContent && (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Chip
                label={isExpanded ? "Show Less" : "Read More"}
                onClick={handleExpandToggle}
                icon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  zIndex: 10,
                  background: mode === "dark"
                    ? "rgba(102, 126, 234, 0.2)"
                    : "rgba(102, 126, 234, 0.1)",
                  color: mode === "dark" ? "#90caf9" : "#1976d2",
                  border: "1px solid",
                  borderColor: mode === "dark"
                    ? "rgba(102, 126, 234, 0.3)"
                    : "rgba(102, 126, 234, 0.2)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: mode === "dark"
                      ? "rgba(102, 126, 234, 0.3)"
                      : "rgba(102, 126, 234, 0.2)",
                    transform: "scale(1.05)",
                  }
                }}
              />
            </Box>
          )}
        </Box>

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
          <DeleteIcon sx={{ color: mode === "dark" ? "#ff6b6b" : "#d32f2f", fontSize: 20 }} />
        </IconButton>

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