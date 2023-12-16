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
import Question from "./Question";

interface Flashcard {
  question: string;
  answer: string;
}

interface QuizProps {
  flashcards: Flashcard[];
  title: string;
  id: string;
  start_time: Date;
  onFinish: () => void; // Include onFinish property
}

const Quiz: React.FC<QuizProps> = ({ flashcards, title }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const questionCount = flashcards.length;

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextCard = () => {
    if (currentCardIndex < questionCount - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleLastQuestionReached = () => {
    // Perform necessary actions when reaching the last question
  };

  const handleCancelDialogOpen = () => {
    setIsCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setIsCancelDialogOpen(false);
  };

  const handleCancelAndNavigate = () => {
    handleCancelDialogClose();
    // Navigate back to the /practice route
    // Implement your navigation logic here
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
