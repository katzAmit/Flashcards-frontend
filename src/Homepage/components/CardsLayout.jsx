import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import GeneralCard from "./GeneralCard";
import initialCardsData from "../data.js";

function CardsLayout() {
  const [cards, setCards] = useState(initialCardsData);

  function addCard(newCard) {
    setCards((prevCards) => {
      return [...prevCards, newCard];
    });
  }

  function deleteCard(id) {
    setCards((prevCards) => {
      return prevCards.filter((card, index) => {
        return index !== id;
      });
    });
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <GeneralCard id={card.id} question={card.q} answer={card.a} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CardsLayout;
