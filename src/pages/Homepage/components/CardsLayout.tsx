import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import GeneralCard from "./GeneralCard";
import GeneralCardV2 from "./GeneralCardV2";
import initialCardsData from "../data.js";

function CardsLayout() {
  const [cards, setCards] = useState(initialCardsData);

  function addCard(newCard: any) {
    setCards((prevCards) => {
      return [...prevCards, newCard];
    });
  }

  function deleteCard(id: any) {
    setCards((prevCards) => {
      return prevCards.filter((card, index) => {
        return index !== id;
      });
    });
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <GeneralCardV2 id={card.id} question={card.question} answer={card.answer} category = {card.category} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CardsLayout;
