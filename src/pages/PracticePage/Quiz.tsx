import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import { RoutesEnum } from "../../types/routes.enum";
import axios from "axios";

interface Flashcard {
  question: string;
  answer: string;
  difficulty_level: string;
}

interface QuizProps {
  flashcards: Flashcard[];
  title: string;
  id: string;
  start_time: Date;
  onFinish: () => void;
}

const Quiz: React.FC<QuizProps> = ({
  flashcards,
  title,
  onFinish,
  start_time,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const questionCount = flashcards.length;
  const navigate = useNavigate();
  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextCard = () => {
    if (currentCardIndex < questionCount - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleLastQuestionReached = async () => {
    const updatedFlashcards = flashcards.map((flashcard, index) => {
      if (index === currentCardIndex) {
        return {
          ...flashcard,
          difficulty: flashcard.difficulty_level || "", // Set default value if difficulty not selected
        };
      }
      return flashcard;
    });
    const data = {
      flashcards: updatedFlashcards,
      start_time: start_time,
      end_time: new Date(),
    };
    try {
      axios
        .post(`http://localhost:4000/submit_quiz`, data)
        .then(() => {})
        .catch((error) => {
          console.error("error deleting flashcard", error);
        });
      onFinish();
      navigate(RoutesEnum.PRACTICE);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleCancelDialogOpen = () => {
    setIsCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setIsCancelDialogOpen(false);
  };

  const handleCancelAndNavigate = () => {
    handleCancelDialogClose();
    onFinish();
    navigate(RoutesEnum.PRACTICE);
  };

  return (
    <main style={{ marginTop: "40px" }}>
      <Container
        component="div"
        maxWidth="md"
        sx={{
          backgroundColor: "#2E3B55",
          color: "#FFFFF",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          textAlign: "start",
          marginTop: "20px",
          position: "relative",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{
            color: "#FFFFFF",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={handleCancelDialogOpen}
        >
          Cancel
        </Button>

        <Typography
          variant="h5"
          gutterBottom
          style={{
            color: "white",
            marginBottom: "1.5rem",
            fontWeight: 700,
            letterSpacing: ".3rem",
          }}
        >
          {title}
        </Typography>

        {flashcards.length > 0 && (
          <div
            className="questionContainer"
            style={{
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              borderRadius: "15px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Question
              question={flashcards[currentCardIndex].question}
              answer={flashcards[currentCardIndex].answer}
              questionNumber={currentCardIndex + 1}
              totalQuestions={questionCount}
              onNextClick={goToNextCard}
              onPreviousClick={goToPreviousCard}
              onLastQuestionReached={handleLastQuestionReached}
            />
          </div>
        )}

        <Dialog open={isCancelDialogOpen} onClose={handleCancelDialogClose}>
          <DialogTitle>Are you sure you want to exit?</DialogTitle>
          <DialogContent>
            <DialogContentText>Any progress will be deleted.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDialogClose}>Cancel</Button>
            <Button onClick={handleCancelAndNavigate} color="error">
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </main>
  );
};

export default Quiz;
