import * as React from "react";
import {
  CssBaseline,
  Stack,
  Box,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Footer from "./components/Footer.jsx";
import UpperBar from "./components/UpperBar.jsx";
import AppBar from "./components/AppBar.jsx";
import ButtonsGroup from "./components/ButtonsLayout.jsx";
import CardsLayout from "./components/CardsLayout.jsx";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Homepage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar />
      <main>
        <CardsLayout />
      </main>
      <Footer /> 
    </ThemeProvider>
  );
}
