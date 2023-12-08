import * as React from "react";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Footer from "./Footer";
import AppBar from "../../../components/Navbar";
import CardsLayout from "./CardsLayout";

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
