import React from "react";
import { Grid, Container } from "@mui/material";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { Card } from "../../../components/Card";
import { CardGhost } from "../../../components/CardGhost";
import { FlashCard } from "../../../types/card.interface";
import { TiDocumentAdd } from "react-icons/ti";
import { BiFilterAlt } from "react-icons/bi";
import Box from "@mui/material/Box";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import axios from "axios";

interface CardsLayoutProps {
  cards?: FlashCard[];
  deleteFlashCard: (id: number) => void;
  addFlashCard: (
    question: string,
    answer: string,
    category: string,
    difficulty_level: string
  ) => void;
  updateFlashCard: (card: FlashCard) => void;
}

const CardsLayout: React.FC<CardsLayoutProps> = ({
  cards,
  deleteFlashCard,
  addFlashCard,
  updateFlashCard,
}) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const [editCardData, setEditCardData] = React.useState<FlashCard | null>(
    null
  );
  const [editCardPopupVisible, setEditCardPopupVisible] =
    React.useState<boolean>(false);

  const handleEditClick = (id: number) => {
    const cardDataToEdit = cards?.find((card) => card.id === id) || null;
    setEditCardData(cardDataToEdit);
    setEditCardPopupVisible(true);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <Container
      className={`cardsLayout ${open ? "blurred" : ""}`}
      sx={{ py: 8 }}
      maxWidth="lg"
    >
      <Grid>
        <div className="flex items-center mb-8 justify-between">
          <button className="rounded-full p-2 bg-gray-300 flex items-center justify-center">
            <BiFilterAlt className="text-2xl" />
          </button>
          <button
            aria-describedby={id}
            type="button"
            onClick={handleAdd}
            className="rounded-full p-2 bg-gray-300 flex items-center justify-center"
          >
            <TiDocumentAdd className="text-2xl" />
          </button>
          <BasePopup id={id} open={open} anchor={anchor}>
            <Box
              sx={{
                backgroundColor: "white",
                position: "relative",
                top: "50%",
                left: "-62.25%",
                boxShadow: "1px 2px 9px #6352B1",
                margin: "4em",
                padding: "1em",
                borderRadius: "15px",
              }}
            >
              <AddCard addFlashCard={addFlashCard} setAnchor={setAnchor} />
            </Box>
          </BasePopup>
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
                    onEdit={() => handleEditClick(card.id)}
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
      {editCardPopupVisible && (
        <EditCard
          cardData={editCardData}
          setAnchor={setEditCardPopupVisible}
          updateFlashCard={updateFlashCard}
          onEditComplete={(updatedData: FlashCard) => {
            updateFlashCard(updatedData);
            // Perform any other actions you need after the edit is complete
          }}
        />
      )}
    </Container>
  );
};

export default CardsLayout;
