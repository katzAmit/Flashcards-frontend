import React, { useState } from "react";
import Question from "./Question";
import { Container, Typography } from "@mui/material";
import NavBar from "../../../components/Navbar";
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

  return (
    <>
      <NavBar /> {/* Render the NavBar component */}
      <main style={{ marginTop: '40px' }}>
        <Container
          component="main"
          maxWidth="md"
          sx={{
            backgroundColor: "#6352B1", // Match the background color with NavBar
            color: "white", // Text color to contrast
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
            textAlign: "start",
            marginTop: '20px', // Adjust top margin
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "white", // Text color to contrast
              marginBottom: "1.5rem",
              fontWeight: 700, // Matching font weight with NavBar
              letterSpacing: ".3rem", // Matching letter spacing with NavBar
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
        </Container>
      </main>
    </>
  );
};

export default Quiz;
