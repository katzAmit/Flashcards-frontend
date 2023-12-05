import * as React from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
} from "@mui/material";

function MainHeader() {
  return (
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
      My Flashcards
    </Typography>
  );
}
export default MainHeader;
