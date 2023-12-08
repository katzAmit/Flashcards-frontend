import * as React from "react";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Footer from "./Footer.jsx";
import AppBar from "./AppBar.jsx";
import CardsLayout from "./CardsLayout.jsx";

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
