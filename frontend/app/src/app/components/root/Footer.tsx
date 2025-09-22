"use client";
import React from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";

function Footer() {
  const icons = [
    {
      icon: GitHubIcon,
      name: "GitHub",
      onClick: () => window.open("https://github.com/SebaRossi94", "_blank"),
    },
    {
      icon: LinkedInIcon,
      name: "LinkedIn",
      onClick: () =>
        window.open(
          "https://www.linkedin.com/in/sebastian-rossi-94/",
          "_blank"
        ),
    },
    {
      icon: MailIcon,
      name: "Email",
      onClick: () => window.open("mailto:seba.rossi.94@gmail.com", "_blank"),
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: "auto",
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="space-between">
        {icons.map((icon) => (
          <icon.icon
            key={icon.name}
            color="primary"
            onClick={icon.onClick}
            sx={{ cursor: "pointer", ":hover": { color: "secondary" } }}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Footer;
