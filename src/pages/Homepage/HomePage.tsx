import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import Footer from "./components/Footer";
import NavBar from "../../components/Navbar";
import CardsLayout from "./components/CardsLayout";
import { useEffect, useState } from "react";
import initialCardsData from "./data.js";
import { FlashCard } from "../../types/card.interface";
import React from "react";
import { CleaningServices } from "@mui/icons-material";

export default function Homepage() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>();

  useEffect(() => {
    // Currently just doing some WOW effect to see, remove this timeout when we have data handling
    setTimeout(() => {
      setFlashCards(initialCardsData);
    }, 1000);

    // TODO:
    // 1. fetch data from backend
    // 2. set data to state
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <CardsLayout cards={flashCards} />
      </main>
      <Footer />
    </>
  );
}
