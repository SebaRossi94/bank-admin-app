"use client";
import Link from "next/link";
import { usePages } from "./pages";

import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

export default function Home() {
  const pages = usePages({ enableHome: false });
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Home</Typography>
      <Stack spacing={2}>
        {pages.map((page) => (
          <Card
            variant="outlined"
            component={Link}
            href={page.href}
            key={page.title}
          >
            <CardActionArea>
              <CardContent>
                <CardHeader title={page.title} avatar={page.icon} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {page.description}
                  </Typography>
                </CardContent>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
