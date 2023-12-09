import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import { Card } from "../../../components/Card";
import { CardGhost } from "../../../components/CardGhost";
import { FlashCard } from "../../../types/card.interface";

interface CardsLayoutProps {
  cards?: FlashCard[];
}
const CardsLayout: React.FC<CardsLayoutProps> = (props) => {
  const [cards, setCards] = useState<FlashCard[] | undefined>(props.cards);

  function addCard(newCard: any) {
    setCards((prevCards) => {
      return [...(prevCards ?? []), newCard];
    });
  }

  function deleteCard(id: any) {
    setCards((prevCards) => {
      return prevCards?.filter((card, index) => {
        return index !== id;
      });
    });
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
        {props.cards ? props.cards?.map((card, index) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card id={card.id} question={card.question} answer={card.answer} category={card.category} />
          </Grid>
        )) :
          new Array(9).fill(0).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CardGhost
              ></CardGhost>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default CardsLayout;
