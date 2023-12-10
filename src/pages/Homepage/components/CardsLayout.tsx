import React, { useEffect, useState } from "react";
import { Grid, Container, Button } from "@mui/material";
import { Card } from "../../../components/Card";
import { CardGhost } from "../../../components/CardGhost";
import { FlashCard } from "../../../types/card.interface";
import { TiDocumentAdd } from "react-icons/ti";
import { BiFilterAlt } from "react-icons/bi";
import axios from "axios";

interface CardsLayoutProps {
  cards?: FlashCard[];
  deleteFlashCard: (id: number) => void;
}
const CardsLayout: React.FC<CardsLayoutProps> = ({
  cards,
  deleteFlashCard,
}) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid>
        <div className="flex items-center gap-2 ml-2 mb-2 justify-between">
          <button className="rounded-full p-2 bg-gray-300 flex items-center justify-center">
            <BiFilterAlt className="text-2xl" />
          </button>
          <button className="rounded-full p-2 bg-gray-300 flex items-center justify-center">
            <TiDocumentAdd className="text-2xl" />
          </button>
        </div>
        <Grid container spacing={4}>
          {cards
            ? cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card
                    id={card.id}
                    question={card.question}
                    answer={card.answer}
                    category={card.category}
                    onDelete={() => deleteFlashCard(card.id)}
                  />
                </Grid>
              ))
            : new Array(9).fill(0).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <CardGhost key={index} />
                </Grid>
              ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardsLayout;
