import React from "react";
import { Grid, Container } from "@mui/material";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { Card } from "../../../components/Card";
import { CardGhost } from "../../../components/CardGhost";
import { FlashCard } from "../../../types/card.interface";
import { FilterCriteria } from "../../../types/filter.criteria";
import { TiDocumentAdd } from "react-icons/ti";
import { BiFilterAlt } from "react-icons/bi";
import Box from "@mui/material/Box";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

import FilterBox from "./FilterBox";
import { DifficultyLevelEnum } from "../../../components/Card/types";

interface CardsLayoutProps {
  cards?: FlashCard[];
  deleteFlashCard: (id: number) => void;
  addFlashCard: (
    question: string,
    answer: string,
    category: string,
    difficulty_level: DifficultyLevelEnum,
    is_auto: number
  ) => void;
  updateFlashCard: (card: FlashCard) => void;
  filterFlashCards: (criteria: FilterCriteria) => void;
}

const CardsLayout: React.FC<CardsLayoutProps> = ({
  cards,
  deleteFlashCard,
  addFlashCard,
  updateFlashCard,
  filterFlashCards,
}) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [editCardData, setEditCardData] = React.useState<FlashCard | null>(
    null
  );
  const [editCardPopupVisible, setEditCardPopupVisible] =
    React.useState<boolean>(false);
  const [FilterBoxVisible, setFilterBoxVisible] =
    React.useState<boolean>(false);

  function handleFilterClick() {
    setFilterBoxVisible(!FilterBoxVisible);
  }

  const handleEditClick = (id: number) => {
    const cardDataToEdit = cards?.find((card) => card.id === id) || null;
    setEditCardData(cardDataToEdit);
    setEditCardPopupVisible(true);
  };

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleFilterChange = (criteria: FilterCriteria) => {
    filterFlashCards(criteria);
  };
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <Container
      className={`cardsLayout ${open ? "blurred" : ""}`}
      sx={{ py: 8 }}
      maxWidth="lg"
    >
      <Grid container spacing={2}>
        {/* Row 1: Action buttons */}
        <Grid item xs={12}>
          <div className="flex items-center justify-between">
            <button
              className="rounded-full p-2 bg-gray-300 flex items-center justify-center transition-colors duration-300 hover:bg-gray-400"
              onClick={handleFilterClick}
            >
              <BiFilterAlt className="text-2xl" />
            </button>
            <button
              aria-describedby={id}
              type="button"
              onClick={handleAdd}
              className="rounded-full p-2 bg-gray-300 flex items-center justify-center transition-colors duration-300 hover:bg-gray-400"
            >
              <TiDocumentAdd className="text-2xl" />
            </button>
            <BasePopup id={id} open={open} anchor={anchor}>
              <Box>
                <AddCard addFlashCard={addFlashCard} setAnchor={setAnchor} />
              </Box>
            </BasePopup>
          </div>
        </Grid>

        {/* Row 2: Filter Box */}
        <Grid item xs={12}>
          {FilterBoxVisible && (
            <FilterBox filterFlashCards={handleFilterChange} />
          )}
        </Grid>

        {/* Row 3: Card Grid Container */}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {cards
              ? cards.map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card
                      id={card.id}
                      question={card.question}
                      answer={card.answer}
                      difficulty={card.difficulty_level}
                      category={card.category}
                      is_auto={card.is_auto}
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

        {/* Row 4: Edit Card Popup */}
        <Grid item xs={12}>
          {editCardPopupVisible && (
            <EditCard
              cardData={editCardData}
              setAnchor={setEditCardPopupVisible}
              updateFlashCard={updateFlashCard}
              onEditComplete={(updatedData: FlashCard) => {
                updateFlashCard(updatedData);
              }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardsLayout;
