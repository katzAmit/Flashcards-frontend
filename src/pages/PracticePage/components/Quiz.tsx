import React, { useState } from "react";
import Question from "./Question";
import { Button, Container, Typography } from "@mui/material";

interface Flashcard {
  question: string;
  answer: string;
}

interface QuizProps {
  flashcards: Flashcard[];
  title: string;
  id: string
  start_time: Date
}

const Quiz: React.FC<QuizProps> = ({ flashcards, title }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const questionCount = flashcards.length;

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex - 1);
    setSubmitted(false);
  };

  const goToNextCard = () => {
    if (currentCardIndex < questionCount - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  const handleLastQuestionReached = () => {
    // yuval comment - here we are going to send an UPDATE event to /flashcards to update all the flashcards + update the start time + endtime of this specific quiz
    const endTime = new Date()
    // axios.post(/flashcards) // update all flashcards with the new difficulty level
    // axios.post(/quiz/quiz_id) // update specific start_time + end_time of the quiz cause it is now finished
    // navigate to a different page
  };

  return (
    <Container component="main" maxWidth="md" className="flex flex-col items-center space-y-4">
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial, sans-serif' }}>{title}</Typography>
      
      {flashcards.length > 0 && (
        <Question
          question={flashcards[currentCardIndex].question}
          answer={flashcards[currentCardIndex].answer}
          questionNumber={currentCardIndex + 1}
          totalQuestions={questionCount}
          onNextClick={goToNextCard}
          onPreviousClick={goToPreviousCard}
          onLastQuestionReached={handleLastQuestionReached} // Pass the callback to the Question component
        />
      )}
    </Container>
  );
};

export default Quiz;
