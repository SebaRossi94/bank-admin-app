import { Container, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Bank App
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
