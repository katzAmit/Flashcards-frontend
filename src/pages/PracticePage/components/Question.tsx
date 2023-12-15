import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

interface QuestionProps {
  question: string;
  answer: string;
  questionNumber: number;
  totalQuestions: number;
  onNextClick: () => void;
  onPreviousClick: () => void;
  onLastQuestionReached: () => void; // Define the callback prop
}

const Question: React.FC<QuestionProps> = (props) => {
  const [flip, setFlip] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleDifficultyChange = (
    event: SelectChangeEvent<string>
  ) => {
    setDifficulty(event.target.value);
  };

  const resetFlip = () => {
    setFlip(false);
    setUserAnswer("");
  };

  const handleUserAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserAnswer(event.target.value);
  };

  useEffect(() => {
    resetFlip();
    setDifficulty(""); // Reset the difficulty state to an empty string
  }, [props.question]);

  const handleNextClick = () => {
    if (props.questionNumber === props.totalQuestions) {
      props.onLastQuestionReached(); // Call the callback when the last question is reached
    } else {
      props.onNextClick();
    }
  };

  return (
    <Container component="main" maxWidth="sm" className="flex items-center justify-center h-full">
      <Paper className="w-full p-4 max-h-full overflow-hidden overflow-y-auto" sx={{
        fontFamily: "Arial, sans-serif", // Match the font with NavBar and Quiz
        marginTop: '20px', // Adjust top margin
      }}>
        <div className="flex justify-between mb-2">
          <Typography variant="h6" className="font-bold text-xl" sx={{ fontFamily: "Arial, sans-serif" }}>
            {`${props.question}`}
          </Typography>
        </div>
        <TextField
          fullWidth
          name="userAnswer"
          label="Your answer here"
          value={userAnswer}
          onChange={handleUserAnswerChange}
          autoComplete="off"
          multiline
          rows={4}
          variant="outlined"
        />
        <div className="mt-4" onClick={handleFlip}>
          <Paper
            className="p-4 cursor-pointer"
            style={{
              transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s",
            }}
          >
            <div style={{ visibility: flip ? "hidden" : "visible" }}>
              <Typography variant="body1">Click to reveal answer</Typography>
            </div>
            <div style={{ visibility: flip ? "visible" : "hidden", transform: "rotateY(180deg)" }}>
              <Typography variant="body1">{props.answer}</Typography>
            </div>
          </Paper>
        </div>
        {flip && (
          <FormControl fullWidth className="mt-4">
            <InputLabel
              id="difficulty-label"
              style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}
            >
              How well did you know the answer?
            </InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              onChange={handleDifficultyChange}
              variant="outlined"
              style={{ marginTop: '0.5rem' }}
            >
              <MenuItem value={'0'}>Not Well</MenuItem>
              <MenuItem value={'1'}>Need some more practice</MenuItem>
              <MenuItem value={'2'}>Perfect!</MenuItem>
            </Select>
          </FormControl>
        )}
        <div className="flex justify-between mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={props.onPreviousClick}
            disabled={props.questionNumber === 1}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
          >
            {props.questionNumber === props.totalQuestions ? "Submit" : "Next"}
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Question;
