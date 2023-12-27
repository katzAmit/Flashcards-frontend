import Footer from "./components/Footer";
import NavBar from "../../components/Navbar";
import CardsLayout from "./components/CardsLayout";
import { useEffect, useMemo, useState } from "react";
import { FlashCard } from "../../types/card.interface";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import FilterBox from "./components/FilterBox";
import { FilterCriteria } from "../../types/filter.criteria";
import { RoutesEnum } from "../../types/routes.enum";
import { Filter } from "@mui/icons-material";
import { DifficultyLevelEnum } from "../../components/Card/types";

export default function Homepage() {
  const [flashCards, setFlashCards] = useState<FlashCard[]>();
  const [viewedFlashCards, setViewedFlashCards] = useState<FlashCard[]>();

  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();

  const deleteFlashCard = (id: number) => {
    axios
      .delete(`http://localhost:4000/flashcards/${id}`)
      .then(() => {
        setFlashCards((prevCards) =>
          prevCards?.filter((card) => card.id !== id)
        );
        setViewedFlashCards((prevCards) =>
          prevCards?.filter((card) => card.id !== id)
        );
      })
      .catch((error) => {
        console.error("error deleting flashcard", error);
      });
  };

  const addFlashCard = (
    question: string,
    answer: string,
    category: string,
    difficulty_level: DifficultyLevelEnum,
    is_auto: number
  ) => {
    const flashcardData = {
      question: question,
      answer: answer,
      category: category,
      difficulty_level: difficulty_level,
      is_auto: is_auto,
    };
    axios
      .post(`http://localhost:4000/flashcards`, flashcardData)
      .then((response) => {
        const newCard: FlashCard = response.data;
        setFlashCards((prevCards) => {
          if (prevCards === undefined) {
            return [newCard];
          }
          return [...prevCards, newCard];
        });
        setViewedFlashCards((prevCards) => {
          if (prevCards === undefined) {
            return [newCard];
          }
          return [...prevCards, newCard];
        });
        console.log("card added successfully");
      })
      .catch((error) => {
        console.error("error adding flashcard", error);
      });
  };

  const updateFlashCard = async (updatedData: FlashCard) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/flashcards/${updatedData.id}`,
        updatedData
      );

      const updatedFlashcard = response.data;

      setFlashCards((prevCards) =>
        prevCards?.map((card) =>
          card.id === updatedFlashcard.id ? updatedFlashcard : card
        )
      );
      setViewedFlashCards((prevCards) =>
        prevCards?.map((card) =>
          card.id === updatedFlashcard.id ? updatedFlashcard : card
        )
      );

      // Handle success, you might want to show a message or perform other actions
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Error updating flashcard:", error);
    }
  };

  const onFilterChanged = useMemo(
    () => (criteria: FilterCriteria) => {
      const filtered = flashCards?.filter((card) => {
        if (
          criteria.category?.length &&
          !criteria.category.includes(card.category)
        ) {
          return false;
        }
        if (
          criteria.difficulty?.length &&
          !criteria.difficulty.includes(card.difficulty_level)
        ) {
          return false;
        }
        return true;
      });
      setViewedFlashCards(filtered);
    },
    [flashCards]
  );

  // Initial data fetch
  useEffect(() => {
    if (!isDataFetched) {
      const fetchFlashCards = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/flashcards`);
          setFlashCards(res.data);
          setViewedFlashCards(res.data);
          setIsDataFetched(true);
        } catch (error) {
          console.error("error fetching data", error);
        }
      };
      fetchFlashCards();
    }
  }, [isDataFetched]);

  return (
    <>
      <NavBar />
      <main>
        <CardsLayout
          cards={viewedFlashCards}
          deleteFlashCard={deleteFlashCard}
          addFlashCard={addFlashCard}
          updateFlashCard={updateFlashCard}
          filterFlashCards={onFilterChanged}
        />
      </main>
      <Footer />
    </>
  );
}
