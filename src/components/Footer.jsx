import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box textAlign="center" py={3} color="text.secondary">
      <Typography variant="body2">
        ⓒ {year} Rahul Halder • All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;